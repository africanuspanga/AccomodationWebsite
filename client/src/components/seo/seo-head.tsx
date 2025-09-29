import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  noIndex?: boolean;
}

export default function SEOHead({ 
  title, 
  description, 
  canonical, 
  ogImage = '/attached_assets/four-seasons-serengeti-night_1757883337619.jpg',
  noIndex = false 
}: SEOHeadProps) {
  const fullTitle = title.includes('Accommodation Collection') 
    ? title 
    : `${title} | Accommodation Collection - Africa Travel & Safari`;
  
  const baseUrl = 'https://accommodations.guide';
  const fullCanonical = canonical ? `${baseUrl}${canonical}` : undefined;
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      {fullCanonical && <link rel="canonical" href={fullCanonical} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullOgImage} />
      {fullCanonical && <meta property="og:url" content={fullCanonical} />}
      <meta property="og:site_name" content="Accommodation Collection" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />
      
      {/* Additional SEO meta tags */}
      <meta name="author" content="Accommodation Collection" />
      <meta name="geo.region" content="TZ" />
      <meta name="geo.placename" content="Africa" />
      <meta name="geo.position" content="-6.369028;34.888822" />
      <meta name="ICBM" content="-6.369028, 34.888822" />
    </Helmet>
  );
}