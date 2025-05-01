import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import config from '../../../config';
import { 
  generateTitle, 
  generateDescription, 
  generateKeywords,
  generateOpenGraphTags,
  generateTwitterCardTags,
  generateRobotsContent,
  generateCanonicalUrl
} from '../../utils/seo';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  imageUrl?: string;
  schema?: string;
  noIndex?: boolean;
  canonicalUrl?: string;
  type?: string;
  children?: React.ReactNode;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  imageUrl,
  schema,
  noIndex = false,
  canonicalUrl,
  type = 'website',
  children
}) => {
  const location = useLocation();
  const path = location.pathname;
  
  const finalTitle = generateTitle(title);
  const finalDescription = generateDescription(description);
  const finalKeywords = generateKeywords(keywords);
  const finalCanonical = generateCanonicalUrl(path, canonicalUrl);
  const robotsContent = generateRobotsContent(noIndex);
  
  const openGraphTags = generateOpenGraphTags(
    finalTitle,
    finalDescription,
    path,
    imageUrl,
    type
  );
  
  const twitterCardTags = generateTwitterCardTags(
    finalTitle,
    finalDescription,
    imageUrl
  );

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="robots" content={robotsContent} />
      <link rel="canonical" href={finalCanonical} />
      
      {/* Open Graph Tags */}
      {Object.entries(openGraphTags).map(([property, content]) => (
        content && <meta key={property} property={property} content={content} />
      ))}
      
      {/* Twitter Card Tags */}
      {Object.entries(twitterCardTags).map(([name, content]) => (
        content && <meta key={name} name={name} content={content} />
      ))}
      
      {/* Schema.org Structured Data */}
      {schema && (
        <script type="application/ld+json">
          {`${schema}`}
        </script>
      )}
      
      {/* Verification Tags */}
      {config.seo.googleVerification && (
        <meta name="google-site-verification" content={config.seo.googleVerification} />
      )}
      
      {config.seo.bingVerification && (
        <meta name="msvalidate.01" content={config.seo.bingVerification} />
      )}
      
      {/* Additional SEO elements */}
      {children}
    </Helmet>
  );
};

export default SEO;