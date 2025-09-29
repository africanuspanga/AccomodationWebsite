import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { 
  HelpCircle, 
  Map, 
  Shield, 
  Camera, 
  Users, 
  Clock, 
  Utensils,
  Car,
  Home,
  Heart,
  Phone
} from 'lucide-react';
import SEOHead from '@/components/seo/seo-head';

export default function FAQ() {
  const planningFAQs = [
    {
      id: "safari-vs-game-drive",
      icon: Map,
      question: "What is the distinction between a \"Safari\" and a \"Game Drive\" on an African journey?",
      answer: "The term \"Safari\" itself is a Swahili word meaning \"trip\" and refers to the entire, comprehensive tour package. This includes your transportation, accommodations at camps or lodges, and all planned wilderness activities, potentially lasting from a few days to two weeks or more. A \"game drive,\" however, is the specific daily activity of driving in a customized 4x4 vehicle within a National Park or Reserve to observe the diverse wild animals in their natural habitats. These drives usually occur twice daily, in the early morning and late afternoon when wildlife activity is at its peak."
    },
    {
      id: "safari-vehicle",
      icon: Car,
      question: "What type of vehicle should I expect for my wilderness exploration, and what are its key features?",
      answer: "The core vehicle for any proper African safari is a robust, customized 4x4 vehicle (such as a Toyota Land Cruiser or similar model). These cars are essential for navigating the off-road trails and challenging terrain found in the National Parks. They are typically equipped with ergonomic seating, a fridge for cold drinks, charging outlets for devices, binoculars, and a crucial pop-up roof. The pop-up roof allows guests to safely stand up for an unobstructed view and clear photography of the wildlife without interference from the vehicle's windows or frame."
    },
    {
      id: "safari-duration",
      icon: Clock,
      question: "What is the standard duration of a safari tour and a daily game drive?",
      answer: "The overall duration of a safari tour is completely dependent upon your preferences and can range from a single day's game drive in a nearby park to an extensive, multi-park tour that spans two weeks or longer. However, a single game drive typically lasts between four and eight hours within the park's operating schedule. The remainder of the day is generally spent relaxing at your lodge or camp, which provides necessary amenities like comfortable accommodations, food, and often a swimming pool or spa facilities."
    },
    {
      id: "early-morning-drives",
      icon: Clock,
      question: "Why is it highly recommended to begin game drives very early in the morning?",
      answer: "We highly recommend leaving your accommodation early, typically between 6:30 AM and 7:00 AM, for maximum wildlife viewing. This timing is strategic because the early mornings are cooler and calmer, which is when the majority of the animals, particularly the predators, are most active before they retreat from the mid-day heat. Additionally, getting an early start often allows you to enter the park ahead of the main surge of other tourist vehicles, providing a more peaceful and exclusive viewing experience."
    },
    {
      id: "safari-meals",
      icon: Utensils,
      question: "How is food handled during the long days spent out in the wilderness?",
      answer: "Most quality safari packages are sold on a full-board basis, meaning all meals are included. This usually translates to having breakfast and dinner at your lodge or camp, while lunch is a hot picnic lunch that you enjoy at a designated picnic spot inside the National Park. Furthermore, a constant supply of essential bottled water and soft drinks, along with tea, coffee, and snacks, is always available inside the safari vehicle's fridge for your comfort throughout the day, ensuring you remain well-hydrated and energized."
    },
    {
      id: "transit-time",
      icon: Map,
      question: "What is the typical transit time required when driving between various National Parks?",
      answer: "In popular safari circuits, such as the Northern Parks of Tanzania (which serves as a good regional example), the major National Parks are located relatively close to one another. You should generally expect the drives between these parks to take an average of two to three hours. These transit drives are an important part of the journey and often offer scenic views, though they are usually not designated game-viewing drives, serving primarily to connect you to your next major wildlife destination."
    },
    {
      id: "bespoke-itinerary",
      icon: Heart,
      question: "Can I choose a bespoke itinerary and select accommodation not included in standard tour packages?",
      answer: "Absolutely, yes. Reputable tour operators specialize in tailor-made safaris. If you choose to book a tailor-made or exclusive tour, you maintain the flexibility to select any accommodation you prefer, even those not listed in the standard program catalogs. Your dedicated tour manager will then be responsible for calculating the cost difference and making all the necessary arrangements, ensuring your itinerary and chosen lodging perfectly match your personal preferences and budget requirements."
    },
    {
      id: "lodge-vs-hotel",
      icon: Home,
      question: "What is a \"Lodge,\" and what differentiates it from a regular hotel on a safari?",
      answer: "A Lodge is a unique style of small, often luxury, accommodation that is specifically situated inside or near the boundaries of a National Park or Game Reserve. They are designed to offer greater privacy and a true sense of exclusivity by featuring detached bungalows, cottages, or high-end tented camps set directly amidst the natural African environment. While providing excellent modern comforts and amenities, the exteriors of many lodges often mirror traditional local architecture and materials, creating an authentic experience that blends seamlessly with the surrounding wilderness."
    }
  ];

  const safetyFAQs = [
    {
      id: "vehicle-exit",
      icon: Shield,
      question: "Are visitors permitted to exit the safari vehicle during a game drive?",
      answer: "As a strict rule for visitor safety and the protection of the fragile local ecosystem, National Park regulations strictly prohibit leaving your vehicle while inside the park boundaries during a game drive. However, this does not mean you must remain cooped up all day. All major parks and reserves are equipped with designated, secure rest and picnic spots. Here, you can safely disembark, stretch your legs, use facilities, and enjoy your lunch in the shade, providing necessary breaks from the confines of the vehicle."
    },
    {
      id: "safari-guide",
      icon: Users,
      question: "Who will be in the safari vehicle with me, and what defines a \"safari guide\"?",
      answer: "The occupants of your safari vehicle depend entirely on the type of tour you book. On a Joined Safari, you share the vehicle with other travelers to split costs. However, if you choose an Exclusive Tour, the only other person in the vehicle will be your designated safari driver/guide. Your driver is not just a chauffeur; they are professional wilderness guides who prioritize your comfort and safety while enthusiastically sharing their extensive knowledge of the African bush, its fauna, flora, and local traditions."
    },
    {
      id: "photography-rules",
      icon: Camera,
      question: "What are the rules regarding photography, video recording, and the use of drones during the safari?",
      answer: "Standard photo and video recording with normal equipment (cameras, phones, etc.) are fully allowed and encouraged throughout the safari. However, permits must be obtained in advance for any recording that is intended for commercial use, though this doesn't apply to general images or videos used on personal social media. The use of drones is strictly regulated and requires a formal permit, a process that is often quite involved and usually reserved for projects of high social or documentary value."
    },
    {
      id: "children-safari",
      icon: Users,
      question: "Is it safe to bring children on a safari, and are there any age guidelines to consider?",
      answer: "Taking children on a safari is generally very safe, highly educational, and fun, giving them a unique, lifelong memory of seeing wild animals in their natural habitat rather than a zoo. However, please be mindful that spending long hours in a safari vehicle, as game drives often require, can be difficult for toddlers. Therefore, we generally do not recommend bringing children younger than two years old on safari, though game drives can sometimes be tailored to suit a family's needs."
    },
    {
      id: "health-risks",
      icon: Shield,
      question: "What should I know about health risks like Malaria or Yellow Fever, and required vaccinations?",
      answer: "While the problem of Malaria is often exaggerated in major tourist areas, consulting a health professional about Malaria prophylaxis is recommended, especially if you plan on visiting more remote regions. Yellow Fever cases are rare in main tourist hubs, but vaccination is generally required if you are arriving from or transiting through a country where Yellow Fever is endemic. It's best to get this vaccination two weeks before travel, and we strongly advise consulting with a travel health clinic before your trip."
    },
    {
      id: "tipping-guide",
      icon: Heart,
      question: "What are the general recommendations for tipping the safari driver/guide?",
      answer: "Tipping is expected in many African countries, including popular safari destinations, and serves as an important recognition of good service. For your dedicated safari driver/guide, we recommend a guideline of USD $30–$50 per day, per vehicle, provided you are satisfied with their service and expertise. This is a general recommendation and should be adjusted based on your personal satisfaction. Tips are typically given to the guide at the conclusion of the entire safari tour."
    },
    {
      id: "travel-insurance",
      icon: Shield,
      question: "What is the policy regarding travel insurance, especially for high-adventure activities?",
      answer: "We highly recommend that you secure comprehensive travel insurance before visiting any foreign country. Beyond covering trip cancellation and delays, your policy should include medical coverage. If your itinerary involves high-adventure activities, such as climbing major peaks like Mount Kilimanjaro, you must ensure your policy explicitly covers climbing emergencies up to a height of at least 6,000 meters. Your tour manager can assist you with purchasing an appropriate insurance policy if needed."
    },
    {
      id: "water-safety",
      icon: Shield,
      question: "Is the water safe to drink at safari accommodations, and what is the best practice?",
      answer: "All reputable hotels and lodges used by tour operators generally provide safe water for showering and brushing teeth. However, as a standard precaution across much of Africa, we strongly recommend that you only drink bottled water. Bottled water is widely available at all hotels, shops, and is always kept stocked in the fridge of your safari vehicle, making it easy to stay safely hydrated throughout your entire wilderness adventure."
    }
  ];

  return (
    <>
      <SEOHead 
        title="African Safari FAQ - Expert Answers to Your Travel Questions | Accommodation Collection"
        description="Get expert answers to essential African safari questions. Learn about planning, safety, logistics, and what to expect on your wilderness adventure in Africa."
        canonical="/faq"
        ogImage="/attached_assets/victoria fals_1759175723488.jpg"
      />
      
      <div className="pt-32 pb-20">
        <div className="container-custom max-w-6xl">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
                <HelpCircle className="h-8 w-8 text-primary-foreground" />
              </div>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Essential African Safari FAQs
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Preparing for Your Wilderness Journey with expert answers to the most common questions about African safaris, planning, and logistics.
            </p>
          </div>

          {/* Safari Planning and Logistics Section */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
                <Map className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
                  Safari Planning & Logistics
                </h2>
                <p className="text-muted-foreground">Essential information for planning your perfect safari adventure</p>
              </div>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {planningFAQs.map((faq, index) => (
                <AccordionItem 
                  key={faq.id} 
                  value={faq.id}
                  className="bg-card rounded-xl border border-border overflow-hidden"
                  data-testid={`planning-faq-${index + 1}`}
                >
                  <AccordionTrigger className="px-6 py-4 hover:bg-accent/5 transition-colors text-left">
                    <div className="flex items-start gap-4 pr-4">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <faq.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <Badge variant="secondary" className="mb-2 text-xs">
                          Planning FAQ #{index + 1}
                        </Badge>
                        <h3 className="font-semibold text-foreground leading-tight">
                          {faq.question}
                        </h3>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="ml-12">
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Safety, Health, and Etiquette Section */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
                  Safety, Health & Etiquette
                </h2>
                <p className="text-muted-foreground">Important guidelines for a safe and respectful safari experience</p>
              </div>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {safetyFAQs.map((faq, index) => (
                <AccordionItem 
                  key={faq.id} 
                  value={faq.id}
                  className="bg-card rounded-xl border border-border overflow-hidden"
                  data-testid={`safety-faq-${index + 1}`}
                >
                  <AccordionTrigger className="px-6 py-4 hover:bg-accent/5 transition-colors text-left">
                    <div className="flex items-start gap-4 pr-4">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <faq.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <Badge variant="secondary" className="mb-2 text-xs">
                          Safety FAQ #{index + 1}
                        </Badge>
                        <h3 className="font-semibold text-foreground leading-tight">
                          {faq.question}
                        </h3>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="ml-12">
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Call to Action Section */}
          <div className="bg-primary rounded-2xl p-8 md:p-12 text-center">
            <div className="flex justify-center mb-6">
              <Phone className="h-12 w-12 text-primary-foreground" />
            </div>
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              Still Have Questions?
            </h3>
            <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Our expert team is here to help you plan the perfect African safari experience. 
              Get personalized answers and custom itinerary planning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="px-8 py-3 font-semibold"
                  data-testid="contact-us-button"
                >
                  Contact Our Experts
                </Button>
              </Link>
              <Link href="/itineraries">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="px-8 py-3 font-semibold bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                  data-testid="view-itineraries-button"
                >
                  View Safari Packages
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}