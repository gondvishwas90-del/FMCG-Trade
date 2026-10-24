# Project Server Cost & Infrastructure Report (2026)

This report outlines the infrastructure costs, tier details, and critical limitations for the key services used in the Sevora/FMCG project.

---

## 1. Storage & Media: ImageKit.io
ImageKit handles real-time image optimization, video transformations, and media storage.

| Feature | **Forever Free** | **Lite Plan** | **Premium Plan** |
| :--- | :--- | :--- | :--- |
| **Monthly Cost** | $0 | $9 / month | $89 / month |
| **Bandwidth** | 20 GB (Hard limit) | 40 GB included | 225 GB included |
| **Storage (DAM)** | 3 GB (Permanent) | Increased | Significant |
| **Video Processing** | 500 Units / month | Higher | Higher |
| **Overages** | None (Service stops) | $0.45 per GB | Negotiated |
| **Users** | 2 Seats | 2 Seats | 5+ Seats |

### ⚠️ Real Limitations (ImageKit)
*   **Hard Cutoff (Free):** If you exceed 20GB bandwidth on the Free tier, images **stop loading entirely** across your site until the next month.
*   **Permanent Storage:** The 3GB limit is not monthly; it is a total cap. You must delete files or upgrade to add more.
*   **Non-Commercial Support:** Free plan lacks custom domain support and advanced security (IP blocking).

---

## 2. Database: MongoDB Atlas
MongoDB Atlas provides the managed cloud database for brand data, users, and trade offers.

| Feature | **Free (M0)** | **Flex Tier** | **Dedicated (M10)** |
| :--- | :--- | :--- | :--- |
| **Monthly Cost** | $0 | $8 – $30 (Usage based) | ~$57+ / month |
| **Storage** | 512 MB (Fixed) | Up to 5 GB | 10 GB – 4 TB+ |
| **Resources** | Shared RAM/vCPU | Shared (Auto-scaling) | Dedicated RAM/vCPU |
| **Backups** | **None** | Continuous Included | Continuous + PITR |
| **Connections** | Max 500 | Scalable | High / Unlimited |
| **Availability** | Single Region | Multi-Region Options | 99.95% Uptime SLA |

### ⚠️ Real Limitations (MongoDB Atlas)
*   **Performance (Free):** Limited to 100 operations per second. Heavy filtering or search queries on the Brand Gallery will be throttled.
*   **No Backups (Free):** If data is accidentally deleted or corrupted on M0, it is **unrecoverable**.
*   **Networking:** Free tier does not support VPC Peering or Private Endpoints, exposing the database to the public internet (secured by IP whitelist only).

---

## 3. Hosting & Frontend: Vercel (Next.js)
Vercel is used for deployment, serverless functions, and global CDN delivery.

| Feature | **Hobby** | **Pro** | **Enterprise** |
| :--- | :--- | :--- | :--- |
| **Monthly Cost** | $0 | $20 / user / month | Custom |
| **Use Case** | Non-commercial only | Professional / Business | Scale / Governance |
| **Deployments** | 100 / day | 6,000 / day | Custom |
| **Source Upload** | 100 MB | 1 GB | Custom |
| **Build Machine** | Standard (Slow) | Enhanced / Turbo | Dedicated |
| **Functions** | 10s execution limit | 30s+ execution limit | Custom |

### ⚠️ Real Limitations (Vercel)
*   **Commercial Use:** The Hobby plan strictly forbids commercial use. If the FMCG site generates revenue, Vercel may flag and suspend the account unless upgraded to Pro.
*   **Usage Spikes:** Pro plans are usage-based. If the site goes viral or suffers a DDoS, costs for bandwidth ($40 per 100GB) and Serverless execution can spike significantly.
*   **Build Concurrency:** Hobby is limited to 1 build at a time. If multiple developers or automated tasks trigger builds, they will queue, delaying updates.

---

## Summary Recommendations
1.  **Immediate Action:** Move to **MongoDB Flex** as soon as possible to enable automated backups.
2.  **Scaling Strategy:** Use **ImageKit Origin Pull** instead of DAM storage to stay within the 3GB storage limit while only paying for bandwidth.
3.  **Risk Management:** Monitor Vercel usage dashboard weekly to avoid "Bill Shock" from unoptimized serverless function calls or high bandwidth assets.
