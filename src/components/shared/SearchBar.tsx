import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { getAllPosts } from '../../utils/content';
import type { BlogPost } from '../../types';

interface SearchResult {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
}

const SearchBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  
  // Handle clicks outside the search component
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Focus input when search is opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);
  
  // Perform search when query changes
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    
    const posts = getAllPosts();
    const searchResults = searchPosts(posts, query);
    setResults(searchResults);
  }, [query]);
  
  // Search function
  const searchPosts = (posts: BlogPost[], searchQuery: string): SearchResult[] => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    
    return posts
      .filter(post => {
        const titleMatch = post.title.toLowerCase().includes(lowerCaseQuery);
        const excerptMatch = post.excerpt.toLowerCase().includes(lowerCaseQuery);
        const contentMatch = post.content.toLowerCase().includes(lowerCaseQuery);
        
        return titleMatch || excerptMatch || contentMatch;
      })
      .map(post => ({
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt
      }))
      .slice(0, 5); // Limit to 5 results
  };
  
  // Handle selecting a search result
  const handleSelectResult = (slug: string) => {
    navigate(`/posts/${slug}`);
    setIsOpen(false);
    setQuery('');
  };
  
  // Handle search submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setIsOpen(false);
    }
  };
  
  return (
    <div ref={searchRef} className="relative">
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="Search"
      >
        <Search className="h-5 w-5 text-gray-700 dark:text-gray-300" />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 top-12 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50">
          <form onSubmit={handleSubmit} className="p-3 border-b dark:border-gray-700">
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search posts..."
                className="w-full py-2 pl-10 pr-4 bg-gray-100 dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Search posts"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500 dark:text-gray-400" />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-2.5"
                  aria-label="Clear search"
                >
                  <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </button>
              )}
            </div>
          </form>
          
          {results.length > 0 && (
            <ul className="py-2 max-h-96 overflow-y-auto">
              {results.map(result => (
                <li key={result.id}>
                  <button
                    onClick={() => handleSelectResult(result.slug)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <p className="font-medium text-gray-900 dark:text-white">{result.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{result.excerpt}</p>
                  </button>
                </li>
              ))}
            </ul>
          )}
          
          {query && results.length === 0 && (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              No results found for "{query}"
            </div>
          )}
          
          <div className="p-3 border-t dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
            Press Enter to see all results
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;