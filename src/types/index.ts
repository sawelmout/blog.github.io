/**
 * Type definitions for the Blogy application
 */

export interface SiteConfig {
  title: string;
  tagline: string;
  description: string;
  language: string;
  url: string;
  baseUrl: string;
  logo: {
    light: string;
    dark: string;
    alt: string;
  };
  favicon: string;
  themeColor: string;
  accentColor: string;
}

export interface DesignConfig {
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
    success: string;
    warning: string;
    error: string;
    background: {
      light: string;
      dark: string;
    };
    text: {
      light: {
        primary: string;
        secondary: string;
        tertiary: string;
      };
      dark: {
        primary: string;
        secondary: string;
        tertiary: string;
      };
    };
  };
  typography: {
    fontFamily: {
      heading: string;
      body: string;
      monospace: string;
    };
    fontSize: {
      base: string;
      scale: number;
    };
  };
  layout: {
    maxWidth: string;
    contentWidth: string;
  };
  features: {
    darkMode: boolean;
    search: boolean;
    newsletter: boolean;
    comments: boolean;
    tagsCloud: boolean;
    relatedPosts: boolean;
    tableOfContents: boolean;
    readingTime: boolean;
    socialSharing: boolean;
    progressBar: boolean;
  };
}

export interface NavigationItem {
  label: string;
  url: string;
}

export interface SocialMedia {
  [key: string]: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  formAction: string;
}

export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  role: string;
  social: SocialMedia;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  featured: boolean;
  color?: string;
  image: string;
}

export interface Tag {
  id: string;
  name: string;
}

export interface SEOData {
  title?: string;
  description: string;
  keywords: string[];
  focusKeyword?: string;
  canonical?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  updated?: string;
  author: string;
  categories: string[];
  tags: string[];
  featured: boolean;
  excerpt: string;
  coverImage: string;
  seo: SEOData;
  content: string;
}

export interface FooterSection {
  title: string;
  links: Array<{
    label: string;
    url: string;
  }>;
}

export interface FooterConfig {
  sections: FooterSection[];
  copyright: string;
}

export interface SEOConfig {
  titleTemplate: string;
  defaultTitle: string;
  defaultDescription: string;
  defaultKeywords: string[];
  siteImage: string;
  twitterHandle: string;
  twitterCardType: string;
  googleAnalyticsId: string;
  googleVerification: string;
  bingVerification: string;
  facebookAppId: string;
  indexing: boolean;
}

export interface SitemapConfig {
  changefreq: string;
  priority: number;
  customPriorities: {
    [key: string]: number;
  };
}

export interface RobotsConfig {
  allow: string[];
  disallow: string[];
  sitemap: boolean;
}

export interface PWAManifest {
  name: string;
  short_name: string;
  start_url: string;
  background_color: string;
  theme_color: string;
  display: string;
  icons: Array<{
    src: string;
    sizes: string;
    type: string;
  }>;
}

export interface PWAConfig {
  enabled: boolean;
  manifest: PWAManifest;
  offline: {
    cacheRecentPosts: number;
  };
}

export interface AdvancedConfig {
  sitemap: SitemapConfig;
  robots: RobotsConfig;
  pwa: PWAConfig;
}

export interface BlogConfig {
  site: SiteConfig;
  design: DesignConfig;
  navigation: NavigationItem[];
  social: SocialMedia;
  contact: ContactInfo;
  authors: Author[];
  categories: Category[];
  tags: Tag[];
  posts: BlogPost[];
  footer: FooterConfig;
  seo: SEOConfig;
  advanced: AdvancedConfig;
}