import config from '../../config';
import { getAllPosts, getAllCategories, getAllTags, getAllAuthors } from './content';

/**
 * Generate XML sitemap content
 */
export function generateSitemap(): string {
  const { site, advanced } = config;
  const baseUrl = site.url;
  const sitemapConfig = advanced.sitemap;
  
  // Start XML
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  // Add home page
  xml += generateUrlEntry(
    baseUrl + '/',
    new Date().toISOString(),
    sitemapConfig.customPriorities['/'] || sitemapConfig.priority,
    sitemapConfig.changefreq
  );
  
  // Add static pages
  const staticPages = [
    '/about',
    '/contact',
    '/categories',
    '/tags',
    '/authors',
    '/search',
    '/privacy',
    '/terms',
  ];
  
  staticPages.forEach(page => {
    const priority = sitemapConfig.customPriorities[page] || 
                    (page === '/about' || page === '/contact' ? 0.7 : 0.5);
    
    xml += generateUrlEntry(
      baseUrl + page,
      new Date().toISOString(),
      priority,
      sitemapConfig.changefreq
    );
  });
  
  // Add blog posts
  const posts = getAllPosts();
  posts.forEach(post => {
    const postPriority = post.featured ? 0.9 : sitemapConfig.customPriorities['/posts/*'] || 0.7;
    
    xml += generateUrlEntry(
      baseUrl + '/posts/' + post.slug,
      post.updated || post.date,
      postPriority,
      sitemapConfig.changefreq
    );
  });
  
  // Add category pages
  const categories = getAllCategories();
  categories.forEach(category => {
    const categoryPriority = category.featured 
      ? 0.8 
      : sitemapConfig.customPriorities['/categories/*'] || 0.6;
    
    xml += generateUrlEntry(
      baseUrl + '/categories/' + category.id,
      new Date().toISOString(),
      categoryPriority,
      sitemapConfig.changefreq
    );
  });
  
  // Add tag pages
  const tags = getAllTags();
  tags.forEach(tag => {
    xml += generateUrlEntry(
      baseUrl + '/tags/' + tag.id,
      new Date().toISOString(),
      sitemapConfig.customPriorities['/tags/*'] || 0.6,
      sitemapConfig.changefreq
    );
  });
  
  // Add author pages
  const authors = getAllAuthors();
  authors.forEach(author => {
    xml += generateUrlEntry(
      baseUrl + '/authors/' + author.id,
      new Date().toISOString(),
      sitemapConfig.customPriorities['/authors/*'] || 0.6,
      sitemapConfig.changefreq
    );
  });
  
  // End XML
  xml += '</urlset>';
  
  return xml;
}

/**
 * Generate a single URL entry for the sitemap
 */
function generateUrlEntry(
  url: string,
  lastmod: string,
  priority: number,
  changefreq: string
): string {
  return `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date(lastmod).toISOString().split('T')[0]}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority.toFixed(1)}</priority>
  </url>\n`;
}

/**
 * Generate robots.txt content
 */
export function generateRobotsTxt(): string {
  const { site, advanced } = config;
  const baseUrl = site.url;
  const robotsConfig = advanced.robots;
  
  let content = 'User-agent: *\n';
  
  // Add allowed paths
  robotsConfig.allow.forEach(path => {
    content += `Allow: ${path}\n`;
  });
  
  // Add disallowed paths
  robotsConfig.disallow.forEach(path => {
    content += `Disallow: ${path}\n`;
  });
  
  // Add sitemap reference if enabled
  if (robotsConfig.sitemap) {
    content += `\nSitemap: ${baseUrl}/sitemap.xml\n`;
  }
  
  return content;
}