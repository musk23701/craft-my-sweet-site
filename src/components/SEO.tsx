import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
  structuredData?: object;
}

const DEFAULT_TITLE = 'Automind Labs AI | AI Automation Agency USA';
const DEFAULT_DESCRIPTION = 'Automind Labs is a leading AI automation agency in the United States. We help businesses automate workflows, integrate AI solutions, and scale operations with custom automation systems. Serving clients across California, New York, Texas & nationwide.';
const DEFAULT_KEYWORDS = 'AI automation agency, AI automation services USA, business automation solutions, workflow automation company, AI integration services, automation consulting, artificial intelligence automation, business process automation, AI workflow solutions, automation agency California, AI services New York, automation company Texas, enterprise AI solutions, small business automation, AI chatbot development, RPA services, intelligent automation, machine learning solutions, AI consulting USA, digital transformation';
const DEFAULT_OG_IMAGE = 'https://automindlabs.ai/og-image.png';
const SITE_URL = 'https://automindlabs.ai';

export const SEO = ({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  author = 'Automind Labs',
  publishedTime,
  modifiedTime,
  noIndex = false,
  structuredData,
}: SEOProps) => {
  const fullTitle = title ? `${title} | Automind Labs AI` : DEFAULT_TITLE;
  const canonicalUrl = canonical ? `${SITE_URL}${canonical}` : undefined;

  // Default Organization structured data
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Automind Labs',
    alternateName: 'Automind Labs AI',
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.ico`,
    description: 'AI automation agency helping businesses automate workflows and scale operations',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US',
      addressRegion: 'CA',
    },
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
    sameAs: [
      'https://www.instagram.com/automindlabs',
      'https://www.youtube.com/@automindlabs',
      'https://www.linkedin.com/company/automindlabs',
      'https://twitter.com/AutomindLabs',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'Info@automindlabs.ai',
      availableLanguage: 'English',
    },
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      
      {/* Geographic Targeting for US */}
      <meta name="geo.region" content="US" />
      <meta name="geo.placename" content="United States" />
      <meta name="language" content="en-US" />
      <meta httpEquiv="content-language" content="en-US" />
      
      {/* Robots */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonicalUrl || SITE_URL} />
      <meta property="og:site_name" content="Automind Labs AI" />
      <meta property="og:locale" content="en_US" />
      
      {/* Article specific */}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {author && <meta property="article:author" content={author} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@AutomindLabs" />
      <meta name="twitter:creator" content="@AutomindLabs" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Structured Data - Organization */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      
      {/* Custom Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

// Pre-built structured data helpers
export const createServiceSchema = (services: { name: string; description: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Automind Labs',
  url: SITE_URL,
  priceRange: '$$$',
  areaServed: {
    '@type': 'Country',
    name: 'United States',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'AI Automation Services',
    itemListElement: services.map((service, index) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: service.name,
        description: service.description,
      },
      position: index + 1,
    })),
  },
});

export const createBlogPostSchema = (post: {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  url: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: post.title,
  description: post.description,
  image: post.image,
  datePublished: post.datePublished,
  dateModified: post.dateModified || post.datePublished,
  author: {
    '@type': 'Person',
    name: post.author,
  },
  publisher: {
    '@type': 'Organization',
    name: 'Automind Labs',
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/favicon.ico`,
    },
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': post.url,
  },
});

export const createFAQSchema = (faqs: { question: string; answer: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

export const createLocalBusinessSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_URL}/#business`,
  name: 'Automind Labs',
  description: 'AI automation agency providing workflow automation, AI integration, and business process optimization services across the United States.',
  url: SITE_URL,
  telephone: '+1-555-123-4567',
  email: 'Info@automindlabs.ai',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 37.7749,
    longitude: -122.4194,
  },
  areaServed: [
    { '@type': 'State', name: 'California' },
    { '@type': 'State', name: 'New York' },
    { '@type': 'State', name: 'Texas' },
    { '@type': 'State', name: 'Florida' },
    { '@type': 'Country', name: 'United States' },
  ],
  priceRange: '$$$',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00',
  },
});

export default SEO;
