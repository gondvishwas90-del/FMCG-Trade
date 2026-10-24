import { NextResponse } from 'next/server';

export async function GET() {
  const config = {
    mode:              process.env.NEXT_PUBLIC_WHATSAPP_MODE || 'not set',
    phoneNumberId:     process.env.WHATSAPP_PHONE_NUMBER_ID ? '✅ Set' : '❌ Missing',
    accessToken:       process.env.WHATSAPP_ACCESS_TOKEN ? `✅ Set (${process.env.WHATSAPP_ACCESS_TOKEN.length} chars)` : '❌ Missing',
    businessAccountId: process.env.WHATSAPP_BUSINESS_ACCOUNT_ID ? '✅ Set' : '❌ Missing',
    recipientPhone:    process.env.WHATSAPP_RECIPIENT_PHONE || '❌ Missing',
    templateName:      process.env.WHATSAPP_TEMPLATE_NAME || '❌ Missing (will use website_lead_notification)',
    webhookToken:      process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN ? '✅ Set' : '❌ Missing',
  };

  // Validate token with Meta's debug endpoint
  let tokenValid = 'not checked';
  const token = process.env.WHATSAPP_ACCESS_TOKEN?.trim();
  if (token) {
    try {
      const res = await fetch(
        `https://graph.facebook.com/debug_token?input_token=${token}&access_token=${token}`
      );
      const data = await res.json();
      if (data?.data?.is_valid) {
        tokenValid = `✅ Valid (expires: ${data.data.expires_at === 0 ? 'Never' : new Date(data.data.expires_at * 1000).toISOString()})`;
      } else {
        tokenValid = `❌ Invalid — ${data?.data?.error?.message || 'Token rejected by Meta'}`;
      }
    } catch {
      tokenValid = '⚠️ Could not reach Meta API';
    }
  }

  return NextResponse.json({
    status: 'WhatsApp Integration Health Check',
    timestamp: new Date().toISOString(),
    config,
    tokenValidation: tokenValid,
  });
}
