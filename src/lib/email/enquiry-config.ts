export interface EnquiryField {
  name: string;
  label: string;
  placeholder: string;
  type?: "text" | "textarea" | "select";
}

export interface EnquiryTemplate {
  id: string;
  subject: string;
  fields: EnquiryField[];
  generateText: (data: any) => string;
}

export const ENQUIRY_TEMPLATES: Record<string, EnquiryTemplate> = {
  "global-trade": {
    id: "global-trade",
    subject: "Enquiry: Global Trade and Distribution",
    fields: [
      { name: "regionsOfInterest", label: "Region(s) of Interest", placeholder: "e.g. Asia, Europe, Middle East" },
      { name: "productCategory", label: "Product Category / Requirement", placeholder: "e.g. Spirits, Confectionery, Soft Drinks" },
      { name: "orderVolume", label: "Estimated Order Volume", placeholder: "e.g. 1x40ft Container monthly" },
    ],
    generateText: (data) => `Hi Team,

I hope you are doing well.

I would like to explore potential business opportunities with your company regarding global trade and distribution.

Please find my details below:
Company Name: ${data.companyName || "[Company Name]"}
Contact Person: ${data.contactPerson || "[Your Name]"}
Email Address: ${data.email || "[Email Address]"}
Phone Number: ${data.phone || "[Phone Number]"}
Region(s) of Interest: ${data.regionsOfInterest || "[Region(s)]"}
Product Category / Requirement: ${data.productCategory || "[Category]"}
Estimated Order Volume: ${data.orderVolume || "[Volume]"}

Additionally, we would appreciate a brief overview of your company and how your trade operations are structured to support partners.

Looking forward to your response.

Best regards,
${data.contactPerson || "[Your Name]"}`,
  },
  "logistics": {
    id: "logistics",
    subject: "Enquiry: Warehousing and Export Handling",
    fields: [
      { name: "typeOfGoods", label: "Type of Goods", placeholder: "e.g. Ambient, Chilled, Hazardous" },
      { name: "storageRequirements", label: "Storage Requirements", placeholder: "e.g. Pallet spaces, temperature control" },
      { name: "exportDestinations", label: "Export Destinations", placeholder: "e.g. GCC countries, Africa" },
      { name: "estimatedVolume", label: "Estimated Volume / Frequency", placeholder: "e.g. 50 pallets per week" },
    ],
    generateText: (data) => `Hi Team,

I hope you are doing well.

I would like to enquire about your bonded warehousing and export handling services. We are currently exploring reliable partners for storage, consolidation, and international dispatch.

Please find my details below:
Company Name: ${data.companyName || "[Company Name]"}
Contact Person: ${data.contactPerson || "[Your Name]"}
Email Address: ${data.email || "[Email Address]"}
Phone Number: ${data.phone || "[Phone Number]"}
Type of Goods: ${data.typeOfGoods || "[Goods Type]"}
Storage Requirements: ${data.storageRequirements || "[Storage Requirements]"}
Export Destinations: ${data.exportDestinations || "[Destinations]"}
Estimated Volume / Frequency: ${data.estimatedVolume || "[Volume]"}

Additionally, we would appreciate a brief overview of your company and how your trade operations are structured to support partners.

Looking forward to your response.

Best regards,
${data.contactPerson || "[Your Name]"}`,
  },
  "compliance": {
    id: "compliance",
    subject: "Enquiry: Trade Assurance and Compliance",
    fields: [
      { name: "natureOfBusiness", label: "Nature of Business", placeholder: "e.g. Importer, Distributor, Manufacturer" },
      { name: "regionsOfOperation", label: "Regions of Operation", placeholder: "e.g. Western Europe, Southeast Asia" },
      { name: "typeOfTransactions", label: "Type of Transactions", placeholder: "e.g. Letter of Credit, Escrow, Open Account" },
      { name: "complianceRequirements", label: "Compliance / Documentation Requirements", placeholder: "e.g. Certificate of Origin, Health Certs" },
    ],
    generateText: (data) => `Hi Team,

I hope you are doing well.

I would like to enquire about your trade assurance, compliance, and payment security services. We are currently evaluating partners who can support us with secure transactions, verified counterparties, and regulatory compliance across international trade.

Please find my details below:
Company Name: ${data.companyName || "[Company Name]"}
Contact Person: ${data.contactPerson || "[Your Name]"}
Email Address: ${data.email || "[Email Address]"}
Phone Number: ${data.phone || "[Phone Number]"}
Nature of Business: ${data.natureOfBusiness || "[Nature of Business]"}
Regions of Operation: ${data.regionsOfOperation || "[Regions]"}
Type of Transactions: ${data.typeOfTransactions || "[Transactions]"}
Compliance / Documentation Requirements: ${data.complianceRequirements || "[Requirements]"}

Additionally, we would appreciate a brief overview of your company and how your trade operations are structured to support partners.

Looking forward to your response.

Best regards,
${data.contactPerson || "[Your Name]"}`,
  },
  "brand-dev": {
    id: "brand-dev",
    subject: "Enquiry: Product Development and Sourcing",
    fields: [
      { name: "productCategory", label: "Product Category", placeholder: "e.g. Beverages, Snacks, Personal Care" },
      { name: "stageOfDevelopment", label: "Stage of Development", placeholder: "e.g. Idea, Prototype, Existing Product" },
      { name: "targetMarkets", label: "Target Market(s)", placeholder: "e.g. UK Domestic, International Export" },
      { name: "supportRequired", label: "Support Required", placeholder: "e.g. Manufacturing, Sourcing, Packaging, Branding" },
    ],
    generateText: (data) => `Hi Team,

I hope you are doing well.

I am currently in the process of building a new product / brand and would like to explore how your team can support with product development, sourcing, and trade readiness.

Please find my details below:
Company / Brand Name: ${data.companyName || "[Company Name]"}
Contact Person: ${data.contactPerson || "[Your Name]"}
Email Address: ${data.email || "[Email Address]"}
Phone Number: ${data.phone || "[Phone Number]"}
Product Category: ${data.productCategory || "[Category]"}
Stage of Development: ${data.stageOfDevelopment || "[Stage]"}
Target Market(s): ${data.targetMarkets || "[Markets]"}
Support Required: ${data.supportRequired || "[Support]"}

Additionally, we would appreciate a brief overview of your company and how your trade operations are structured to support partners.

Looking forward to your response.

Best regards,
${data.contactPerson || "[Your Name]"}`,
  },
  "portfolio-sourcing": {
    id: "portfolio-sourcing",
    subject: "Enquiry: Portfolio Sourcing and Trade Setup",
    fields: [
      { name: "businessType", label: "Business Type", placeholder: "e.g. Distributor, Wholesaler, Trader" },
      { name: "productCategory", label: "Product Categories of Interest", placeholder: "e.g. Brands, Bulk Supply" },
      { name: "targetMarkets", label: "Target Markets / Regions", placeholder: "e.g. UK, EU, Global" },
      { name: "orderVolume", label: "Estimated Order Volume", placeholder: "e.g. Annual or Monthly scale" },
      { name: "supplyType", label: "Preferred Supply Type", placeholder: "e.g. Bulk, Pallets, Mixed Loads" },
    ],
    generateText: (data) => `Hi Team,

I hope you are doing well.

I am currently looking to expand our product portfolio and would like to explore your sourcing and trade setup capabilities, including access to brands, bulk supply, and export-focused trade support.

Please find my details below:
Company Name: ${data.companyName || "[Company Name]"}
Contact Person: ${data.contactPerson || "[Your Name]"}
Email Address: ${data.email || "[Email Address]"}
Phone Number: ${data.phone || "[Phone Number]"}
Business Type: ${data.businessType || "[Business Type]"}
Product Categories of Interest: ${data.productCategory || "[Categories]"}
Target Markets / Regions: ${data.targetMarkets || "[Markets]"}
Estimated Order Volume: ${data.orderVolume || "[Volume]"}
Preferred Supply Type: ${data.supplyType || "[Supply Type]"}

Additionally, we would appreciate a brief overview of your company and how your trade operations are structured to support partners.

Looking forward to your response.

Best regards,
${data.contactPerson || "[Your Name]"}`,
  },
  "logistics-coord": {
    id: "logistics-coord",
    subject: "Enquiry: Logistics and Supply Chain Coordination",
    fields: [
      { name: "businessType", label: "Business Type", placeholder: "e.g. Buyer, Distributor, Trader" },
      { name: "productCategory", label: "Product Categories of Interest", placeholder: "e.g. FMCG, Spirits" },
      { name: "targetMarkets", label: "Target Markets / Regions", placeholder: "e.g. UK, International" },
      { name: "tradeVolume", label: "Estimated Trade Volume", placeholder: "e.g. Weekly or Monthly" },
      { name: "logisticsSupport", label: "Logistics Support Required", placeholder: "e.g. Warehousing, Consolidation, Export Handling" },
    ],
    generateText: (data) => `Hi Team,

I hope you are doing well.

We are currently exploring opportunities to trade and source products through your platform and would like to understand how your team supports logistics and supply chain coordination as part of your trade operations.

Please find our details below:
Company Name: ${data.companyName || "[Company Name]"}
Contact Person: ${data.contactPerson || "[Your Name]"}
Email Address: ${data.email || "[Email Address]"}
Phone Number: ${data.phone || "[Phone Number]"}
Business Type: ${data.businessType || "[Business Type]"}
Product Categories of Interest: ${data.productCategory || "[Categories]"}
Target Markets / Regions: ${data.targetMarkets || "[Markets]"}
Estimated Trade Volume: ${data.tradeVolume || "[Volume]"}
Logistics Support Required: ${data.logisticsSupport || "[Support]"}

We understand that logistics and supply chain coordination are integrated within your trade process and would be keen to explore how this can support our operations. Additionally, we would appreciate a brief overview of your company and how your trade operations are structured to support partners.

Looking forward to your response.

Best regards,
${data.contactPerson || "[Your Name]"}`,
  },
  "market-entry": {
    id: "market-entry",
    subject: "Enquiry: Market Entry and Distribution",
    fields: [
      { name: "productCategory", label: "Product Category", placeholder: "e.g. FMCG, Specialty Food" },
      { name: "currentMarkets", label: "Current Markets", placeholder: "e.g. USA, Europe" },
      { name: "targetMarkets", label: "Target Market(s)", placeholder: "e.g. UK, EU" },
      { name: "distributionModel", label: "Distribution Model", placeholder: "e.g. Retail, Wholesale, Online" },
      { name: "volumeScale", label: "Estimated Volume / Scale", placeholder: "e.g. Target monthly units" },
    ],
    generateText: (data) => `Hi Team,

I hope you are doing well.

We are currently looking to expand our product into new markets and would like to explore how your team can support us with market entry and distribution.

Please find our details below:
Company / Brand Name: ${data.companyName || "[Company Name]"}
Contact Person: ${data.contactPerson || "[Your Name]"}
Email Address: ${data.email || "[Email Address]"}
Phone Number: ${data.phone || "[Phone Number]"}
Product Category: ${data.productCategory || "[Category]"}
Current Markets: ${data.currentMarkets || "[Current Markets]"}
Target Market(s): ${data.targetMarkets || "[Target Markets]"}
Distribution Model: ${data.distributionModel || "[Model]"}
Estimated Volume / Scale: ${data.volumeScale || "[Scale]"}

Additionally, we would appreciate a brief overview of your company and how your trade operations are structured to support partners.

Looking forward to your response.

Best regards,
${data.contactPerson || "[Your Name]"}`,
  },
  "ongoing-partnership": {
    id: "ongoing-partnership",
    subject: "Enquiry: Ongoing Trade and Partnership",
    fields: [
      { name: "businessType", label: "Business Type", placeholder: "e.g. Buyer, Distributor, Supplier" },
      { name: "portfolio", label: "Product Categories / Portfolio", placeholder: "e.g. Global Brands" },
      { name: "markets", label: "Markets of Operation", placeholder: "e.g. UK, EU, Asia" },
      { name: "tradeVolume", label: "Current Trade Volume", placeholder: "e.g. Monthly revenue or units" },
      { name: "areasOfInterest", label: "Areas of Interest", placeholder: "e.g. Stock Clearance, Portfolio Expansion" },
    ],
    generateText: (data) => `Hi Team,

I hope you are doing well.

We are interested in exploring ongoing trade opportunities and building a long-term partnership to support consistent growth and repeat business.

Please find our details below:
Company Name: ${data.companyName || "[Company Name]"}
Contact Person: ${data.contactPerson || "[Your Name]"}
Email Address: ${data.email || "[Email Address]"}
Phone Number: ${data.phone || "[Phone Number]"}
Business Type: ${data.businessType || "[Business Type]"}
Product Categories / Portfolio: ${data.portfolio || "[Portfolio]"}
Markets of Operation: ${data.markets || "[Markets]"}
Current Trade Volume: ${data.tradeVolume || "[Volume]"}
Areas of Interest: ${data.areasOfInterest || "[Areas]"}

Additionally, we would appreciate a brief overview of your company and how your trade operations are structured to support partners.

Looking forward to your response.

Best regards,
${data.contactPerson || "[Your Name]"}`,
  },
  "brand-enquiry": {
    id: "brand-enquiry",
    subject: "Brand Enquiry", // This will be dynamically updated in the modal/api
    fields: [
      { name: "businessType", label: "Business Type", placeholder: "e.g. Distributor, Wholesaler, Retail, Hospitality" },
      { name: "targetMarkets", label: "Target Market(s)", placeholder: "e.g. UK, EU, UAE" },
      { name: "monthlyVolume", label: "Estimated Monthly Volume", placeholder: "e.g. 1000 units, 1 container" },
      { name: "additionalBrands", label: "Additional Brand Interest (if any)", placeholder: "e.g. Other specific brands" },
      { name: "productCategories", label: "Product Categories of Interest", placeholder: "e.g. Whisky, Spirits, FMCG" },
      { name: "distributionChannel", label: "Distribution Channel", placeholder: "e.g. Retail, On-trade, Duty-Free, Wholesale" },
    ],
    generateText: (data) => `Hi Team,

I hope you are doing well.

We are interested in ${data.brandName || "[Brand Name]"} and would like to explore trade opportunities for this product, including pricing, availability, and export options.

In addition, we are also open to exploring other relevant brands within your portfolio that align with our market and distribution strategy.

Please find our details below:
Company Name: ${data.companyName || "[Company Name]"}
Contact Person: ${data.contactPerson || "[Your Name]"}
Email Address: ${data.email || "[Email Address]"}
Phone Number: ${data.phone || "[Phone Number]"}
Business Type: ${data.businessType || "[Business Type]"}
Target Market(s): ${data.targetMarkets || "[Markets]"}
Estimated Monthly Volume: ${data.monthlyVolume || "[Volume]"}
Primary Interest: ${data.brandName || "[Brand Name]"}
Additional Brand Interest: ${data.additionalBrands || "[None]"}
Product Categories of Interest: ${data.productCategories || "[Categories]"}
Distribution Channel: ${data.distributionChannel || "[Channel]"}

Additionally, we would appreciate a brief overview of your company and how your trade operations are structured to support partners.

Looking forward to your response.

Best regards,
${data.contactPerson || "[Your Name]"}`,
  },
  "trade-opportunity": {
    id: "trade-opportunity",
    subject: "Trade Enquiry", // Dynamically updated
    fields: [
      { name: "businessType", label: "Business Type", placeholder: "e.g. Distributor, Importer, Retail, HORECA, Trader" },
      { name: "targetMarkets", label: "Target Market(s)", placeholder: "e.g. Country / Region" },
      { name: "estimatedVolume", label: "Estimated Volume", placeholder: "e.g. Monthly / Per Order" },
      { name: "preferredTimeline", label: "Preferred Timeline", placeholder: "e.g. Immediate / Planned / Flexible" },
      { name: "additionalRequirements", label: "Additional Requirements", placeholder: "e.g. Custom Notes, Brand Requests, Categories", type: "textarea" },
    ],
    generateText: (data) => `Hi Team,

I hope you are doing well.

We are interested in the following trade opportunity:
Primary Product: ${data.opportunityName || "[Opportunity Name]"}
Reference: ${data.opportunityRef || "[PX / SKU / Code]"}

We would like to understand further details regarding pricing, availability, packaging options, and trade terms for this opportunity.

In addition to the above, we are also open to exploring similar or complementary products within your portfolio, particularly those aligned with our target market and distribution strategy.

Please find our details below:
Company Name: ${data.companyName || "[Company Name]"}
Contact Person: ${data.contactPerson || "[Your Name]"}
Email Address: ${data.email || "[Email Address]"}
Phone Number: ${data.phone || "[Phone Number]"}
Business Type: ${data.businessType || "[Business Type]"}
Target Market(s): ${data.targetMarkets || "[Markets]"}
Estimated Volume: ${data.estimatedVolume || "[Volume]"}
Preferred Timeline: ${data.preferredTimeline || "[Timeline]"}

Additional Requirements:
${data.additionalRequirements || "[None]"}

Additionally, we would appreciate a brief overview of your company and how your trade operations are structured to support partners.

Looking forward to your response.

Best regards,
${data.contactPerson || "[Your Name]"}
${data.companyName || "[Company Name]"}`,
  },
  "general-contact": {
    id: "general-contact",
    subject: "General Website Enquiry",
    fields: [
      { name: "message", label: "Message", placeholder: "How can we help you?", type: "textarea" },
    ],
    generateText: (data) => `Hi Team,

You have received a new general enquiry from the website contact form.

Details:
Contact Person: ${data.contactPerson || data.name || "[Your Name]"}
Company Name: ${data.companyName || data.company || "[Company Name]"}
Email Address: ${data.email || "[Email Address]"}
Phone Number: ${data.phone || "[Phone Number]"}
Subject: ${data.subject || "[No Subject]"}

Message:
${data.message || "[No Message]"}

Looking forward to your response.

Best regards,
${data.contactPerson || data.name || "[Your Name]"}`,
  },
  "uk-trade-enquiry": {
    id: "uk-trade-enquiry",
    subject: "UK Trade Pipeline Request",
    fields: [
      { name: "requirementType", label: "Requirement Type", placeholder: "e.g. Rare Malts, House Spirits" },
      { name: "volume", label: "Estimated Monthly Volume", placeholder: "e.g. 500+ Cases" },
      { name: "notes", label: "Additional Notes", placeholder: "Specific brands or logistical requirements...", type: "textarea" },
    ],
    generateText: (data) => `Hi Team,

A new request for the UK Domestic Trade Pipeline has been received.

Partner Details:
Company Name: ${data.companyName || "[Company Name]"}
Contact Person: ${data.contactPerson || data.name || "[Your Name]"}
Email Address: ${data.email || "[Email Address]"}
Phone Number: ${data.phone || "[Phone Number]"}

Requirement Details:
Type: ${data.requirementType || "[Requirement Type]"}
Estimated Volume: ${data.volume || "[Volume]"}

Additional Notes:
${data.notes || "[No Additional Notes]"}

This partner has confirmed their status as a registered business entity in the UK drinks trade.

Best regards,
${data.contactPerson || data.name || "[Your Name]"}`,
  },
  "digital-services": {
    id: "digital-services",
    subject: "Digital Strategy & Scaling Request",
    fields: [
      { name: "brandName", label: "Brand Name", placeholder: "Your Brand" },
      { name: "category", label: "Product Category", placeholder: "e.g. Beverages" },
      { name: "currentMarkets", label: "Current Markets", placeholder: "e.g. India" },
      { name: "targetMarkets", label: "Target Markets", placeholder: "e.g. UK, EU, UAE" },
      { name: "website", label: "Website", placeholder: "https://..." },
      { name: "budget", label: "Budget Range", placeholder: "Select Range" },
      { name: "goals", label: "Requirements / Goals", placeholder: "Describe your growth goals...", type: "textarea" },
    ],
    generateText: (data) => `Hi Team,

A new Digital Strategy & Scaling request has been received.

Brand Details:
Brand Name: ${data.brandName || "[Brand Name]"}
Category: ${data.category || "[Category]"}
Website: ${data.website || "[No Website Provided]"}

Market Strategy:
Current Markets: ${data.currentMarkets || "[No Current Markets]"}
Target Markets: ${data.targetMarkets || "[Target Markets]"}

Project Scope:
Budget Range: ${data.budget || "[Budget Range]"}
Goals & Requirements:
${data.goals || "[No Goals Provided]"}

Contact Information:
Contact Person: ${data.contactPerson || data.name || "[Your Name]"}
Email Address: ${data.email || "[Email Address]"}
Phone Number: ${data.phone || "[Phone Number]"}

Best regards,
${data.contactPerson || data.name || "[Your Name]"}`,
  },
  "sevora-enquiry": {
    id: "sevora-enquiry",
    subject: "Sevora Product Enquiry",
    fields: [
      { name: "businessType", label: "Business Type", placeholder: "e.g. Retail, Hospitality, Distributor" },
      { name: "estimatedVolume", label: "Estimated Monthly Volume", placeholder: "e.g. 500 units" },
      { name: "targetMarkets", label: "Target Market(s)", placeholder: "e.g. UK, EU, UAE" },
      { name: "message", label: "Additional Message / Requirements", placeholder: "How can we help?", type: "textarea" },
    ],
    generateText: (data) => `Hi Team,

A new enquiry has been received for Sevora.

Contact Details:
Company Name: ${data.companyName || "[Company Name]"}
Contact Person: ${data.contactPerson || data.name || "[Your Name]"}
Email Address: ${data.email || "[Email Address]"}
Phone Number: ${data.phone || "[Phone Number]"}

Enquiry Details:
Business Type: ${data.businessType || "[Business Type]"}
Estimated Monthly Volume: ${data.estimatedVolume || "[Volume]"}
Target Market(s): ${data.targetMarkets || "[Markets]"}

Message:
${data.message || "[No Message]"}

Best regards,
${data.contactPerson || data.name || "[Your Name]"}`,
  },
};
