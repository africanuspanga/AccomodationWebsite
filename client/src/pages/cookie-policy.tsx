import SEOHead from '@/components/seo/seo-head';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cookie, Mail } from 'lucide-react';

export default function CookiePolicy() {
  return (
    <>
      <SEOHead 
        title="Cookie Policy - Accommodation Collection"
        description="Learn about how Accommodation Collection uses cookies and similar technologies to enhance your browsing experience and improve our website functionality."
        canonical="/cookie-policy"
      />
      
      <div className="pt-32 pb-20">
        <div className="container-custom max-w-5xl">
          <div className="text-center mb-16">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Cookie className="h-8 w-8 text-primary" />
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              Cookie Policy
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              How we use cookies and similar technologies to improve your experience.
            </p>
          </div>

          <Card className="mb-8">
            <CardContent className="pt-6 prose prose-lg max-w-none">
              <p className="text-muted-foreground">
                At Accommodation Collection, we want to ensure that your visit to our site is smooth, reliable and as useful to you as possible. To help us do this, we use cookies and similar technologies. By continuing to use our site, you consent to our use of Cookies. However, you can change your Cookie settings at any time through your browser settings.
              </p>
              
              <p className="text-muted-foreground">
                By using, visiting, or browsing our site (use of our site including, amongst others, accessing our site and/or using the services provided by us), you accept and agree to this Cookie Policy and the website terms and conditions.
              </p>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-primary">1.</span>
                  WHAT ARE COOKIES?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  A cookie is a small file of letters and numbers that is stored by your internet browser and transferred to the hard drive of your computer or mobile device. Cookies contain basic information about your internet use, but most Cookies do not identify you personally. Your browser sends these Cookies back to the web sites that you visit every time you visit them, so they can recognise your computer or mobile device. This is done in order to personalise and improve your browsing experience.
                </p>
                
                <p>
                  One important use of Cookies is to remember your login details, so you do not have to re-enter them repeatedly. Other Cookies help web sites to understand what did and did not interest you in relation to the site, so that they can provide you with features that are more relevant and useful to you next time you visit.
                </p>
                
                <p>
                  We may work with third party advertisers to give you access to interesting and exciting content through our site. So, as well as setting some Cookies ourselves (First Party Cookies), we may also allow some advertisers who display advertisements on our site to set Cookies (Third Party Cookies). These Cookies record information about your use of advertisements. This helps advertisers to show you advertisements that are more likely to interest you, limit the number of times you might see an advertisement, and help measure the effectiveness of advertising campaigns.
                </p>
                
                <p>
                  Please note that our use of any information we collect about you through your use of Cookies is subject to our Privacy Policy.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-primary">2.</span>
                  TYPES OF COOKIES
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Necessary Cookies</h3>
                  <p>
                    These Cookies are necessary to help you access and move around our site and use the services, and all other features. Without these Cookies, functionality of our site would be limited and you would not be able to use some of the services. For example, a Cookie is used to keep you logged in during your visit to our site. We may also use essential Cookies for fraud detection and prevention purposes.
                  </p>
                  <p className="mt-2">
                    You are not able turn off necessary Cookies. The reason for this is that such Cookies are necessary for our site to function fully, and for you to access and use the content and services.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Analytical Cookies</h3>
                  <p>
                    We may use Cookies to help us understand how you and other users are using our site and how we can improve our users' experiences. These types of Cookies can provide us with anonymous information to help us understand which parts of our site interest our users, and if any errors are being experienced. We use these Cookies to test different designs and features for our site and we also use them to help us monitor how our users reach our site.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Customisation Cookies</h3>
                  <p>
                    These are used to recognise you when you return to our site. This enables us to personalise content for you, greet you by name, and remember your preferences (for example, your choice of language or region).
                  </p>
                  <p className="mt-2">
                    Some customisation Cookies may be essential if you want to use certain Services.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Advertising Cookies</h3>
                  <p>
                    To the extent that we may allow for advertising on our site, advertising Cookies help to ensure that the advertisements you see on our site are as relevant to you as possible. For example, some advertising Cookies help select advertisements that are relevant to your interests. Others help prevent the same advertisement from continuously reappearing for you.
                  </p>
                  <p className="mt-2">
                    We also want to make it as easy as possible for you to share content from our site with your friends through your favourite social networks. Social networking sites may set Cookies that recognise you when you view content on our site and allow you to share content across both sites via the use of sharing settings. For further details, please see your social networking site's terms of use and related policies.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-primary">3.</span>
                  MANAGING COOKIES
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set cookies, you may worsen your overall user experience, since it will no longer be personalised to you. It may also stop you from saving customised settings like login information.
                </p>
                
                <p>
                  You can manage cookies in your browser settings. Here are links to cookie management for popular browsers:
                </p>
                
                <ul className="space-y-2 ml-6">
                  <li>• <strong>Google Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
                  <li>• <strong>Mozilla Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
                  <li>• <strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
                  <li>• <strong>Microsoft Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-primary">4.</span>
                  THIRD-PARTY COOKIES
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the website, deliver advertisements on and through the website, and so on. These third parties may include:
                </p>
                
                <ul className="space-y-2 ml-6">
                  <li>• Analytics providers (e.g., Google Analytics)</li>
                  <li>• Advertising networks</li>
                  <li>• Social media platforms</li>
                  <li>• Payment processors</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-primary">5.</span>
                  UPDATES TO THIS COOKIE POLICY
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  We may update this Cookie Policy from time to time in order to reflect changes to the cookies we use or for other operational, legal or regulatory reasons. Please revisit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
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
                  If you have any questions about this Cookie Policy, please contact us:
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