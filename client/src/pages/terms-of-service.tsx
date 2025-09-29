import SEOHead from '@/components/seo/seo-head';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Mail } from 'lucide-react';

export default function TermsOfService() {
  return (
    <>
      <SEOHead 
        title="Terms of Service - Accommodation Collection"
        description="Read the terms and conditions for using Accommodation Collection's website and services. Learn about our policies, user responsibilities, and service agreements."
        canonical="/terms-of-service"
      />
      
      <div className="pt-32 pb-20">
        <div className="container-custom max-w-5xl">
          <div className="text-center mb-16">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Please read these terms carefully before using our website and services.
            </p>
          </div>

          <Card className="mb-8">
            <CardContent className="pt-6 prose prose-lg max-w-none">
              <p className="text-muted-foreground">
                By accessing and using the Accommodation Collection website, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
              </p>
              
              <p className="text-muted-foreground">
                The materials contained in this website are protected by applicable copyright and trademark law.
              </p>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-primary">1.</span>
                  ABOUT US
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  This website is operated by <strong>Accommodation Collection</strong> ("we", "our" or "us"). We are located at:
                </p>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="font-semibold mb-2">Accommodation Collection</p>
                  <p>
                    ACU Tower, Plot: 30 & 31, Block: J<br />
                    House Number: 18, Road: Sokoine Road<br />
                    Street: Pangani, Ward: Kati<br />
                    Region: Arusha, Country: Tanzania<br />
                    Postal Address: 13874, Post Code: 23102
                  </p>
                </div>
                
                <p>The following policies also apply to your use of this site:</p>
                
                <ul className="space-y-2 ml-6">
                  <li>• Our Privacy Policy which sets out the terms on which we process any data we collect from you, or that you provide to us. By using our site, you consent to such processing and you warrant that all data provided by you is accurate;</li>
                  <li>• Our Cookie Policy, which sets out the terms on which we will use cookies collected from your use of our site. You consent to such cookie processing and use by us.</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-primary">2.</span>
                  USE LICENSE
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  You are hereby granted a worldwide, irrevocable, perpetual, non-exclusive, royalty-free licence to temporarily download one copy of the materials (information or software) on Accommodation Collection's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                
                <ul className="space-y-2 ml-6">
                  <li>• Modify or copy the materials;</li>
                  <li>• Use the materials for any commercial purpose, or for any public display;</li>
                  <li>• Attempt to decompile or reverse engineer any software contained on Accommodation Collection's website;</li>
                  <li>• Remove any copyright or other proprietary notations from the materials;</li>
                  <li>• Transfer the materials to another person or "mirror" the materials on any (commercial or non-commercial) or other server.</li>
                </ul>
                
                <p>
                  This license shall automatically terminate if you violate any of these restrictions and may be terminated by Accommodation Collection at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-primary">3.</span>
                  DISCLAIMER
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  The materials on Accommodation Collection's website are provided on an 'as is' basis. Accommodation Collection makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                </p>
                
                <p>
                  Further, Accommodation Collection does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-primary">4.</span>
                  LIMITATIONS
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  In no event shall Accommodation Collection or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Accommodation Collection's website, even if Accommodation Collection or an Accommodation Collection authorized representative has been notified orally or in writing of the possibility of such damage.
                </p>
                
                <p>
                  Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.
                </p>
                
                <p>
                  Nothing in these terms of website use excludes or limits our liability for death or personal injury arising from our negligence, or our fraud or fraudulent misrepresentation, or any other liability that cannot be excluded or limited by any applicable law.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-primary">5.</span>
                  ACCURACY OF MATERIALS
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  The materials appearing on Accommodation Collection's website could include technical, typographical, or photographic errors. Accommodation Collection does not warrant that any of the materials on its website are accurate, complete or current. Accommodation Collection may make changes to the materials contained on its website at any time without notice. However Accommodation Collection does not make any commitment to update the materials.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-primary">6.</span>
                  LINKS
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Accommodation Collection has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Accommodation Collection of the site. Use of any such linked website is at the user's own risk.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-primary">7.</span>
                  MODIFICATIONS
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Accommodation Collection may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-primary">8.</span>
                  BOOKING AND PAYMENT TERMS
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  When you make a booking or inquiry through our website:
                </p>
                
                <ul className="space-y-2 ml-6">
                  <li>• All prices are subject to availability and may change without notice;</li>
                  <li>• Payment terms and cancellation policies will be clearly communicated during the booking process;</li>
                  <li>• You agree to provide accurate and complete information for all bookings;</li>
                  <li>• We reserve the right to refuse or cancel any booking at our discretion;</li>
                  <li>• Specific terms and conditions may apply to individual services, accommodations, or tours.</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-primary">9.</span>
                  GOVERNING LAW
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  To the extent permitted by applicable law, these terms and conditions are governed by and construed in accordance with the laws of Tanzania and you irrevocably submit to the exclusive jurisdiction of the courts in Arusha, Tanzania.
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
                  If you have any questions about these Terms of Service, please contact us:
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