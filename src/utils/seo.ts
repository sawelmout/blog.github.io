import config from '../../config';
import type { BlogPost, Category, Tag } from '../types';

/**
 * Generate appropriate title for different page types
 */
export function generateTitle(
  title?: string,
  templateOverride?: string
): string {
  const template = templateOverride || config.seo.titleTemplate;
  const defaultTitle = config.seo.defaultTitle;
  
  if (!title) return defaultTitle;
  return template.replace('%s', title);
}

/**
 * Generate meta description
 */
export function generateDescription(
  description?: string
): string {
  return description || config.seo.defaultDescription;
}

/**
 * Generate keywords string from array
 */
export function generateKeywords(
  keywords?: string[]
): string {
  const defaultKeywords = config.seo.defaultKeywords;
  if (!keywords || keywords.length === 0) return defaultKeywords.join(', ');
  return [...keywords, ...defaultKeywords].join(', ');
}

/**
 * Generate schema.org structured data for a blog post
 */
export function generatePostSchema(post: BlogPost): string {
  const author = config.authors.find(a => a.id === post.author);
  
  if (!author) {
    console.error(`Author with ID ${post.author} not found for post ${post.id}`);
    return '';
  }
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": `${config.site.url}${post.coverImage}`,
    "datePublished": post.date,
    "dateModified": post.updated || post.date,
    "author": {
      "@type": "Person",
      "name": author.name,
      "url": `${config.site.url}/authors/${author.id}`
    },
    "publisher": {
      "@type": "Organization",
      "name": config.site.title,
      "logo": {
        "@type": "ImageObject",
        "url": `${config.site.url}${config.site.logo.light}`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${config.site.url}/posts/${post.slug}`
    }
  };
  
  return JSON.stringify(schema);
}

/**
 * Generate schema.org structured data for a category page
 */
export function generateCategorySchema(category: Category): string {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "headline": `${category.name} - ${config.site.title}`,
    "description": category.description,
    "image": `${config.site.url}${category.image}`,
    "publisher": {
      "@type": "Organization",
      "name": config.site.title,
      "logo": {
        "@type": "ImageObject",
        "url": `${config.site.url}${config.site.logo.light}`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${config.site.url}/categories/${category.id}`
    }
  };
  
  return JSON.stringify(schema);
}

/**
 * Generate schema.org structured data for the home page
 */
export function generateHomeSchema(): string {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": config.site.title,
    "description": config.site.description,
    "url": config.site.url,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${config.site.url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": config.site.title,
      "logo": {
        "@type": "ImageObject",
        "url": `${config.site.url}${config.site.logo.light}`
      }
    }
  };
  
  return JSON.stringify(schema);
}

/**
 * Generate schema.org structured data for breadcrumbs
 */
export function generateBreadcrumbSchema(breadcrumbs: Array<{name: string, url: string}>): string {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((breadcrumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": breadcrumb.name,
      "item": `${config.site.url}${breadcrumb.url}`
    }))
  };
  
  return JSON.stringify(schema);
}

/**
 * Generate Open Graph tags
 */
export function generateOpenGraphTags(
  title: string,
  description: string,
  url: string,
  image?: string,
  type: string = 'website'
): Record<string, string> {
  return {
    'og:title': title,
    'og:description': description,
    'og:url': `${config.site.url}${url}`,
    'og:image': image ? `${config.site.url}${image}` : `${config.site.url}${config.seo.siteImage}`,
    'og:type': type,
    'og:site_name': config.site.title,
    'fb:app_id': config.seo.facebookAppId || ''
  };
}

/**
 * Generate Twitter Card tags
 */
export function generateTwitterCardTags(
  title: string,
  description: string,
  image?: string
): Record<string, string> {
  return {
    'twitter:card': config.seo.twitterCardType,
    'twitter:site': config.seo.twitterHandle,
    'twitter:title': title,
    'twitter:description': description,
    'twitter:image': image ? `${config.site.url}${image}` : `${config.site.url}${config.seo.siteImage}`
  };
}

/**
 * Generate robots meta tag content
 */
export function generateRobotsContent(customNoIndex: boolean = false): string {
  if (customNoIndex || !config.seo.indexing) {
    return 'noindex, nofollow';
  }
  return 'index, follow';
}

/**
 * Generate canonical URL
 */
export function generateCanonicalUrl(
  path: string,
  customCanonical?: string
): string {
  if (customCanonical) {
    return customCanonical;
  }
  return `${config.site.url}${path}`;
}