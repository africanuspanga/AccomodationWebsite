import SEOHead from '@/components/seo/seo-head';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Mail } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <>
      <SEOHead 
        title="Privacy Policy - Accommodation Collection"
        description="Learn how Accommodation Collection protects your personal information and privacy. Our comprehensive privacy policy explains data collection, usage, and your rights."
        canonical="/privacy-policy"
      />
      
      <div className="pt-32 pb-20">
        <div className="container-custom max-w-5xl">
          <div className="text-center mb-16">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
            </p>
          </div>

          <Card className="mb-8">
            <CardContent className="pt-6 prose prose-lg max-w-none">
              <p className="text-muted-foreground">
                This Privacy Policy explains our views and practices regarding the collection, processing, use, disclosure and transfer of your information by us (the "Privacy Policy"). By using, visiting, or browsing our site (use of our site including, amongst others, accessing our site and/or submitting enquiries through our site), you accept and agree to this Privacy Policy, the website terms and conditions, and any other document referred to therein.
              </p>
              
              <p className="text-muted-foreground">
                <strong>Accommodation Collection</strong> ("we", "our" or "us") processes personal information in accordance with applicable data protection laws and regulations.
              </p>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-primary">1.</span>
                  INFORMATION WE MAY COLLECT FROM YOU
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  We receive and store information, including personal information, about you and your use of our site. This information is gathered in a number of ways, as further set out below. In this Privacy Policy, the term "personal information" means information that can be used to uniquely identify or contact you.
                </p>
                
                <p>We may collect the following information:</p>
                
                <ul className="space-y-2 ml-6">
                  <li>• Information that you provide by filling in forms on or through our site, including any online enquiries. We may also ask you for information when you report a problem with our site or any services you have received from us;</li>
                  <li>• Details of your visits to and use of our site including, but not limited to, traffic data, location data, weblogs, service provider page viewing statistics and other communication data;</li>
                  <li>• Information related to you and your use of our site, including but not limited to: your online activity, contributions, payment history, correspondence, internet protocol addresses, device and software data;</li>
                  <li>• A record of correspondence if you contact us;</li>
                  <li>• Information obtained from surveys that we may ask you to voluntarily complete from time to time;</li>
                  <li>• Information posted by you pursuant to reviews of our site and the services;</li>
                  <li>• Any other information that may be necessary to carry out actions for the conclusion or performance of a contract, comply with legal obligations, or protect your legitimate interests.</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-primary">2.</span>
                  INTERNET PROTOCOL ADDRESSES
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>
                  We may collect information about your device, including (where available) your internet protocol address, operating system and browser type, for system administration, and to report aggregate information to our advertisers and/or service providers. This is statistical information about your browsing actions and patterns, and you cannot be identified by this information.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-primary">3.</span>
                  WHERE WE STORE YOUR PERSONAL INFORMATION
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>
                  The information that we collect from you may be transferred to, and stored at, a destination outside of the jurisdiction where it was collected. It may also be processed by staff members operating outside of the jurisdiction where it was collected who work for us or for one of our service providers (including but not limited to payment processors, cloud service or other IT providers, and other companies that provide services to us). By submitting your personal information, you agree to this transfer, storing or processing.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-primary">4.</span>
                  SECURITY
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  We take information security seriously and use reasonable and adequate administrative, technical, physical and managerial measures to protect your personal information from unauthorised access. For example, we utilise industry-standard protocols for certain of your transmissions to us, in order to encrypt certain personal information that you send to us through the enquiry process.
                </p>
                
                <p>
                  Unfortunately, no security system can be guaranteed to be completely secure. Accordingly, although we will do our best to protect your personal information, we cannot guarantee the security of your information transmitted to or through our site or the services, and any transmission is at your own risk.
                </p>
                
                <p>
                  We will not be liable for any access to your personal information that is obtained by any third party through your failing to adequately restrict access to your device or your account.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-primary">5.</span>
                  USES MADE OF THE INFORMATION
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>We use information and personal information held about you and other users for the following purposes:</p>
                
                <ul className="space-y-2 ml-6">
                  <li>• To ensure that content on our site and the services is presented in the most effective manner for you, and for your computer or other device;</li>
                  <li>• To communicate with you, including in respect of any enquiry or booking request you may submit to us;</li>
                  <li>• To provide you, or allow our service providers to provide you, with information, products or services that you request from us or which we feel may interest you (such as newsletters, messages about new features, special offers, promotional announcements), where you have expressly consented to be contacted for such purposes;</li>
                  <li>• To determine your general geographic location, to enforce the terms of this Privacy Policy and the website terms and conditions, and to personalise our site and the services we provide;</li>
                  <li>• To carry out our obligations arising from any contracts entered into between you and us;</li>
                  <li>• To allow you to participate in interactive features of our site and the services we provide, when you choose to do so;</li>
                  <li>• To notify you about changes to our site and the services we provide, or to the website terms and conditions.</li>
                </ul>
                
                <p>
                  The processing of personal data for the purposes specified above will be conducted on a legal basis. These legal bases include: consent, necessity for the performance of a contract or a legitimate interest. Legitimate interests may include: marketing, advertising, research and an analysis of our products and services.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-primary">6.</span>
                  THIRD-PARTY SERVICE PROVIDERS
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>We use a number of external parties to assist us in processing personal data for the above purposes, and they may hold this personal data on their own servers. We may share the information we obtain with:</p>
                
                <ul className="space-y-2 ml-6">
                  <li>• <strong>Service Providers:</strong> Payment card processing, email distribution, cloud computing, analytics, and other service providers that help us operate our business;</li>
                  <li>• <strong>Marketing Partners:</strong> Advertisers, advertising agencies, and marketing businesses that help create and deliver marketing campaigns;</li>
                  <li>• <strong>Content Measurement Companies:</strong> Third parties that measure the performance of our digital content;</li>
                  <li>• <strong>Social Media Platforms:</strong> If you interact with social media features on our site, the relevant platforms may collect information;</li>
                  <li>• <strong>Business Partners:</strong> Joint marketing partners, content sponsors, and other business partners for various purposes.</li>
                </ul>
                
                <p>
                  If you would like access to a full list of our service providers please contact us at accommodationcollection@gmail.com. We are not responsible for, nor do we endorse the privacy practices of these external third parties.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-primary">7.</span>
                  DISCLOSURE OF YOUR INFORMATION
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>
                  We may disclose your personal information to a third party if we reasonably believe that access, use, preservation or disclosure of such information is reasonably necessary to: (a) satisfy any applicable law, regulation, legal process, or governmental request; (b) enforce applicable terms of use, including investigation of potential violations thereof; (c) detect, prevent, or otherwise address illegal or suspected illegal activities, security or technical issues; or (d) protect against harm to the rights, property or safety of our company, our users or the public as required or permitted by law.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-primary">8.</span>
                  YOUR RIGHTS
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  You have the right to ask us not to process your personal information for marketing purposes. We will usually inform you (before collecting your information) if we intend to use your information for such purposes or if we intend to disclose your information to any third party for such purposes. You can exercise your right to prevent such processing by checking certain boxes on the form on which we collect your information or by responding to the emails we send you in this regard.
                </p>
                
                <p>You may also have the following rights:</p>
                
                <ul className="space-y-2 ml-6">
                  <li>• Right of access to obtain access to the personal data concerning you;</li>
                  <li>• The right to rectification or correction of your personal data;</li>
                  <li>• The right to erasure of the personal data concerning you;</li>
                  <li>• The right to restriction of the processing;</li>
                  <li>• The right to data portability (receive your personal data in a structured, commonly used format);</li>
                  <li>• The right to object to profiling;</li>
                  <li>• The right to lodge a complaint with a supervisory authority;</li>
                  <li>• The right to withdraw your consent.</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-primary">9.</span>
                  COOKIES
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>
                  Our site uses cookies to distinguish you from other users of our site. This helps us to provide you with a good experience when you browse our site and also allows us to improve our site. For detailed information on the cookies we use and the purposes for which we use them, please see our Cookie Policy.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-primary">10.</span>
                  CHANGES TO THIS PRIVACY POLICY
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  CONTACT US
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  If you have any questions about this Privacy Policy, please contact us:
                </p>
                
                <div className="space-y-2">
                  <p className="font-semibold">Email:</p>
                  <a href="mailto:accommodationcollection@gmail.com" className="text-primary hover:underline">
                    accommodationcollection@gmail.com
                  </a>
                </div>
                
                <div className="space-y-2">
                  <p className="font-semibold">Phone:</p>
                  <p className="text-muted-foreground">+255717523882 / +255696154521</p>
                </div>
                
                <div className="space-y-2">
                  <p className="font-semibold">Address:</p>
                  <p className="text-muted-foreground">
                    ACU Tower, Plot: 30 & 31, Block: J<br />
                    House Number: 18, Road: Sokoine Road<br />
                    Street: Pangani, Ward: Kati<br />
                    Region: Arusha, Country: Tanzania<br />
                    Postal Address: 13874, Post Code: 23102
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-12">
            Last Updated: January 2025
          </p>
        </div>
      </div>
    </>
  );
}