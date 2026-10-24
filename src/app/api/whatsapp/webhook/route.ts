import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Lead from '@/models/Lead';

// ── GET: Webhook verification (Meta sends this during setup) ──
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const mode      = searchParams.get('hub.mode');
  const token     = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  const VERIFY_TOKEN = process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN;

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('[Webhook] ✅ Verified');
    return new NextResponse(challenge, { status: 200 });
  } else {
    console.error('[Webhook] ❌ Verification failed');
    return new NextResponse('Forbidden', { status: 403 });
  }
}

// ── POST: Handle incoming events from Meta ──
export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (body.object !== 'whatsapp_business_account') {
      return new NextResponse('Not Found', { status: 404 });
    }

    await dbConnect();

    for (const entry of body.entry || []) {
      for (const change of entry.changes || []) {
        const value = change.value;

        // ── Incoming messages ──
        if (value.messages) {
          for (const msg of value.messages) {
            const from    = msg.from;
            const msgBody = msg.text?.body || '';
            const msgType = msg.type;

            console.log(`[Webhook] Incoming ${msgType} from ${from}: ${msgBody}`);

            // Save as a new lead (direct WhatsApp message to business)
            await Lead.create({
              name: value.contacts?.[0]?.profile?.name || 'WhatsApp User',
              phone: from,
              message: msgBody || `[${msgType} message]`,
              source: 'whatsapp_widget',
              whatsappStatus: 'sent',
              whatsappMessageId: msg.id,
            });
          }
        }

        // ── Status updates (delivered, read, failed) ──
        if (value.statuses) {
          for (const status of value.statuses) {
            const messageId = status.id;
            const newStatus = status.status; // sent, delivered, read, failed

            console.log(`[Webhook] Status update: ${messageId} → ${newStatus}`);

            // Map Meta status to our schema
            const statusMap: Record<string, string> = {
              'sent': 'sent',
              'delivered': 'delivered',
              'read': 'read',
              'failed': 'failed',
            };

            const mappedStatus = statusMap[newStatus];
            if (mappedStatus && messageId) {
              await Lead.findOneAndUpdate(
                { whatsappMessageId: messageId },
                {
                  whatsappStatus: mappedStatus,
                  ...(newStatus === 'failed' ? {
                    whatsappError: status.errors?.[0]?.title || 'Delivery failed'
                  } : {}),
                }
              );
            }
          }
        }
      }
    }

    // Always return 200 quickly to prevent Meta from retrying
    return NextResponse.json({ status: 'ok' }, { status: 200 });
  } catch (error) {
    console.error('[Webhook] Error:', error);
    // Still return 200 — otherwise Meta keeps retrying the same event
    return NextResponse.json({ status: 'error' }, { status: 200 });
  }
}
