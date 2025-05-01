import config from '../../config';
import type { BlogPost, Author, Category, Tag } from '../types';
import { marked } from 'marked';

/**
 * Generate JSON-LD schema for home page
 */
export function generateHomeSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": config.site.title,
    "description": config.site.description,
    "url": config.site.url,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${config.site.url}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
}

/**
 * Get a blog post by slug
 */
export function getPostBySlug(slug: string): BlogPost | undefined {
  return config.posts.find(post => post.slug === slug);
}

/**
 * Get a post by ID
 */
export function getPostById(id: string): BlogPost | undefined {
  return config.posts.find(post => post.id === id);
}

/**
 * Get all posts
 */
export function getAllPosts(limit?: number): BlogPost[] {
  // Sort posts by date (newest first)
  const sortedPosts = [...config.posts].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  if (limit) {
    return sortedPosts.slice(0, limit);
  }
  
  return sortedPosts;
}

/**
 * Get featured posts
 */
export function getFeaturedPosts(limit?: number): BlogPost[] {
  const featuredPosts = config.posts
    .filter(post => post.featured)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  if (limit) {
    return featuredPosts.slice(0, limit);
  }
  
  return featuredPosts;
}

/**
 * Get posts by category
 */
export function getPostsByCategory(categoryId: string, limit?: number): BlogPost[] {
  const categoryPosts = config.posts
    .filter(post => post.categories.includes(categoryId))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  if (limit) {
    return categoryPosts.slice(0, limit);
  }
  
  return categoryPosts;
}

/**
 * Get posts by tag
 */
export function getPostsByTag(tagId: string, limit?: number): BlogPost[] {
  const tagPosts = config.posts
    .filter(post => post.tags.includes(tagId))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  if (limit) {
    return tagPosts.slice(0, limit);
  }
  
  return tagPosts;
}

/**
 * Get posts by author
 */
export function getPostsByAuthor(authorId: string, limit?: number): BlogPost[] {
  const authorPosts = config.posts
    .filter(post => post.author === authorId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  if (limit) {
    return authorPosts.slice(0, limit);
  }
  
  return authorPosts;
}

/**
 * Get an author by ID
 */
export function getAuthorById(id: string): Author | undefined {
  return config.authors.find(author => author.id === id);
}

/**
 * Get all authors
 */
export function getAllAuthors(): Author[] {
  return config.authors;
}

/**
 * Get a category by ID
 */
export function getCategoryById(id: string): Category | undefined {
  return config.categories.find(category => category.id === id);
}

/**
 * Get all categories
 */
export function getAllCategories(): Category[] {
  return config.categories;
}

/**
 * Get featured categories
 */
export function getFeaturedCategories(): Category[] {
  return config.categories.filter(category => category.featured);
}

/**
 * Get a tag by ID
 */
export function getTagById(id: string): Tag | undefined {
  return config.tags.find(tag => tag.id === id);
}

/**
 * Get all tags
 */
export function getAllTags(): Tag[] {
  return config.tags;
}

/**
 * Get popular tags based on usage in posts
 */
export function getPopularTags(limit?: number): Array<Tag & { count: number }> {
  const tagCounts: Record<string, number> = {};
  
  // Count tag occurrences
  config.posts.forEach(post => {
    post.tags.forEach(tagId => {
      tagCounts[tagId] = (tagCounts[tagId] || 0) + 1;
    });
  });
  
  // Map to tags with counts and sort by popularity
  const tagsWithCounts = Object.keys(tagCounts).map(tagId => {
    const tag = getTagById(tagId);
    if (!tag) {
      console.error(`Tag with ID ${tagId} not found`);
      return null;
    }
    return {
      ...tag,
      count: tagCounts[tagId]
    };
  }).filter(Boolean) as Array<Tag & { count: number }>;
  
  const sortedTags = tagsWithCounts.sort((a, b) => b.count - a.count);
  
  if (limit) {
    return sortedTags.slice(0, limit);
  }
  
  return sortedTags;
}

/**
 * Get related posts based on categories and tags
 */
export function getRelatedPosts(postId: string, limit: number = 3): BlogPost[] {
  const currentPost = getPostById(postId);
  
  if (!currentPost) {
    console.error(`Post with ID ${postId} not found`);
    return [];
  }
  
  const allPosts = getAllPosts();
  
  // Filter out the current post
  const otherPosts = allPosts.filter(post => post.id !== postId);
  
  // Calculate relevance score for each post
  const scoredPosts = otherPosts.map(post => {
    let score = 0;
    
    // Add points for matching categories
    currentPost.categories.forEach(category => {
      if (post.categories.includes(category)) {
        score += 3; // Categories are stronger indicators of relevance
      }
    });
    
    // Add points for matching tags
    currentPost.tags.forEach(tag => {
      if (post.tags.includes(tag)) {
        score += 2;
      }
    });
    
    // Add a small score based on recency
    const daysSincePublished = Math.floor(
      (new Date().getTime() - new Date(post.date).getTime()) / (1000 * 60 * 60 * 24)
    );
    
    // More recent posts get a small boost (up to 1 point)
    score += Math.max(0, 1 - (daysSincePublished / 30));
    
    return {
      post,
      score
    };
  });
  
  // Sort by relevance score and get the top N
  const relatedPosts = scoredPosts
    .sort((a, b) => b.score - a.score)
    .filter(item => item.score > 0) // Only include posts with some relevance
    .slice(0, limit)
    .map(item => item.post);
  
  return relatedPosts;
}

/**
 * Parse markdown to HTML
 */
export function parseMarkdown(markdown: string): string {
  return marked.parse(markdown);
}

/**
 * Extract headings from markdown content for table of contents
 */
export function extractTableOfContents(markdown: string): Array<{id: string, text: string, level: number}> {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: Array<{id: string, text: string, level: number}> = [];
  let match;
  
  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
    
    headings.push({
      id,
      text,
      level
    });
  }
  
  return headings;
}

/**
 * Calculate estimated reading time for content
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return Math.max(1, readingTime); // Minimum 1 minute
}

/**
 * Format date to readable string
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}