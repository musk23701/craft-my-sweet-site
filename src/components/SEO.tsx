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

const DEFAULT_TITLE = 'Automind Labs | AI Automation Agency USA';
const DEFAULT_DESCRIPTION = 'Automind Labs is America\'s leading AI automation agency. We build custom AI workflow solutions, intelligent automation systems, and business process optimization for enterprises and startups. Trusted by 50+ companies in California, New York, Texas & nationwide.';
const DEFAULT_KEYWORDS = 'AI automation agency USA, AI automation services, business automation company, workflow automation, AI integration, automation consulting, artificial intelligence automation, RPA services, AI workflow optimization, automation agency California, AI services New York, Texas automation, enterprise AI, small business automation, AI chatbot, machine learning solutions, digital transformation';
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
  const fullTitle = title ? `${title} | Automind Labs` : DEFAULT_TITLE;
  const canonicalUrl = canonical ? `${SITE_URL}${canonical}` : undefined;

  // Organization structured data
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'Automind Labs',
    alternateName: 'Automind Labs AI',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/favicon.ico`,
      width: 512,
      height: 512,
    },
    description: 'America\'s leading AI automation agency helping businesses automate workflows and scale operations with intelligent automation solutions.',
    foundingDate: '2022',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US',
      addressRegion: 'CA',
      addressLocality: 'San Francisco',
    },
    areaServed: [
      { '@type': 'Country', name: 'United States' },
      { '@type': 'State', name: 'California' },
      { '@type': 'State', name: 'New York' },
      { '@type': 'State', name: 'Texas' },
      { '@type': 'State', name: 'Florida' },
    ],
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
      availableLanguage: ['English'],
      areaServed: 'US',
    },
  };

  // WebSite schema with SearchAction
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: 'Automind Labs',
    description: DEFAULT_DESCRIPTION,
    publisher: { '@id': `${SITE_URL}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
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
      <meta property="og:site_name" content="Automind Labs" />
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
      
      {/* Structured Data - WebSite */}
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
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
  '@id': 'https://automindlabs.ai/#service',
  name: 'Automind Labs',
  url: 'https://automindlabs.ai',
  description: 'AI automation and workflow optimization services for US businesses',
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
  '@id': post.url,
  headline: post.title,
  description: post.description,
  image: {
    '@type': 'ImageObject',
    url: post.image,
  },
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
      url: 'https://automindlabs.ai/favicon.ico',
    },
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': post.url,
  },
  inLanguage: 'en-US',
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
  '@id': 'https://automindlabs.ai/#business',
  name: 'Automind Labs',
  description: 'AI automation agency providing workflow automation, AI integration, and business process optimization services across the United States.',
  url: 'https://automindlabs.ai',
  telephone: '+1-555-123-4567',
  email: 'Info@automindlabs.ai',
  image: 'https://automindlabs.ai/og-image.png',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '123 AI Innovation Drive',
    addressLocality: 'San Francisco',
    addressRegion: 'CA',
    postalCode: '94105',
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
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '50',
    bestRating: '5',
    worstRating: '1',
  },
});

export const createAboutPageSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': 'https://automindlabs.ai/about#webpage',
  url: 'https://automindlabs.ai/about',
  name: 'About Automind Labs - AI Automation Experts',
  description: 'Learn about Automind Labs, America\'s leading AI automation agency founded in 2022.',
  isPartOf: { '@id': 'https://automindlabs.ai/#website' },
  about: { '@id': 'https://automindlabs.ai/#organization' },
  mainEntity: {
    '@type': 'Organization',
    '@id': 'https://automindlabs.ai/#organization',
  },
});

export const createContactPageSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  '@id': 'https://automindlabs.ai/contact#webpage',
  url: 'https://automindlabs.ai/contact',
  name: 'Contact Automind Labs - AI Automation Consultation',
  description: 'Get in touch with Automind Labs for AI automation consulting and workflow optimization services.',
  isPartOf: { '@id': 'https://automindlabs.ai/#website' },
  mainEntity: { '@id': 'https://automindlabs.ai/#business' },
});

export const createPortfolioSchema = (projects: { name: string; description: string; url?: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': 'https://automindlabs.ai/portfolio#webpage',
  url: 'https://automindlabs.ai/portfolio',
  name: 'AI Automation Portfolio - Case Studies & Success Stories',
  description: 'Explore our portfolio of AI automation projects and success stories.',
  isPartOf: { '@id': 'https://automindlabs.ai/#website' },
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: projects.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'CreativeWork',
        name: project.name,
        description: project.description,
        url: project.url,
      },
    })),
  },
});

export const createBlogListSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Blog',
  '@id': 'https://automindlabs.ai/blog#webpage',
  url: 'https://automindlabs.ai/blog',
  name: 'Automind Labs Blog - AI Automation Insights',
  description: 'Latest insights on AI automation, workflow optimization, and business transformation.',
  publisher: { '@id': 'https://automindlabs.ai/#organization' },
  isPartOf: { '@id': 'https://automindlabs.ai/#website' },
  inLanguage: 'en-US',
});

export const createBookingSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://automindlabs.ai/booking#service',
  name: 'Free AI Strategy Consultation',
  description: 'Book a free 30-minute AI automation strategy call with our experts. Discuss your business automation needs and get personalized recommendations.',
  provider: { '@id': 'https://automindlabs.ai/#organization' },
  serviceType: 'Consulting',
  areaServed: { '@type': 'Country', name: 'United States' },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    description: 'Free 30-minute consultation',
  },
});

export const createBreadcrumbSchema = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export default SEO;
