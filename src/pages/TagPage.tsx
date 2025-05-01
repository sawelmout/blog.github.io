import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/shared/SEO';
import Layout from '../components/layout/Layout';
import Breadcrumbs from '../components/shared/Breadcrumbs';
import PostCard from '../components/blog/PostCard';
import Sidebar from '../components/layout/Sidebar';
import { getTagById, getPostsByTag } from '../utils/content';
import type { BlogPost } from '../types';

const POSTS_PER_PAGE = 6;

const TagPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const tag = getTagById(id || '');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  useEffect(() => {
    if (!tag) return;
    
    const tagPosts = getPostsByTag(tag.id);
    setPosts(tagPosts);
    
    // Calculate pagination
    setTotalPages(Math.ceil(tagPosts.length / POSTS_PER_PAGE));
    setCurrentPage(1); // Reset to first page when tag changes
  }, [id, tag]);
  
  if (!tag) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Tag Not Found</h1>
          <p className="mb-8">The tag you're looking for doesn't exist or has been moved.</p>
          <Link
            to="/tags"
            className="px-6 py-3 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition-colors"
          >
            View All Tags
          </Link>
        </div>
      </Layout>
    );
  }
  
  // Get current posts for pagination
  const indexOfLastPost = currentPage * POSTS_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  
  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  return (
    <Layout>
      <SEO
        title={`${tag.name} - Tagged Posts`}
        description={`Browse all articles tagged with ${tag.name}`}
      />
      
      {/* Tag Header */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <Breadcrumbs
            items={[
              { name: 'Tags', url: '/tags' },
              { name: tag.name, url: `/tags/${tag.id}`, isLast: true }
            ]}
          />
          
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Posts tagged with "{tag.name}"
            </h1>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Browse all articles and resources with the tag "{tag.name}".
            </p>
            
            <span className="inline-block px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-full text-sm font-medium">
              {posts.length} article{posts.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </section>
      
      {/* Tag Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Content */}
            <main className="lg:col-span-8">
              {posts.length > 0 ? (
                <>
                  <div className="grid md:grid-cols-2 gap-8">
                    {currentPosts.map(post => (
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
                  <h3 className="text-xl font-bold mb-4">No posts found</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-8">
                    There are no posts with this tag yet.
                  </p>
                  <Link
                    to="/"
                    className="px-6 py-3 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition-colors"
                  >
                    Go Back Home
                  </Link>
                </div>
              )}
            </main>
            
            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <Sidebar />
            </aside>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TagPage;