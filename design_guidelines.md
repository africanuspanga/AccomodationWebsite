# Design Guidelines: Accommodation Collection

## Design Approach
**Reference-Based**: Inspired by luxury travel platforms (Airbnb, Booking.com) with elevated safari/nature aesthetics. Focus on immersive imagery, generous whitespace, and sophisticated typography that conveys exclusivity and adventure.

## Color & Visual Treatment

**Primary Palette**:
- Primary Teal: 167 84% 32% (main brand actions, key CTAs)
- Accent Teal: 167 84% 45% (hover states, highlights)
- Warm Beige: 35 40% 94% (backgrounds, cards)
- Deep Beige: 35 25% 88% (subtle borders, dividers)
- Rich Brown: 25 30% 25% (text, headings)
- Soft Cream: 40 50% 98% (alternate backgrounds)

**Visual Strategy**: Earth-toned foundation with teal as strategic accent. High-contrast photography against neutral backgrounds. Minimal use of gradients—rely on natural imagery for visual richness.

## Typography System

**Headings (Playfair Display - Serif)**:
- Hero Display: text-6xl/text-7xl lg:text-8xl, font-bold, tracking-tight
- Section Headers: text-4xl lg:text-5xl, font-semibold
- Card Titles: text-2xl lg:text-3xl, font-semibold

**Body (Inter - Sans-serif)**:
- Primary Body: text-base lg:text-lg, leading-relaxed
- Supporting Text: text-sm lg:text-base
- Captions: text-xs lg:text-sm, tracking-wide

**Hierarchy**: Playfair creates elegance for headlines; Inter ensures readability for extended content.

## Layout & Spacing System

**Container Strategy**:
- Full-width hero: w-full with max-w-7xl inner content
- Content sections: max-w-6xl mx-auto
- Text-heavy areas: max-w-4xl for optimal reading

**Spacing Primitives**: Use Tailwind units of 4, 6, 8, 12, 16, 20, 24 for consistent rhythm
- Section padding: py-16 md:py-24 lg:py-32
- Component gaps: gap-6 md:gap-8 lg:gap-12
- Card padding: p-6 md:p-8

**Grid Systems**:
- Destination Cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Feature Highlights: grid-cols-1 md:grid-cols-2 
- Testimonials: grid-cols-1 lg:grid-cols-2

## Component Library

**Navigation**:
- Transparent header overlaying hero, transitions to warm beige on scroll
- Logo (left), primary nav links (center), "Book Now" CTA in primary teal (right)
- Mobile: Elegant slide-in drawer with cream background

**Hero Section** (Full viewport with image):
- Large background image with subtle dark overlay (20% opacity)
- Centered content: oversized Playfair headline, subtitle, dual CTAs
- Primary CTA (filled teal), Secondary CTA (outline with backdrop-blur-sm)
- Floating trust indicator: "Curated by Safari Experts Since 2010"

**Destination Cards**:
- Rounded-lg overflow-hidden shadow-lg
- Image aspect ratio 4:3, subtle hover scale transform
- Overlay gradient (bottom) with white text
- Location pin icon, destination name, "from $XXX/night"

**Feature Grid**:
- Icon (teal circular background) + Title (Playfair) + Description (Inter)
- Features: Curated Experiences, Local Guides, Luxury Lodging, Wildlife Adventures
- 4-column desktop, 2-column tablet, stack mobile

**Testimonial Cards**:
- Warm beige background with soft shadow
- 5-star rating (teal stars), quote in italics, traveler photo (circular), name + location

**Stats Counter**:
- 4-column layout: "500+ Destinations", "10K+ Happy Travelers", "15 Countries", "100% Sustainable"
- Large numbers (Playfair), labels (Inter), primary teal accent

**CTA Sections**:
- Full-width beige background with centered content
- Headline + supporting text + primary CTA
- Variant: Split layout with image (left) and content (right)

**Footer**:
- Rich footer: Newsletter signup, quick links (Destinations, About, Contact), social icons
- Trust badges: "Sustainable Tourism", "Verified Operators"
- Beige background with brown text

## Images

**Large Hero Image**: 
Full-width banner featuring African savanna sunset with wildlife silhouettes (elephants/giraffes). Warm golden hour lighting. Positioned as viewport-height background.

**Destination Cards**: 
High-quality photography for each location: Victoria Falls mist, Serengeti plains with wildlife, Zanzibar beaches, Cape Town mountains, Maasai Mara sunrise. Each image 1200x900px minimum.

**Feature Section**: 
Half-width contextual image showing safari guide with binoculars, positioned alongside features grid.

**CTA Section**: 
Split layout image: luxury tented camp interior with African textiles and warm lighting, 1400x800px.

**Trust Elements**: 
Small circular traveler photos for testimonials (150x150px), subtle background patterns using African geometric motifs.