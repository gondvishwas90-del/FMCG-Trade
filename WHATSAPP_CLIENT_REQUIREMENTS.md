# Client Requirements for WhatsApp Business API Integration (Phase 2)

Implementing the "Real" WhatsApp feature (where messages are sent directly from your website backend without opening the app) requires a formal integration with Meta (Facebook).

## 1. Meta Business Account
You need a verified Meta Business Manager account.
-   **Action:** Ensure your business is verified on [business.facebook.com](https://business.facebook.com/).

## 2. WhatsApp Business Account (WABA)
You must create a WhatsApp Business API account inside your Meta Business Manager.
-   **Phone Number:** You need a dedicated phone number for this.
    -   *Crucial Note:* This number **cannot** be currently used on the standard WhatsApp mobile app. It must be deleted from the app to be used with the API, or you must buy a new virtual number.
-   **Display Name:** The name that appears in WhatsApp (e.g., "FMCG Support") must be approved by Meta.

## 3. Credentials Needed
Once the above is set up, we need the following credentials to connect the API:
-   **`WHATSAPP_PHONE_NUMBER_ID`**: The ID of the phone number sending messages.
-   **`WHATSAPP_BUSINESS_ACCOUNT_ID`**: The ID of your WABA.
-   **`WHATSAPP_ACCESS_TOKEN`**: A permanent system user token with `whatsapp_business_messaging` permissions.

## 4. Cost Structure (Paid to Meta)
Unlike Phase 1 (Free), this method incurs costs per conversation.
-   **Service Conversations:** (User initiates) ~£0.03 - £0.05 per 24-hour session.
-   **Marketing Conversations:** (Business initiates) ~£0.06 - £0.10 per 24-hour session.
-   *Note: First 1,000 service conversations per month are usually free.*

## 5. Technical Constraints
-   **Initial Contact:** You cannot send the *first* message to a user unless they message you first, OR you use a pre-approved "Template Message".
-   **24-Hour Window:** If a user messages you, you have 24 hours to reply freely. After that, you can only send paid Templates.

## Summary Checklist
- [ ] Verified Meta Business Manager
- [ ] Dedicated Phone Number (not on personal WhatsApp app)
- [ ] WhatsApp Business Account Created
- [ ] Payment Method Added in Meta
- [ ] Provide Credentials (Phone ID, Token) to Developer
