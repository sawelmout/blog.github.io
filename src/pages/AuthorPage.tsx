import React from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/shared/SEO';
import Layout from '../components/layout/Layout';
import Breadcrumbs from '../components/shared/Breadcrumbs';
import PostCard from '../components/blog/PostCard';
import { getAuthorById, getPostsByAuthor } from '../utils/content';

const AuthorPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const author = getAuthorById(id || '');
  const posts = getPostsByAuthor(id || '');
  
  if (!author) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Author Not Found</h1>
          <p className="mb-8">The author you're looking for doesn't exist or has been moved.</p>
          <Link
            to="/"
            className="px-6 py-3 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition-colors"
          >
            Go Back Home
          </Link>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <SEO
        title={`${author.name} - Author Profile`}
        description={author.bio}
        imageUrl={author.avatar}
      />
      
      {/* Author Header */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <Breadcrumbs
            items={[
              { name: 'Authors', url: '/authors' },
              { name: author.name, url: `/authors/${author.id}`, isLast: true }
            ]}
          />
          
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 max-w-4xl">
            <img 
              src={author.avatar} 
              alt={author.name}
              className="w-32 h-32 rounded-full object-cover"
            />
            
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900 dark:text-white">
                {author.name}
              </h1>
              
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                {author.role}
              </p>
              
              <div className="mb-6">
                <p className="text-gray-700 dark:text-gray-300">
                  {author.bio}
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                {Object.entries(author.social).map(([platform, url]) => (
                  <a 
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                    aria-label={platform}
                  >
                    <span className="capitalize">{platform}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Author Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-gray-900 dark:text-white">
            Posts by {author.name}
          </h2>
          
          {posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="py-10 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                This author hasn't published any posts yet.
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default AuthorPage;