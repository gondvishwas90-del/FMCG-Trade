import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Lead from '@/models/Lead';

// Type definition for request body
interface SendRequest {
  message: string;
  name?: string;
  userPhone?: string;
  userEmail?: string;
}

export async function POST(req: Request) {
  try {
    const body: SendRequest = await req.json();
    const { message, name, userPhone, userEmail } = body;

    // ── 1. Validate input ──
    if (!message?.trim()) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // ── 2. Save lead to MongoDB FIRST (never lose a lead) ──
    await dbConnect();
    const lead = await Lead.create({
      name: name?.trim() || 'Unknown',
      phone: userPhone?.trim() || '',
      email: userEmail?.trim() || '',
      message: message.trim(),
      source: 'whatsapp_widget',
      whatsappStatus: 'pending',
    });
    console.log('[WhatsApp] Lead saved to MongoDB:', lead._id);

    // ── 3. Load & validate configuration ──
    const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID?.trim() || "1151407064703159";
    const ACCESS_TOKEN    = process.env.WHATSAPP_ACCESS_TOKEN?.trim() || "EAANYuyfsiEwBRTaA6u2ODXXZBu8pg9zVXcSMyyeTLuIL4DIfgl0KElN4uyE3XimZAYhZC9Su4UIXOSnwzJ3XWMBP6y27QPT4Ci4OzfLUOXdvzKjv0S2GDKZC1rW3XPFkbeaKdVDNfe716RgJ2ip80oIk9zwsUeZAYvKbXZCLemKBlFMAmFwZCKZASDxkO9MBLQZDZD";
    const RECIPIENT_PHONE = process.env.WHATSAPP_RECIPIENT_PHONE?.trim() || "447588435283";
    const TEMPLATE_NAME   = process.env.WHATSAPP_TEMPLATE_NAME?.trim() || 'website_lead_notification';

    if (!PHONE_NUMBER_ID || !ACCESS_TOKEN || !RECIPIENT_PHONE) {
      console.warn('[WhatsApp] Missing API configuration — lead saved but message not sent');
      return NextResponse.json({
        success: true,
        leadId: lead._id,
        whatsappSent: false,
        reason: 'WhatsApp API not configured. Lead has been saved.',
      });
    }

    // ── 4. Build API request ──
    const apiUrl = `https://graph.facebook.com/v23.0/${PHONE_NUMBER_ID}/messages`;
    const headers = {
      'Authorization': `Bearer ${ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    };

    // ── 5. Build template payload ──
    const cleanPhone = (userPhone || '').replace(/[^0-9]/g, '');
    let displayPhone = userPhone?.trim() || '';
    let replyLink = 'Not provided';

    if (cleanPhone) {
      replyLink = `https://wa.me/${cleanPhone}`;
    } else if (userEmail?.trim()) {
      displayPhone = `${userEmail.trim()} (Email)`;
      replyLink = `mailto:${userEmail.trim()}`;
    } else {
      displayPhone = 'Not provided';
    }

    let payload: Record<string, unknown>;

    if (TEMPLATE_NAME === 'hello_world') {
      // hello_world has NO parameters — just sends "Hello World"
      payload = {
        messaging_product: 'whatsapp',
        to: RECIPIENT_PHONE,
        type: 'template',
        template: {
          name: 'hello_world',
          language: { code: 'en_US' },
        },
      };
    } else {
      // Custom template with 4 parameters: {{1}}=name, {{2}}=phone/email, {{3}}=message, {{4}}=replyLink
      payload = {
        messaging_product: 'whatsapp',
        to: RECIPIENT_PHONE,
        type: 'template',
        template: {
          name: TEMPLATE_NAME,
          language: { code: 'en_US' },
          components: [
            {
              type: 'body',
              parameters: [
                { type: 'text', text: name?.trim() || 'Unknown' },
                { type: 'text', text: displayPhone },
                { type: 'text', text: message.trim().substring(0, 500) },
                { type: 'text', text: replyLink },
              ],
            },
          ],
        },
      };
    }

    // ── 6. Send to Meta ──
    console.log(`[WhatsApp] Sending template "${TEMPLATE_NAME}" to ${RECIPIENT_PHONE}...`);
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });
    const data = await response.json();

    if (response.ok) {
      // Update lead with success status
      const messageId = data?.messages?.[0]?.id || '';
      await Lead.findByIdAndUpdate(lead._id, {
        whatsappStatus: TEMPLATE_NAME === 'hello_world' ? 'template_sent' : 'sent',
        whatsappMessageId: messageId,
      });
      console.log(`[WhatsApp] ✅ Message sent. ID: ${messageId}`);

      return NextResponse.json({
        success: true,
        leadId: lead._id,
        whatsappSent: true,
        messageId,
      });
    } else {
      // Update lead with failure
      const errorMsg = data?.error?.message || 'Unknown Meta API error';
      await Lead.findByIdAndUpdate(lead._id, {
        whatsappStatus: 'failed',
        whatsappError: errorMsg,
      });
      console.error(`[WhatsApp] ❌ API Error:`, data?.error);

      // Return 200 because the lead IS saved — just WhatsApp delivery failed
      return NextResponse.json({
        success: true,
        leadId: lead._id,
        whatsappSent: false,
        reason: errorMsg,
      }, { status: 200 });
    }

  } catch (error) {
    console.error('[WhatsApp] Internal error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', whatsappSent: false },
      { status: 500 }
    );
  }
}
