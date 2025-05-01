/**
 * Blogy Configuration File
 * -----------------------
 * This single file controls all customizable elements of your blog.
 * Edit this file to customize your blog without touching the code.
 */

const config = {
  /**
   * Site Configuration
   * -----------------
   * Basic information about your blog
   */
  site: {
    title: "Blogy",
    tagline: "Thoughts, stories and ideas",
    description: "A modern blog for sharing thoughts, stories and ideas about technology, design, and life.",
    language: "en",
    url: "https://yourdomain.github.io", // Replace with your GitHub Pages URL
    baseUrl: "/", // For GitHub Pages project sites, use "/repository-name/"
    logo: {
      light: "/assets/images/logo-light.png",
      dark: "/assets/images/logo-dark.png",
      alt: "Blogy Logo",
    },
    favicon: "/favicon.ico",
    themeColor: "#3B82F6",
    accentColor: "#0EA5E9",
  },

  /**
   * Design Options
   * -------------
   * Customize the look and feel of your blog
   */
  design: {
    colorScheme: {
      primary: "#3B82F6", // Main brand color
      secondary: "#0EA5E9", // Secondary brand color
      accent: "#F97316", // Accent color for highlights
      success: "#10B981", // Success messages/states
      warning: "#FBBF24", // Warning messages/states
      error: "#EF4444", // Error messages/states
      background: {
        light: "#FFFFFF",
        dark: "#111827",
      },
      text: {
        light: {
          primary: "#111827",
          secondary: "#4B5563",
          tertiary: "#9CA3AF",
        },
        dark: {
          primary: "#F9FAFB",
          secondary: "#E5E7EB",
          tertiary: "#9CA3AF",
        },
      },
    },
    typography: {
      fontFamily: {
        heading: "'Inter', sans-serif",
        body: "'Inter', sans-serif",
        monospace: "'Fira Code', monospace",
      },
      fontSize: {
        base: "16px",
        scale: 1.2, // Scale ratio for header sizes
      },
    },
    layout: {
      maxWidth: "1200px",
      contentWidth: "800px",
    },
    features: {
      darkMode: true,
      search: true,
      newsletter: true,
      comments: true,
      tagsCloud: true,
      relatedPosts: true,
      tableOfContents: true,
      readingTime: true,
      socialSharing: true,
      progressBar: true,
    },
  },

  /**
   * Navigation Menu
   * --------------
   * Define your site's navigation items
   */
  navigation: [
    {
      label: "Home",
      url: "/",
    },
    {
      label: "Categories",
      url: "/categories",
    },
    {
      label: "About",
      url: "/about",
    },
    {
      label: "Contact",
      url: "/contact",
    },
  ],

  /**
   * Social Media
   * -----------
   * Your social media profiles
   */
  social: {
    facebook: "https://facebook.com/yourpage",
    twitter: "https://twitter.com/yourhandle",
    instagram: "https://instagram.com/yourhandle",
    linkedin: "https://linkedin.com/in/yourprofile",
    github: "https://github.com/yourusername",
    youtube: "https://youtube.com/yourchannel",
  },

  /**
   * Contact Information
   * ------------------
   * Your contact details
   */
  contact: {
    email: "hello@yourdomain.com",
    phone: "+1 (555) 123-4567",
    address: "123 Blog Street, Content City, 10001",
    formAction: "", // URL for your form processing service
  },

  /**
   * Authors
   * -------
   * Information about your blog authors
   */
  authors: [
    {
      id: "john-doe",
      name: "John Doe",
      avatar: "/assets/images/authors/john-doe.jpg",
      bio: "John is a tech enthusiast and software developer with over 10 years of experience.",
      role: "Lead Editor",
      social: {
        twitter: "https://twitter.com/johndoe",
        linkedin: "https://linkedin.com/in/johndoe",
        github: "https://github.com/johndoe",
      },
    },
    {
      id: "jane-smith",
      name: "Jane Smith",
      avatar: "/assets/images/authors/jane-smith.jpg",
      bio: "Jane specializes in UX design and has a passion for creating user-friendly interfaces.",
      role: "Design Editor",
      social: {
        twitter: "https://twitter.com/janesmith",
        linkedin: "https://linkedin.com/in/janesmith",
        dribbble: "https://dribbble.com/janesmith",
      },
    },
  ],

  /**
   * Categories
   * ----------
   * Define your blog categories
   */
  categories: [
    {
      id: "technology",
      name: "Technology",
      description: "Latest news and insights about technology trends, programming, and software development.",
      featured: true,
      color: "#3B82F6", // Optional custom color for category
      image: "/assets/images/categories/technology.jpg",
    },
    {
      id: "design",
      name: "Design",
      description: "Exploring design principles, UX/UI trends, and creative inspiration.",
      featured: true,
      color: "#8B5CF6",
      image: "/assets/images/categories/design.jpg",
    },
    {
      id: "productivity",
      name: "Productivity",
      description: "Tips and strategies for improving your workflow and getting more done.",
      featured: true,
      color: "#10B981",
      image: "/assets/images/categories/productivity.jpg",
    },
    {
      id: "business",
      name: "Business",
      description: "Insights on entrepreneurship, marketing, and business strategies.",
      featured: false,
      color: "#F59E0B",
      image: "/assets/images/categories/business.jpg",
    },
  ],

  /**
   * Tags
   * ----
   * Common tags for your blog posts
   */
  tags: [
    { id: "javascript", name: "JavaScript" },
    { id: "react", name: "React" },
    { id: "css", name: "CSS" },
    { id: "html", name: "HTML" },
    { id: "web-development", name: "Web Development" },
    { id: "ux-design", name: "UX Design" },
    { id: "productivity", name: "Productivity" },
    { id: "tools", name: "Tools" },
    { id: "resources", name: "Resources" },
    { id: "tutorials", name: "Tutorials" },
  ],

  /**
   * Blog Posts
   * ----------
   * Your blog post content
   * 
   * Template for new posts:
   * {
   *   id: "unique-post-id",
   *   title: "Post Title",
   *   slug: "post-title", // URL friendly version of title
   *   date: "2025-01-15T12:00:00Z",
   *   updated: "2025-01-20T12:00:00Z", // Optional
   *   author: "author-id", // Must match an author ID
   *   categories: ["category-id"], // Must match category IDs
   *   tags: ["tag-id", "another-tag-id"], // Must match tag IDs
   *   featured: true/false, // Whether this is a featured post
   *   excerpt: "Brief description of the post for previews",
   *   coverImage: "/assets/images/posts/post-image.jpg",
   *   seo: {
   *     title: "SEO optimized title (optional, falls back to post title)",
   *     description: "SEO meta description",
   *     keywords: ["keyword1", "keyword2"],
   *     canonical: "https://yourdomain.com/custom-canonical-url", // Optional
   *   },
   *   content: `
   *     Markdown content goes here. You can use **bold**, *italic*, and other Markdown syntax.
   *     
   *     ## Subheading
   *     
   *     More content...
   *   `,
   * }
   */
  posts: [
    {
      id: "getting-started-with-react",
      title: "Getting Started with React: A Beginner's Guide",
      slug: "getting-started-with-react",
      date: "2025-03-15T09:00:00Z",
      author: "john-doe",
      categories: ["technology"],
      tags: ["react", "javascript", "web-development", "tutorials"],
      featured: true,
      excerpt: "Learn the fundamentals of React and build your first component in this comprehensive guide for beginners.",
      coverImage: "/assets/images/posts/react-beginners-guide.jpg",
      seo: {
        title: "React Tutorial for Beginners: Getting Started with React.js",
        description: "Learn how to set up your first React application, understand core concepts, and build a simple component in this step-by-step beginner's guide.",
        keywords: ["React tutorial", "React for beginners", "learn React", "React.js guide", "JavaScript framework"],
        focusKeyword: "React for beginners",
      },
      content: `
# Getting Started with React: A Beginner's Guide

React has revolutionized the way we build web applications. As one of the most popular JavaScript libraries, it offers a component-based approach that makes creating interactive UIs a breeze.

## What is React?

React is a JavaScript library created by Facebook for building user interfaces. It uses a component-based architecture that makes code reusable and easier to maintain.

## Why Learn React?

* **Component-Based Architecture**: Build encapsulated components that manage their own state
* **Virtual DOM**: Optimizes rendering for better performance
* **Strong Community Support**: Large ecosystem of libraries and tools
* **High Demand Skills**: React developers are highly sought after in the job market

## Setting Up Your First React Project

Let's get started with creating your first React application using Create React App:

\`\`\`bash
npx create-react-app my-first-react-app
cd my-first-react-app
npm start
\`\`\`

## Creating Your First Component

React components are the building blocks of any React application. Here's a simple example:

\`\`\`jsx
import React from 'react';

function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}

export default Greeting;
\`\`\`

## React Hooks: A Game Changer

Hooks allow function components to use state and lifecycle features:

\`\`\`jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

## Conclusion

This is just the beginning of your React journey. As you continue learning, you'll discover more advanced concepts like context API, custom hooks, and state management libraries.

Stay tuned for more tutorials in this series!
      `,
    },
    {
      id: "mastering-css-grid",
      title: "Mastering CSS Grid Layout: A Comprehensive Guide",
      slug: "mastering-css-grid-layout",
      date: "2025-03-10T10:30:00Z",
      author: "jane-smith",
      categories: ["design"],
      tags: ["css", "web-development", "design", "tutorials"],
      featured: true,
      excerpt: "Everything you need to know about CSS Grid Layout and how to use it to create complex, responsive designs with ease.",
      coverImage: "/assets/images/posts/css-grid-guide.jpg",
      seo: {
        title: "CSS Grid Layout Tutorial: Creating Responsive Web Designs",
        description: "Learn how to use CSS Grid Layout to create complex, responsive web designs. This comprehensive guide covers all the essential Grid properties with practical examples.",
        keywords: ["CSS Grid", "CSS layout", "responsive design", "web design", "CSS tutorial"],
        focusKeyword: "CSS Grid Layout",
      },
      content: `
# Mastering CSS Grid Layout: A Comprehensive Guide

CSS Grid Layout has transformed how we approach web layout design, offering a two-dimensional system that handles both columns and rows. Let's dive deep into this powerful CSS feature.

## Understanding the Basics

CSS Grid Layout is a two-dimensional layout system designed specifically for the web. It allows you to organize content into rows and columns and has many features that make building complex layouts straightforward.

## Setting Up a Basic Grid

Creating a grid container is as simple as:

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
}
\`\`\`

This creates a three-column grid with equal width columns and 20px gaps between items.

## Creating Complex Layouts

CSS Grid truly shines when creating complex layouts:

\`\`\`css
.layout {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto 200px auto;
  grid-template-areas: 
    "header header header header"
    "sidebar main main main"
    "footer footer footer footer";
  gap: 10px;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }
\`\`\`

## Responsive Grid Layouts

CSS Grid makes responsive design easier with features like minmax() and auto-fill:

\`\`\`css
.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}
\`\`\`

This creates a grid where each column is at least 250px wide, and the browser automatically creates as many columns as will fit in the available space.

## Grid vs. Flexbox

While both are powerful layout tools, they serve different purposes:

- **CSS Grid**: Two-dimensional layouts (rows AND columns)
- **Flexbox**: One-dimensional layouts (row OR column)

Often, the best designs use both: Grid for the overall layout and Flexbox for alignment within grid items.

## Conclusion

CSS Grid Layout has transformed how we approach web design, making previously complex layouts simple to implement. As browser support continues to improve, it's becoming an essential tool in every web developer's toolkit.

Practice these concepts by rebuilding some of your favorite website layouts using Grid!
      `,
    },
    {
      id: "productivity-tools-2025",
      title: "10 Essential Productivity Tools for Developers in 2025",
      slug: "productivity-tools-2025",
      date: "2025-03-05T14:45:00Z",
      author: "john-doe",
      categories: ["productivity", "technology"],
      tags: ["tools", "productivity", "web-development", "resources"],
      featured: true,
      excerpt: "Discover the top productivity tools that will supercharge your development workflow in 2025.",
      coverImage: "/assets/images/posts/productivity-tools.jpg",
      seo: {
        title: "Best Productivity Tools for Developers in 2025",
        description: "Discover 10 essential productivity tools that will help developers streamline their workflow, automate repetitive tasks, and collaborate more effectively in 2025.",
        keywords: ["productivity tools", "developer tools", "coding efficiency", "software development", "time management"],
        focusKeyword: "productivity tools for developers",
      },
      content: `
# 10 Essential Productivity Tools for Developers in 2025

In the fast-paced world of software development, having the right tools can dramatically improve your efficiency. Here are 10 essential productivity tools that every developer should consider in 2025.

## 1. VSCode AI Assistant

Visual Studio Code's AI assistant has evolved significantly, now offering intelligent code completions, refactoring suggestions, and even debugging help. The latest version can understand project context and suggest optimizations specific to your codebase.

## 2. GitHub Copilot X

The next generation of GitHub Copilot not only suggests code but helps with documentation, tests, and even architectural decisions. It's like having a senior developer looking over your shoulder at all times.

## 3. DevOps Automation Suite

This all-in-one platform integrates with your CI/CD pipeline to automate testing, deployment, and monitoring. Its predictive analysis can even identify potential issues before they occur.

## 4. Notion AI for Developers

Notion's developer-focused templates combined with its AI capabilities make it perfect for documentation, project management, and knowledge bases. The code-aware features understand your project structure and help maintain comprehensive docs.

## 5. Terminal Commander Pro

This next-gen terminal multiplexer combines the best features of tmux and zsh with AI-assisted command suggestions and automated workflow scripts.

## 6. Focus Flow Timer

Based on the Pomodoro technique but adapted specifically for coding sessions, Focus Flow Timer integrates with your IDE to suggest break times during natural coding pauses.

## 7. CodeHealth Analytics

This tool monitors your coding habits, suggesting improvements to reduce repetitive strain injuries and optimize your physical workspace.

## 8. DevMeet Collaborative Platform

Real-time code collaboration with integrated video, audio, and whiteboarding makes remote pair programming feel like you're in the same room.

## 9. Polyglot Code Translator

Need to port a function from Python to Rust? This tool handles code translation between languages while preserving functionality and idioms.

## 10. MindfulDev Meditation App

Specifically designed for developers, this app offers short meditation sessions targeted at coding-related stressors and challenges.

## Conclusion

The right productivity tools can transform your development workflow, reducing time spent on repetitive tasks and helping you focus on creative problem-solving. Which of these tools will you add to your developer toolkit in 2025?
      `,
    },
    {
      id: "ux-design-principles",
      title: "7 UX Design Principles Every Designer Should Know",
      slug: "ux-design-principles",
      date: "2025-02-28T11:15:00Z",
      author: "jane-smith",
      categories: ["design"],
      tags: ["ux-design", "design", "web-development"],
      featured: false,
      excerpt: "Learn the fundamental principles of UX design that will help you create more intuitive and user-friendly products.",
      coverImage: "/assets/images/posts/ux-design-principles.jpg",
      seo: {
        title: "7 Essential UX Design Principles for Better User Experiences",
        description: "Learn the core UX design principles that will help you create more intuitive, accessible, and user-friendly digital products that users will love.",
        keywords: ["UX design", "user experience", "design principles", "usability", "accessibility"],
        focusKeyword: "UX design principles",
      },
      content: `
# 7 UX Design Principles Every Designer Should Know

Creating intuitive user experiences is both an art and a science. These seven fundamental UX design principles will help guide you toward designing products that users truly love.

## 1. Hierarchy

Visual hierarchy guides users through content in order of importance. Use size, color, contrast, and spacing to establish clear hierarchical relationships:

- Important elements should be larger, bolder, or in contrasting colors
- Related items should be grouped together
- Whitespace should separate distinct sections

## 2. Consistency

Consistency creates familiarity and reduces cognitive load:

- Maintain consistent visual language (colors, typography, button styles)
- Use the same interaction patterns throughout the product
- Ensure terminology remains consistent across all touchpoints

## 3. Feedback

Users should always know what's happening in the system:

- Provide visual feedback for all interactions (button states, loading indicators)
- Communicate errors clearly with actionable solutions
- Confirm successful actions with appropriate notifications

## 4. Accessibility

Design for all users, including those with disabilities:

- Maintain sufficient color contrast for readability
- Support keyboard navigation and screen readers
- Provide text alternatives for non-text content
- Design with various devices and contexts in mind

## 5. User Control

Users should feel in control of their experience:

- Allow users to undo actions when possible
- Provide clear exits from workflows
- Avoid forcing users into specific paths
- Request confirmation for destructive or irreversible actions

## 6. Recognition Over Recall

Don't make users remember information:

- Use recognizable icons and patterns
- Implement intuitive navigation that shows current location
- Provide contextual help and tooltips
- Show recently accessed items when relevant

## 7. Progressive Disclosure

Present information gradually to avoid overwhelming users:

- Show only what's necessary at each step
- Hide advanced features until needed
- Use appropriate disclosure controls (accordions, tabs, tooltips)
- Guide users through complex processes with clear steps

## Conclusion

These principles aren't arbitrary rules but guidelines based on how humans perceive and process information. By incorporating them into your design process, you'll create interfaces that feel intuitive and enjoyable to use.

Remember, good UX isn't about flashy visuals—it's about creating products that work so well that users hardly notice the design at all.
      `,
    },
    {
      id: "future-of-web-development",
      title: "The Future of Web Development: Trends to Watch in 2025",
      slug: "future-of-web-development",
      date: "2025-02-20T13:30:00Z",
      author: "john-doe",
      categories: ["technology"],
      tags: ["web-development", "javascript", "technology"],
      featured: false,
      excerpt: "Explore the emerging trends and technologies that will shape the future of web development in 2025 and beyond.",
      coverImage: "/assets/images/posts/future-web-dev.jpg",
      seo: {
        title: "Web Development Trends 2025: The Future of Frontend and Backend",
        description: "Discover the emerging technologies and methodologies that will define web development in 2025, from AI-assisted coding to edge computing and beyond.",
        keywords: ["web development trends", "future of web", "web technologies", "AI in web development", "edge computing"],
        focusKeyword: "future of web development",
      },
      content: `
# The Future of Web Development: Trends to Watch in 2025

The web development landscape continues to evolve at a rapid pace. As we move through 2025, several emerging trends are reshaping how we build for the web. Let's explore what's defining the future of web development.

## AI-Assisted Development

Artificial intelligence is no longer just a buzzword in web development:

- AI-powered code assistants now understand project context and generate entire components
- Automated accessibility testing uses machine learning to identify issues beyond simple checklist items
- Design-to-code tools can transform mockups into production-ready code with minimal human intervention

## Edge Computing Takes Center Stage

The edge computing model is dramatically changing how web applications are deployed and run:

- Distributed computing at the network edge reduces latency for users worldwide
- Edge functions provide backend capabilities without managing traditional servers
- Persistent edge databases enable data storage closer to users while maintaining consistency

## No-Code/Low-Code Gets Serious

No longer just for simple sites, no-code and low-code platforms are becoming viable for complex applications:

- Component-based visual builders support custom code integration
- Enterprise-grade no-code platforms offer governance and collaboration features
- The line between developers and designers continues to blur

## WebAssembly Goes Mainstream

WebAssembly (Wasm) has matured into a foundational web technology:

- Browser support for WASI (WebAssembly System Interface) enables more capable applications
- More languages compile efficiently to Wasm, broadening the ecosystem
- Complex desktop-class applications run at near-native speeds in the browser

## Sustainability in Development

Environmental concerns are influencing how we build web applications:

- Green hosting options prioritize renewable energy sources
- Performance optimization is viewed through the lens of energy efficiency
- Carbon impact measurement tools are becoming standard in CI/CD pipelines

## Conclusion

The future of web development balances technological advancement with human and environmental needs. Successful developers will need to embrace AI assistance, understand distributed systems, and consider the broader impact of their work.

What trends are you most excited about? How are you preparing for the changing landscape of web development?
      `,
    },
  ],

  /**
   * Footer Sections
   * --------------
   * Configure the footer columns
   */
  footer: {
    sections: [
      {
        title: "About",
        links: [
          { label: "About Us", url: "/about" },
          { label: "Contact", url: "/contact" },
          { label: "Privacy Policy", url: "/privacy" },
          { label: "Terms of Service", url: "/terms" },
        ],
      },
      {
        title: "Categories",
        links: [
          { label: "Technology", url: "/categories/technology" },
          { label: "Design", url: "/categories/design" },
          { label: "Productivity", url: "/categories/productivity" },
          { label: "Business", url: "/categories/business" },
        ],
      },
      {
        title: "Resources",
        links: [
          { label: "Sitemap", url: "/sitemap.xml" },
          { label: "RSS Feed", url: "/rss.xml" },
          { label: "Documentation", url: "/docs" },
          { label: "FAQs", url: "/faqs" },
        ],
      },
    ],
    copyright: "© 2025 Blogy. All rights reserved.",
  },

  /**
   * SEO & Analytics Configuration
   * ----------------------------
   * Configure SEO settings and analytics
   */
  seo: {
    titleTemplate: "%s | Blogy", // %s will be replaced with the page title
    defaultTitle: "Blogy - A Modern Blog Platform",
    defaultDescription:
      "Blogy is a modern blog platform for sharing insights about technology, design, productivity, and more.",
    defaultKeywords: [
      "blog",
      "tech blog",
      "web development",
      "design",
      "productivity",
    ],
    siteImage: "/assets/images/site-image.jpg", // For social sharing
    twitterHandle: "@yourtwitterhandle",
    twitterCardType: "summary_large_image",
    googleAnalyticsId: "G-XXXXXXXXXX", // Replace with your GA ID
    googleVerification: "", // Google Search Console verification
    bingVerification: "", // Bing Webmaster Tools verification
    facebookAppId: "", // Facebook App ID (if you have one)
    indexing: true, // Set to false to add noindex,nofollow to all pages
  },

  /**
   * Advanced Customization
   * --------------------
   * Advanced settings for technical users
   */
  advanced: {
    // Sitemap generation config
    sitemap: {
      changefreq: "weekly", // Default change frequency
      priority: 0.7, // Default priority
      customPriorities: {
        "/": 1.0, // Homepage
        "/categories/*": 0.8, // Category pages
        "/tags/*": 0.6, // Tag pages
        "/about": 0.5, // About page
      },
    },
    // Robots.txt settings
    robots: {
      allow: ["/"],
      disallow: ["/admin", "/private"],
      sitemap: true, // Include sitemap reference
    },
    // PWA settings
    pwa: {
      enabled: true,
      manifest: {
        name: "Blogy",
        short_name: "Blogy",
        start_url: "/",
        background_color: "#FFFFFF",
        theme_color: "#3B82F6",
        display: "standalone",
        icons: [
          {
            src: "/assets/icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/assets/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      offline: {
        // How many recent posts to cache for offline access
        cacheRecentPosts: 5,
      },
    },
  },
};

export default config;