export interface VolunteerProgram {
  id: string;
  title: string;
  location: string;
  country: string;
  flag: string;
  minAge: string;
  duration: string;
  cost: string;
  focusAreas: string[];
  image: string;
  description: string;
  fullExplanation: string;
  activities: {
    safari: boolean;
    hiking: boolean;
    mountainClimbing: boolean;
    culturalTours: boolean;
  };
  highlights: string[];
}

export const volunteerPrograms: VolunteerProgram[] = [
  {
    id: "animal-welfare-arusha",
    title: "Animal Welfare in Arusha",
    location: "Arusha, Tanzania",
    country: "Tanzania",
    flag: "🇹🇿",
    minAge: "16+ (Families welcome)",
    duration: "1 to 16 weeks",
    cost: "$570",
    focusAreas: ["Animals", "Community"],
    image: "/attached_assets/Animal Wlehare in Arusha_1759178768271.webp",
    description: "Improve the lives of domestic and community animals within the Arusha region of Tanzania through hands-on care and veterinary support.",
    fullExplanation: "This program focuses on improving the lives of domestic and community animals within the Arusha region of Tanzania. Volunteers will primarily assist local organizations that work with rescue animals, shelters, and community outreach programs focused on veterinary care and animal well-being. Your tasks may include hands-on duties such as feeding, grooming, and exercising animals; cleaning kennels and facilities; and assisting with basic veterinary support under supervision. This is deeply rewarding work for animal lovers who want to make a tangible difference in the lives of vulnerable animals while gaining insight into animal welfare challenges in East Africa.",
    activities: {
      safari: true,
      hiking: true,
      mountainClimbing: false,
      culturalTours: true
    },
    highlights: [
      "Direct hands-on care with rescue animals",
      "Assist with veterinary support and treatments",
      "Community outreach and education programs",
      "Work in shelters and animal welfare centers",
      "Learn about animal welfare in East Africa"
    ]
  },
  {
    id: "maasai-immersion",
    title: "Maasai Immersion Volunteer",
    location: "Tanzania",
    country: "Tanzania", 
    flag: "🇹🇿",
    minAge: "17 – 50+",
    duration: "2 weeks",
    cost: "$820",
    focusAreas: ["Community", "Arts & Culture"],
    image: "/attached_assets/maasai immersion _1759178768271.jpg",
    description: "Deep cultural exchange experience within a Maasai community, learning traditions, customs, and participating in daily community life.",
    fullExplanation: "The Maasai Immersion Volunteer program offers a unique and intensive cultural exchange experience within a Maasai community in Tanzania. This is not just a standard volunteer placement; it is a deep dive into the traditions, daily life, and challenges faced by this iconic semi-nomadic tribe. Over the fixed two-week period, volunteers live closely with the Maasai, gaining an understanding of their culture, customs, traditional crafts, and way of life. Activities may involve participating in daily tasks such as cattle herding, traditional cooking, beadwork, and learning about medicinal plants. This program is designed for those seeking authentic cultural immersion rather than traditional volunteer work.",
    activities: {
      safari: true,
      hiking: true,
      mountainClimbing: true,
      culturalTours: true
    },
    highlights: [
      "Live within an authentic Maasai community",
      "Learn traditional crafts and customs",
      "Participate in cattle herding and daily tasks",
      "Experience traditional cooking and food preparation",
      "Study medicinal plants and traditional healing"
    ]
  },
  {
    id: "maasai-teaching-kenya",
    title: "Maasai Teaching Volunteer in Kenya",
    location: "Kenya",
    country: "Kenya",
    flag: "🇰🇪", 
    minAge: "18+ (Families welcome)",
    duration: "1 to 12 weeks",
    cost: "$530",
    focusAreas: ["Community", "Arts & Culture", "Children & Youth", "Teaching"],
    image: "/attached_assets/maasai teching_1759178768272.webp",
    description: "Combine cultural exchange with educational support by teaching within a Maasai community in Kenya, focusing on children and youth education.",
    fullExplanation: "This opportunity combines cultural exchange with educational support by placing volunteers within or near a Maasai community in Kenya to assist with teaching. While immersion is a key part of the experience, the focus is squarely on education, primarily for the children and youth. Volunteers assist local teachers in classrooms, helping to teach subjects like English, mathematics, and basic life skills. You may also be involved in extracurricular activities and creative educational projects. This program offers the perfect balance between meaningful educational work and cultural learning, making it ideal for those interested in both teaching and cultural exchange.",
    activities: {
      safari: true,
      hiking: true,
      mountainClimbing: false,
      culturalTours: true
    },
    highlights: [
      "Teach English, mathematics, and life skills",
      "Assist local teachers in classrooms",
      "Develop extracurricular activities",
      "Experience Maasai culture and traditions",
      "Work with children and youth development"
    ]
  },
  {
    id: "rainforest-conservation-zanzibar",
    title: "Rainforest and Coastal Conservation in Zanzibar",
    location: "Zanzibar, Tanzania",
    country: "Tanzania",
    flag: "🇹🇿",
    minAge: "16+ (Families welcome)",
    duration: "1 to 12 weeks", 
    cost: "$760",
    focusAreas: ["Rainforest", "Coastal Conservation"],
    image: "/attached_assets/rainforest conseravation_1759178768271.jpg",
    description: "Participate in hands-on conservation work in Zanzibar's unique rainforest patches and vulnerable coastal zones, protecting biodiversity and marine ecosystems.",
    fullExplanation: "Located on the stunning island of Zanzibar, this project focuses on two critical ecological areas: the island's unique rainforest patches and its vulnerable coastal zones. Volunteers actively participate in hands-on conservation work. In the rainforest areas, this might involve tracking local wildlife (such as the endemic red colobus monkey), monitoring biodiversity, assisting with reforestation efforts, and clearing invasive species. Along the coast, activities include beach cleanups, coral reef monitoring, marine turtle conservation, and working with local communities on sustainable fishing practices. This program is perfect for environmentally-minded volunteers who want to contribute to preserving some of Africa's most threatened ecosystems.",
    activities: {
      safari: false,
      hiking: true,
      mountainClimbing: false,
      culturalTours: true
    },
    highlights: [
      "Track endemic red colobus monkeys",
      "Monitor biodiversity and wildlife",
      "Participate in reforestation efforts",
      "Conduct beach cleanups and coral monitoring",
      "Support marine turtle conservation"
    ]
  },
  {
    id: "special-needs-care-nairobi",
    title: "Special Needs Care Volunteer Program in Kenya - Nairobi",
    location: "Nairobi, Kenya",
    country: "Kenya",
    flag: "🇰🇪",
    minAge: "18+ (Families welcome)",
    duration: "1 to 12 weeks",
    cost: "$530",
    focusAreas: ["Care Project", "Children & Youth", "Health & Medicine", "Seniors"],
    image: "/attached_assets/special needs program kenya_1759178768271.webp",
    description: "Provide vital support to individuals with special needs, including children and seniors, through daily care, companionship, and therapeutic activities.",
    fullExplanation: "This program in Nairobi provides vital support to individuals with special needs, encompassing both children and seniors. Volunteers are placed in care centers, schools, or homes that serve this vulnerable population. Your role involves providing essential daily care, offering companionship, and assisting staff with therapy or rehabilitative activities. This work is highly rewarding but can be emotionally demanding, requiring patience, compassion, and maturity, hence the 18+ age requirement. Volunteers might help with feeding, mobility assistance, educational activities, recreational programs, and simply providing the human connection that many of these individuals lack. This program is ideal for those considering careers in healthcare, social work, or special education.",
    activities: {
      safari: true,
      hiking: false,
      mountainClimbing: false,
      culturalTours: true
    },
    highlights: [
      "Provide daily care and companionship",
      "Assist with therapeutic activities",
      "Support mobility and feeding assistance",
      "Develop recreational programs",
      "Gain experience in special needs care"
    ]
  },
  {
    id: "sustainable-agriculture-arusha",
    title: "Sustainable Agriculture Volunteer in Arusha",
    location: "Arusha, Tanzania",
    country: "Tanzania",
    flag: "🇹🇿",
    minAge: "16+ (Families welcome)",
    duration: "1 to 16 weeks",
    cost: "$620",
    focusAreas: ["Agriculture", "Environment", "Community"],
    image: "/attached_assets/sustainabale agriculture arusha_1759178768270.webp",
    description: "Empower local farmers with environmentally friendly farming techniques, working on sustainable practices like permaculture, composting, and organic pest control.",
    fullExplanation: "The Sustainable Agriculture project in Arusha is focused on empowering local farmers and communities with environmentally friendly and productive farming techniques. Volunteers work on small farms or community gardens, learning about and contributing to sustainable practices such as permaculture, composting, water harvesting, and organic pest control. The goal is to improve food security and economic self-sufficiency while minimizing environmental impact. Tasks are hands-on, including planting, weeding, harvesting, building irrigation systems, and teaching local farmers new techniques. This program provides valuable experience for those interested in sustainable development, agriculture, or environmental conservation.",
    activities: {
      safari: true,
      hiking: true,
      mountainClimbing: true,
      culturalTours: true
    },
    highlights: [
      "Learn permaculture and organic farming",
      "Build irrigation and water harvesting systems",
      "Teach sustainable farming techniques",
      "Work with local farmers and communities",
      "Contribute to food security initiatives"
    ]
  },
  {
    id: "tanzania-childcare",
    title: "Tanzania Childcare Volunteers",
    location: "Arusha region, Tanzania",
    country: "Tanzania",
    flag: "🇹🇿",
    minAge: "17+",
    duration: "2 to 12 weeks",
    cost: "$756",
    focusAreas: ["Children & Youth"],
    image: "/attached_assets/Tanzania Childcare Volunteers_1759178768270.webp",
    description: "Provide attention, care, and basic educational stimulation to young children in local childcare centers, orphanages, and nursery schools.",
    fullExplanation: "Similar to the Nairobi childcare project but based in the Arusha region of Tanzania, this program places volunteers in local childcare centers, orphanages, or nursery schools. The primary objective is to provide attention, care, and basic educational stimulation to young children who often lack these resources. Volunteers spend their time organizing creative games, reading stories, assisting with meal times, teaching hygiene and basic manners, and generally ensuring a supportive, nurturing environment. Many of these children have experienced trauma or neglect, so volunteers play a crucial role in providing stability, love, and individual attention. This placement is perfect for those interested in early childhood development, education, or social work.",
    activities: {
      safari: true,
      hiking: true,
      mountainClimbing: true,
      culturalTours: true
    },
    highlights: [
      "Organize creative games and activities",
      "Provide individual attention and care",
      "Assist with meals and hygiene teaching",
      "Support early childhood development",
      "Work with vulnerable children"
    ]
  },
  {
    id: "tanzania-english-teaching",
    title: "Tanzania English Teaching Volunteers",
    location: "Arusha region, Tanzania",
    country: "Tanzania",
    flag: "🇹🇿",
    minAge: "17 – 50+",
    duration: "2 to 12 weeks",
    cost: "$925",
    focusAreas: ["Children & Youth", "Education & Literacy", "Community"],
    image: "/attached_assets/Tanzania English Teaching Volunteers _1759178768272.webp",
    description: "Enhance English language proficiency and literacy in schools and community centers, helping students improve speaking, reading, and writing skills.",
    fullExplanation: "This project is dedicated to enhancing English language proficiency and literacy in schools and community centers within the Arusha region. English is highly valued in Tanzania as it is key to higher education, tourism, and professional employment. Volunteers work alongside local teachers, or sometimes lead their own classes, helping students of various ages (primarily children and youth) to improve their speaking, reading, and writing skills. This is a direct educational role that requires lesson planning, classroom management, and creative teaching methods. The impact is immediate and long-lasting, as improved English skills can significantly enhance students' future opportunities. This program is ideal for aspiring teachers, recent graduates, or professionals looking to gain international teaching experience.",
    activities: {
      safari: true,
      hiking: true,
      mountainClimbing: true,
      culturalTours: true
    },
    highlights: [
      "Lead English language classes",
      "Develop lesson plans and materials",
      "Work alongside local teachers",
      "Improve students' future opportunities",
      "Gain international teaching experience"
    ]
  },
  {
    id: "teaching-nairobi",
    title: "Teaching Volunteer Program in Kenya - Nairobi",
    location: "Nairobi, Kenya",
    country: "Kenya",
    flag: "🇰🇪",
    minAge: "18+ (Families welcome)",
    duration: "1 to 12 weeks",
    cost: "$530",
    focusAreas: ["Children & Youth", "Environment", "Education & Literacy", "Community"],
    image: "/attached_assets/Teaching Volunteer Program in Kenya - Nairobi_1759178768272.webp",
    description: "Broad educational initiative in disadvantaged communities, focusing on literacy, numeracy, and environmental education for children and youth.",
    fullExplanation: "The Nairobi Teaching Volunteer Program is a broad educational initiative focused on schools in disadvantaged communities. Volunteers are needed to assist with various subjects, with a particular emphasis on improving literacy, numeracy, and general knowledge for children and youth. Interestingly, this program also includes an environmental focus, suggesting volunteers might help incorporate ecological lessons or assist with local school gardens. Volunteers can expect to help in classrooms, assist teachers with lesson delivery, provide one-on-one tutoring for struggling students, and contribute to extracurricular activities. The diversity of educational needs means volunteers can adapt their contributions based on their skills and interests, making this program suitable for those with various educational backgrounds.",
    activities: {
      safari: true,
      hiking: false,
      mountainClimbing: false,
      culturalTours: true
    },
    highlights: [
      "Teach literacy and numeracy skills",
      "Incorporate environmental education",
      "Provide one-on-one tutoring",
      "Assist with school garden projects",
      "Support disadvantaged communities"
    ]
  }
];