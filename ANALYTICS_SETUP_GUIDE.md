# Analytics & Search Console Setup Guide

This guide will walk you through the process of setting up Google Analytics, Microsoft Clarity, and Google Search Console for your new website. 

Once you get the three specific "IDs" or "Codes" mentioned below, simply provide them to your developer
---

## 1. Google Analytics 4 (GA4)
Google Analytics helps you track how many people visit your website, where they come from, and what they do.

### How to get your Measurement ID:
1. Go to [analytics.google.com](https://analytics.google.com) and sign in with your Google account.
2. Click **Start measuring** (or go to **Admin** > **Create Account** if you already have one).
3. **Account Setup**: Enter an Account Name (e.g., "FMCG Exchange") and click Next.
4. **Property Setup**: Enter a Property Name (e.g., "FMCG Exchange Website"), select your time zone and currency, then click Next.
5. Answer the brief business details questions and click **Create**. Accept the Terms of Service.
6. You will be asked to "Choose a platform". Click on **Web**.
7. Enter your website URL (`www.fmcg-exchange.com`) and a Stream Name (e.g., "Main Website"), then click **Create stream**.
8. A "Web stream details" panel will pop up. Look for the **MEASUREMENT ID** at the top right. 
   - *It will look something like this: `G-XXXXXXXXXX`*

> **What we need:** Please copy the **Measurement ID** (`G-...`).

---

## 2. Microsoft Clarity
Microsoft Clarity is a free tool that records user sessions and creates heatmaps so you can visually see what users click on and how they scroll through your site.

### How to get your Project ID:
1. Go to [clarity.microsoft.com](https://clarity.microsoft.com/) and sign in (you can use your Google, Microsoft, or Facebook account).
2. Click **New Project**.
3. Enter your Project Name (e.g., "FMCG Exchange") and your website URL (`https://www.fmcg-exchange.com`). Click **Add new project**.
4. You will be taken to the "Getting Started" page where it asks how you want to install Clarity.
5. You do *not* need to follow their installation instructions because we've already built it into the code! 
6. Instead, look at the URL in your browser's address bar. It will look like this: `https://clarity.microsoft.com/projects/view/5qw3xyz123/settings`.
7. Alternatively, click on **Settings** in the left menu, then click **Overview**. 
8. Look for the **Project ID** on that page.
   - *It will be a short string of letters and numbers like `5qw3xyz123`.*

> **What we need:** Please copy the **Project ID**.

---

## 3. Google Search Console
Google Search Console ensures Google knows your website exists, helps it show up in search results, and alerts you if there are any indexing issues.

### How to get your Verification Code:
1. Go to [search.google.com/search-console](https://search.google.com/search-console) and sign in with the same Google account you used for Analytics.
2. You will see a screen asking you to "Select property type".
3. Look at the box on the right titled **URL prefix**. 
4. Enter your exact homepage URL (e.g., `https://www.fmcg-exchange.com`) and click **Continue**.
5. A "Verify ownership" popup will appear. Scroll down to the **Other verification methods** section.
6. Click on **HTML tag** to expand that section.
7. You will see a line of code that looks like this:
   `<meta name="google-site-verification" content="AbCdEfGhIjKlMnOpQrStUvWxYz1234567890" />`
8. Copy ONLY the random text inside the `content="..."` quotes. (In the example above, you would only copy `AbCdEfGhIjKlMnOpQrStUvWxYz1234567890`).

> **What we need:** Please copy just the verification text string from the `content` area.

*(Note: Do not click the "Verify" button in Google Search Console yet. We must add the code to the website first. Once we deploy the code, you can return to that screen and click Verify!)*

---

### Summary Checklist
Once you have completed the steps above, you should have three pieces of text:

- [ ] **GA4 Measurement ID** (e.g., `G-12345ABCDE`)
- [ ] **Clarity Project ID** (e.g., `1a2b3c4d5e`)
- [ ] **Search Console Verification Code** (e.g., `AbCdEfGhIjKlMnOpQrStUvWxYz`)

Provide these to your development team to complete the integration!
