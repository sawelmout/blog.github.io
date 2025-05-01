import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/shared/SEO';
import Layout from '../components/layout/Layout';
import Breadcrumbs from '../components/shared/Breadcrumbs';
import PostCard from '../components/blog/PostCard';
import Sidebar from '../components/layout/Sidebar';
import { getCategoryById, getPostsByCategory } from '../utils/content';
import { generateCategorySchema } from '../utils/seo';
import type { BlogPost } from '../types';

const POSTS_PER_PAGE = 6;

const CategoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const category = getCategoryById(id || '');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  useEffect(() => {
    if (!category) return;
    
    const categoryPosts = getPostsByCategory(category.id);
    setPosts(categoryPosts);
    
    // Calculate pagination
    setTotalPages(Math.ceil(categoryPosts.length / POSTS_PER_PAGE));
    setCurrentPage(1); // Reset to first page when category changes
  }, [id, category]);
  
  if (!category) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Category Not Found</h1>
          <p className="mb-8">The category you're looking for doesn't exist or has been moved.</p>
          <Link
            to="/categories"
            className="px-6 py-3 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition-colors"
          >
            View All Categories
          </Link>
        </div>
      </Layout>
    );
  }
  
  // Get current posts for pagination
  const indexOfLastPost = currentPage * POSTS_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  
  // Generate schema
  const categorySchema = generateCategorySchema(category);
  
  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  return (
    <Layout>
      <SEO
        title={`${category.name} - Posts`}
        description={category.description}
        imageUrl={category.image}
        schema={categorySchema}
      />
      
      {/* Category Header */}
      <section
        className="relative py-16 md:py-24 bg-cover bg-center text-white"
        style={{ backgroundImage: `url(${category.image})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <Breadcrumbs
              items={[
                { name: 'Categories', url: '/categories' },
                { name: category.name, url: `/categories/${category.id}`, isLast: true }
              ]}
            />
            
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              {category.name}
            </h1>
            
            <p className="text-lg md:text-xl text-gray-200 mb-6">
              {category.description}
            </p>
            
            <span
              className="inline-block px-4 py-2 rounded-full text-sm font-medium"
              style={{ backgroundColor: category.color || '#3B82F6' }}
            >
              {posts.length} article{posts.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </section>
      
      {/* Category Content */}
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
                    There are no posts in this category yet.
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

export default CategoryPage;