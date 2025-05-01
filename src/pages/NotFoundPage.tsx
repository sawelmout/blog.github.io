import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/shared/SEO';
import Layout from '../components/layout/Layout';

const NotFoundPage: React.FC = () => {
  return (
    <Layout>
      <SEO
        title="404 - Page Not Found"
        description="The page you are looking for doesn't exist or has been moved."
        noIndex={true}
      />
      
      <div className="min-h-[60vh] flex items-center justify-center py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-8xl font-bold text-primary mb-6">404</h1>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-lg mx-auto mb-8">
            The page you are looking for doesn't exist or has been moved. Please check the URL or navigate back to the homepage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="px-6 py-3 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition-colors"
            >
              Back to Home
            </Link>
            <Link
              to="/search"
              className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-medium rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Search for Content
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFoundPage;