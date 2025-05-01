import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { marked } from 'marked';
import config from '../config';

// Pages
import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';
import CategoryPage from './pages/CategoryPage';
import TagPage from './pages/TagPage';
import AuthorPage from './pages/AuthorPage';
import SearchPage from './pages/SearchPage';
import NotFoundPage from './pages/NotFoundPage';

// Configure markdown renderer
const configureMarkdown = () => {
  marked.use({
    headerIds: true,
    gfm: true,
    breaks: true,
    mangle: false
  });
  
  // Add custom renderer for better SEO and accessibility
  const renderer = new marked.Renderer();
  
  // Add IDs to headings for TOC
  renderer.heading = (text, level, raw) => {
    const id = raw
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
    
    return `<h${level} id="${id}">${text}</h${level}>`;
  };
  
  // Add target="_blank" and rel="noopener noreferrer" to external links
  renderer.link = (href, title, text) => {
    const isExternal = href && href.startsWith('http');
    const target = isExternal ? ' target="_blank"' : '';
    const rel = isExternal ? ' rel="noopener noreferrer"' : '';
    
    return `<a href="${href}"${title ? ` title="${title}"` : ''}${target}${rel}>${text}</a>`;
  };
  
  // Enhanced image renderer with lazy loading and proper alt text
  renderer.image = (href, title, alt) => {
    return `<img src="${href}" alt="${alt || ''}" title="${title || alt || ''}" loading="lazy" class="rounded-lg">`;
  };
  
  marked.use({ renderer });
};

// ScrollToTop component to scroll to top on route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

function App() {
  // Configure markdown renderer
  useEffect(() => {
    configureMarkdown();
    
    // Set dark mode if enabled
    if (config.design.features.darkMode) {
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.classList.add('dark');
      }
    }
    
    // Set site title
    document.title = config.site.title;
  }, []);
  
  return (
    <HelmetProvider>
      <BrowserRouter basename={config.site.baseUrl}>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts/:slug" element={<PostPage />} />
          <Route path="/categories/:id" element={<CategoryPage />} />
          <Route path="/tags/:id" element={<TagPage />} />
          <Route path="/authors/:id" element={<AuthorPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;