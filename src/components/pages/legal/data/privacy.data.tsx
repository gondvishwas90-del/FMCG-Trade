import { Eye, Shield, Lock, FileText, Globe } from "lucide-react";
import { LegalSection } from "../types/legal.types";

export const PRIVACY_SECTIONS: LegalSection[] = [
    {
        id: "introduction",
        title: "Introduction",
        icon: <Shield className="w-5 h-5" />,
        content: (
            <>
                <p>
                    <strong>FMCG Exchange</strong> is committed to protecting your privacy and keeping your personal information secure. This Privacy Policy sets out the basis on which any personal data we collect from you, or that you provide to us, will be processed by us. By using our website, you consent to the collection and use of your personal information by us as outlined in this Privacy Policy. Please read the following information carefully to understand our practices regarding your personal data.
                </p>
            </>
        )
    },
    {
        id: "data-protection",
        title: "Data Protection",
        icon: <Lock className="w-5 h-5" />,
        content: (
            <>
                <p>
                    Any personal information you supply to FMCG Exchange via this website (and by other means) will be treated in accordance with the EU GDPR regulations intended to protect your personal information and privacy. If we hold information about you, we’ll only use this for the purposes you’ve agreed to. We will never release information about our customers or business partners to any other person or organization.
                </p>
                <div className="bg-card text-card-foreground rounded-xl p-6 mt-6 border border-border shadow-sm">
                    <p className="font-bold text-lg mb-2 text-emerald-500">The Data Controller is:</p>
                    <p className="text-muted-foreground">FMCG Exchange</p>
                    <p className="text-muted-foreground">Email: info@fmcg-exchange.com</p>
                </div>
            </>
        )
    },
    {
        id: "data-collection",
        title: "Data Collection & Storage",
        icon: <FileText className="w-5 h-5" />,
        content: (
            <>
                <p className="font-semibold mb-2">What data is collected or may be collected, how it is collected, and how long it is stored?</p>
                <p>
                    Name, Address, Staff Names, delivery address, and Email Address are held and stored as detailed under purposes and legal basis for processing data, provided by the data subject, and stored until the end of the relationship with the customer.
                </p>
                
                <h4 className="font-semibold mt-6 mb-2">Your Rights</h4>
                <p>The following rights regarding data held by FMCG Exchange:</p>
                <p>
                    You may exercise these rights of access, rectification, objection, and deletion by contacting us by email at info@fmcg-exchange.com.
                </p>
            </>
        )
    },
    {
        id: "cookies",
        title: "Cookies",
        icon: <Globe className="w-5 h-5" />,
        content: (
            <>
                <p>
                    A cookie is a text file containing information that can be remembered by a web browser between pages. When an individual uses a web browser to access the internet, their browser can create cookies, which are stored on the user’s computer. Cookies are not programs and therefore cannot contain viruses or other malicious software. They are purely a string of text and numbers.
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2 marker:text-emerald-500">
                    <li><strong>Session cookies:</strong> Only last during a single visit. When you close your web browser, the session cookie information is automatically removed from your computer.</li>
                    <li><strong>Persistent cookies:</strong> Stored by the user’s web browser even when the web browser has been closed, so that the next time a user goes back to the website that originally set the cookie, the website can read information back from the cookie. Persistent cookies have an expiry date, which controls when they are automatically deleted. This can be anything from a few minutes to several years, depending on your own browser settings.</li>
                </ul>
                <p className="mt-4">
                    FMCG Exchange uses these cookies to remember which items a customer has put into their cart. By using a persistent cookie for this, a customer can close their web browser and come back to the site subsequently and still be able to access items that had been put into their cart on a previous visit. This cookie is essential for the functioning of the site, as without it, customers would be unable to place items into the shopping basket.
                </p>
            </>
        )
    },
    {
        id: "miscellaneous",
        title: "Miscellaneous",
        icon: <Eye className="w-5 h-5" />,
        content: (
            <>
                <p>
                    We reserve the right to change, modify, add, or remove this Privacy Policy or parts of it at any time. Therefore, we recommend that you check this Privacy Policy for modifications on a regular basis. The last date of modifications will always be mentioned at the end of this Privacy Policy.
                </p>
                <p className="mt-4">
                    If you have any questions or concerns regarding this Privacy Policy, please do not hesitate to contact us by email at info@fmcg-exchange.com.
                </p>
            </>
        )
    }
];
