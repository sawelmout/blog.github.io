import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import SEO from '../components/shared/SEO';
import Layout from '../components/layout/Layout';
import Breadcrumbs from '../components/shared/Breadcrumbs';
import PostCard from '../components/blog/PostCard';
import { getAllPosts, getAllCategories, getAllTags } from '../utils/content';
import type { BlogPost } from '../types';

const POSTS_PER_PAGE = 6;

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [searchResults, setSearchResults] = useState<BlogPost[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  
  useEffect(() => {
    if (!query) {
      setSearchResults([]);
      return;
    }
    
    const allPosts = getAllPosts();
    const lowerCaseQuery = query.toLowerCase();
    
    // Filter posts based on search query
    const filteredPosts = allPosts.filter(post => {
      const titleMatch = post.title.toLowerCase().includes(lowerCaseQuery);
      const excerptMatch = post.excerpt.toLowerCase().includes(lowerCaseQuery);
      const contentMatch = post.content.toLowerCase().includes(lowerCaseQuery);
      const tagMatch = post.tags.some(tagId => {
        const tag = getAllTags().find(t => t.id === tagId);
        return tag ? tag.name.toLowerCase().includes(lowerCaseQuery) : false;
      });
      const categoryMatch = post.categories.some(categoryId => {
        const category = getAllCategories().find(c => c.id === categoryId);
        return category ? category.name.toLowerCase().includes(lowerCaseQuery) : false;
      });
      
      return titleMatch || excerptMatch || contentMatch || tagMatch || categoryMatch;
    });
    
    // Set search results and calculate pagination
    setSearchResults(filteredPosts);
    setTotalPages(Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
    setCurrentPage(1); // Reset to first page on new search
  }, [query]);
  
  // Get current posts for pagination
  const indexOfLastPost = currentPage * POSTS_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
  
  // Filter by active filter if needed
  const getFilteredResults = () => {
    if (activeFilter === 'all') return searchResults;
    
    // Example filters - you can extend this based on your needs
    switch (activeFilter) {
      case 'recent':
        return [...searchResults].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      case 'oldest':
        return [...searchResults].sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
      case 'featured':
        return searchResults.filter(post => post.featured);
      default:
        return searchResults;
    }
  };
  
  const filteredResults = getFilteredResults();
  const currentResults = filteredResults.slice(indexOfFirstPost, indexOfLastPost);
  
  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  return (
    <Layout>
      <SEO
        title={`Search Results for "${query}"`}
        description={`Search results for "${query}" on Blogy`}
        noIndex={true} // Don't index search results pages
      />
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Breadcrumbs
            items={[
              { name: 'Search', url: '/search', isLast: query ? false : true },
              query ? { name: `Results for "${query}"`, url: `/search?q=${query}`, isLast: true } : undefined
            ].filter(Boolean) as Array<{name: string, url: string, isLast?: boolean}>}
          />
          
          <div className="max-w-3xl mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              {query ? `Search Results for "${query}"` : 'Search'}
            </h1>
            
            <form className="mt-6">
              <div className="flex">
                <input
                  type="text"
                  name="q"
                  defaultValue={query}
                  placeholder="Search for posts, categories, or tags..."
                  className="flex-grow px-4 py-3 rounded-l-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:text-white"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-primary text-white font-medium rounded-r-md hover:bg-primary/90 transition-colors"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
          
          {query && (
            <>
              <div className="flex items-center justify-between mb-8">
                <p className="text-gray-600 dark:text-gray-400">
                  {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
                </p>
                
                <div className="flex space-x-2">
                  <select
                    value={activeFilter}
                    onChange={(e) => setActiveFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                  >
                    <option value="all">All Results</option>
                    <option value="recent">Most Recent</option>
                    <option value="oldest">Oldest First</option>
                    <option value="featured">Featured</option>
                  </select>
                </div>
              </div>
              
              {searchResults.length > 0 ? (
                <>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {currentResults.map(post => (
                      <PostCard key={post.id} post={post} />
                    ))}
                  </div>
                  
                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="mt-12 flex justify-center">
                      <nav className="inline-flex rounded-md shadow">
                        <button
                          onClick={() => paginate(currentPage - 1)}
                          disabled={currentPage === 1}
                          className={`px-3 py-1 rounded-l-md border ${
                            currentPage === 1
                              ? 'bg-gray-100 dark:bg-gray-800 cursor-not-allowed'
                              : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                          } border-gray-300 dark:border-gray-700`}
                        >
                          Previous
                        </button>
                        
                        {Array.from({ length: totalPages }, (_, i) => (
                          <button
                            key={i + 1}
                            onClick={() => paginate(i + 1)}
                            className={`px-3 py-1 border-t border-b border-r ${
                              currentPage === i + 1
                                ? 'bg-primary text-white'
                                : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                            } border-gray-300 dark:border-gray-700`}
                          >
                            {i + 1}
                          </button>
                        ))}
                        
                        <button
                          onClick={() => paginate(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className={`px-3 py-1 rounded-r-md border ${
                            currentPage === totalPages
                              ? 'bg-gray-100 dark:bg-gray-800 cursor-not-allowed'
                              : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                          } border-gray-300 dark:border-gray-700`}
                        >
                          Next
                        </button>
                      </nav>
                    </div>
                  )}
                </>
              ) : (
                <div className="py-20 text-center">
                  <h3 className="text-xl font-bold mb-4">No results found</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-8">
                    We couldn't find any posts matching "{query}".
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      to="/"
                      className="px-6 py-3 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition-colors"
                    >
                      Go Back Home
                    </Link>
                    <Link
                      to="/search"
                      className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-medium rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    >
                      Try Another Search
                    </Link>
                  </div>
                </div>
              )}
            </>
          )}
          
          {!query && (
            <div className="py-10 text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Enter a search term to find posts, categories, and tags.
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default SearchPage;