import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/shared/SEO';
import Layout from '../components/layout/Layout';
import PostCard from '../components/blog/PostCard';
import CategoryCard from '../components/blog/CategoryCard';
import { 
  getFeaturedPosts, 
  getAllPosts,
  getFeaturedCategories,
  generateHomeSchema
} from '../utils/content';
import config from '../../config';

const HomePage: React.FC = () => {
  const featuredPosts = getFeaturedPosts(3);
  const recentPosts = getAllPosts(6);
  const categories = getFeaturedCategories();
  
  // Generate schema for home page
  const homeSchema = generateHomeSchema();
  
  return (
    <Layout>
      <SEO 
        title={config.site.title}
        description={config.site.description}
        schema={homeSchema}
      />
      
      {/* Hero Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {config.site.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              {config.site.tagline}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/categories"
                className="px-6 py-3 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition-colors"
              >
                Explore Categories
              </Link>
              <Link
                to="/posts"
                className="px-6 py-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-white font-medium rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              >
                View All Posts
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Posts Section */}
      {featuredPosts.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Featured Posts
              </h2>
              <Link
                to="/posts"
                className="text-primary hover:underline font-medium"
              >
                View All
              </Link>
            </div>
            
            <div className="space-y-10">
              {featuredPosts.map(post => (
                <PostCard key={post.id} post={post} variant="featured" />
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Categories Section */}
      {categories.length > 0 && (
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Explore Categories
              </h2>
              <Link
                to="/categories"
                className="text-primary hover:underline font-medium"
              >
                View All
              </Link>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map(category => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Recent Posts Grid */}
      {recentPosts.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Recent Posts
              </h2>
              <Link
                to="/posts"
                className="text-primary hover:underline font-medium"
              >
                View All
              </Link>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Newsletter Banner */}
      {config.design.features.newsletter && (
        <section className="py-16 bg-primary/10 dark:bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Stay up to date
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
                Get notified about the latest posts and resources directly to your inbox.
              </p>
              
              <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:text-white"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition-colors whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
              
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
              </p>
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default HomePage;