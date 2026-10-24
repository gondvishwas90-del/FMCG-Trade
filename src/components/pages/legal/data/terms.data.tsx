import { AlertCircle, Truck, FileText, CheckCircle, ShieldCheck } from "lucide-react";
import { LegalSection } from "../types/legal.types";

export const TERMS_SECTIONS: LegalSection[] = [
    {
        id: "introduction",
        title: "Terms and Conditions of Sale",
        icon: <FileText className="w-5 h-5" />,
        content: (
            <>
                <p className="font-bold text-lg mb-4 text-emerald-600 dark:text-emerald-400">
                    COLLECTING OR ACCEPTING DELIVERY OF GOODS CONFIRMS THAT YOU ACCEPT THESE TERMS AND CONDITIONS
                </p>
                <p>In these Terms & Conditions:</p>
                <ul className="list-disc pl-6 space-y-2 marker:text-emerald-500">
                    <li>“The Vendor” means <strong>FMCG – EXCHANGE LTD</strong></li>
                    <li>“The Purchaser” means the customer buying goods from the Vendor.</li>
                </ul>
            </>
        )
    },
    {
        id: "availability",
        title: "1. Availability & Returns",
        icon: <CheckCircle className="w-5 h-5" />,
        content: (
            <>
                <ul className="list-disc pl-6 space-y-2 marker:text-emerald-500">
                    <li>All products are sold subject to availability.</li>
                    <li>Goods are sold on a firm sale basis only and are not sold on a sale-or-return basis.</li>
                    <li>Returns are not accepted once delivery has been completed unless expressly agreed by the Vendor in writing.</li>
                </ul>
            </>
        )
    },
    {
        id: "prices-excise",
        title: "2 & 3. Prices and Excise Duty",
        icon: <AlertCircle className="w-5 h-5" />,
        content: (
            <>
                <h4 className="font-semibold mb-2">2. Prices</h4>
                <ul className="list-disc pl-6 space-y-2 marker:text-emerald-500">
                    <li>Prices shown on price lists or quotations may be amended at any time without prior notice.</li>
                    <li>Any change to excise duty or other taxes affecting the goods will entitle the Vendor to amend prices for all affected products accordingly.</li>
                    <li>All prices are quoted exclusive of VAT unless otherwise stated.</li>
                </ul>
                <h4 className="font-semibold mt-6 mb-2">3. Excise Duty</h4>
                <ul className="list-disc pl-6 space-y-2 marker:text-emerald-500">
                    <li>All alcohol supplied by the Vendor is sold duty paid within the UK.</li>
                </ul>
            </>
        )
    },
    {
        id: "payment",
        title: "4 & 5. Payment Terms & Late Payment",
        icon: <ShieldCheck className="w-5 h-5" />,
        content: (
            <>
                <h4 className="font-semibold mb-2">4. Payment Terms</h4>
                <p>Unless otherwise agreed in writing:</p>
                <ul className="list-disc pl-6 space-y-2 marker:text-emerald-500 mb-4">
                    <li>Payment is due prior to collection or delivery.</li>
                    <li>Credit terms may be offered following completion of customer due diligence and satisfactory credit assessment.</li>
                    <li>Where credit terms are granted, invoices must be paid in full within the agreed credit period from the invoice date.</li>
                </ul>
                <p>Payments must be made by bank transfer to the Vendor’s nominated UK business account only.</p>
                <p className="mt-2">The Vendor does not accept:</p>
                <ul className="list-disc pl-6 space-y-2 marker:text-emerald-500 mb-6">
                    <li>Cash payments</li>
                    <li>Payments from personal accounts</li>
                    <li>Third-party payments not registered to the Purchaser</li>
                </ul>

                <h4 className="font-semibold mb-2">5. Late Payment</h4>
                <p>Where any invoice remains unpaid beyond the due date:</p>
                <ul className="list-disc pl-6 space-y-2 marker:text-emerald-500">
                    <li>All outstanding balances become immediately payable.</li>
                    <li>The Vendor reserves the right to suspend further deliveries until the account is brought fully up to date.</li>
                    <li>Interest may be charged on overdue balances at 4% above the Bank of England base rate, calculated daily.</li>
                </ul>
            </>
        )
    },
    {
        id: "retention",
        title: "6. Retention of Title",
        icon: <ShieldCheck className="w-5 h-5" />,
        content: (
            <>
                <ul className="list-disc pl-6 space-y-2 marker:text-emerald-500">
                    <li>Ownership of all goods supplied remains with the Vendor until payment has been received in full in cleared funds.</li>
                    <li>Until such payment is made, the Purchaser holds goods as fiduciary bailee only.</li>
                    <li>The Vendor reserves the right to enter any premises to recover goods for which full payment has not been received.</li>
                    <li>All payments received will be allocated to the oldest outstanding invoice unless otherwise stated on the remittance advice.</li>
                    <li>Bank charges or remittance fees must not be deducted from invoice payments — invoices must be settled in full.</li>
                </ul>
            </>
        )
    },
    {
        id: "delivery-risk",
        title: "7. Delivery & Risk",
        icon: <Truck className="w-5 h-5" />,
        content: (
            <>
                <ul className="list-disc pl-6 space-y-2 marker:text-emerald-500">
                    <li>All goods must be examined at the time of collection or delivery.</li>
                    <li>Any visible shortages or damage must be recorded on the delivery or collection documentation and notified to the Vendor within three working days of delivery.</li>
                    <li>Non-delivery claims must be notified within seven working days of order date.</li>
                    <li>Risk in the goods passes to the Purchaser upon delivery.</li>
                </ul>
            </>
        )
    },
    {
        id: "product-integrity",
        title: "8 & 9. Product Integrity & Customer Registration",
        icon: <CheckCircle className="w-5 h-5" />,
        content: (
            <>
                <h4 className="font-semibold mb-2">8. Product Integrity</h4>
                <p>Goods purchased for:</p>
                <div className="ml-4 mt-2 mb-4 space-y-2">
                    <p className="font-medium">a) Resale</p>
                    <ul className="list-disc pl-6 space-y-1 marker:text-emerald-500">
                        <li>Must be sold only in the condition supplied.</li>
                        <li>Packaging, labels, closures, and security features must not be altered or tampered with.</li>
                    </ul>
                    <p className="font-medium mt-2">b) Licensed Consumption</p>
                    <ul className="list-disc pl-6 space-y-1 marker:text-emerald-500">
                        <li>May be decanted for sale by the glass or carafe where lawful, provided goods were supplied intact and compliant at point of delivery.</li>
                    </ul>
                </div>

                <h4 className="font-semibold mb-2">9. Customer Registration</h4>
                <ul className="list-disc pl-6 space-y-2 marker:text-emerald-500">
                    <li>Prospective trade customers must complete the Vendor’s account registration and due diligence process prior to credit facilities being granted.</li>
                    <li>Immediate trade may be permitted on a payment-with-order basis while checks are completed.</li>
                </ul>
            </>
        )
    },
    {
        id: "regulatory",
        title: "10 - 12. Variations & Regulatory Cooperation",
        icon: <FileText className="w-5 h-5" />,
        content: (
            <>
                <h4 className="font-semibold mb-2">10. Variations</h4>
                <ul className="list-disc pl-6 space-y-2 marker:text-emerald-500 mb-6">
                    <li>These terms constitute the entire agreement relating to sales.</li>
                    <li>Any variation must be agreed in writing by a Director of the Vendor.</li>
                    <li>No employee or agent has authority to vary these terms orally.</li>
                </ul>

                <h4 className="font-semibold mb-2">11. Regulatory Cooperation</h4>
                <p>The Purchaser agrees to cooperate fully with reasonable requests from HMRC or the Vendor relating to:</p>
                <ul className="list-disc pl-6 space-y-2 marker:text-emerald-500 mb-6 mt-2">
                    <li>Supply chain verification</li>
                    <li>Due diligence</li>
                    <li>Regulatory compliance audits</li>
                </ul>

                <h4 className="font-semibold mb-2">12. Governing Law</h4>
                <p>This agreement is governed by and construed in accordance with the laws of England and Wales.</p>
            </>
        )
    }
];
