import React from 'react';
import { Link } from 'react-router-dom';
import { getPopularTags, getAllCategories, getFeaturedPosts } from '../../utils/content';
import NewsletterForm from '../blog/NewsletterForm';
import TagCloud from '../blog/TagCloud';

interface SidebarProps {
  showNewsletter?: boolean;
  showCategories?: boolean;
  showTags?: boolean;
  showRecentPosts?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  showNewsletter = true,
  showCategories = true,
  showTags = true,
  showRecentPosts = true
}) => {
  const categories = getAllCategories();
  const recentPosts = getFeaturedPosts(5);
  
  return (
    <div className="space-y-8">
      {/* Newsletter */}
      {showNewsletter && (
        <div className="mb-8">
          <NewsletterForm />
        </div>
      )}
      
      {/* Categories */}
      {showCategories && (
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
            Categories
          </h3>
          
          <ul className="space-y-2">
            {categories.map(category => (
              <li key={category.id}>
                <Link 
                  to={`/categories/${category.id}`}
                  className="flex items-center justify-between py-2 hover:text-primary transition-colors"
                >
                  <span>{category.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Recent Posts */}
      {showRecentPosts && recentPosts.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
            Recent Posts
          </h3>
          
          <div className="space-y-4">
            {recentPosts.map(post => (
              <div key={post.id} className="flex items-start gap-3">
                <Link 
                  to={`/posts/${post.slug}`} 
                  className="flex-shrink-0"
                >
                  <img 
                    src={post.coverImage} 
                    alt={post.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                </Link>
                <div>
                  <Link 
                    to={`/posts/${post.slug}`}
                    className="text-sm font-medium hover:text-primary transition-colors line-clamp-2"
                  >
                    {post.title}
                  </Link>
                  <time 
                    dateTime={new Date(post.date).toISOString()}
                    className="text-xs text-gray-500 dark:text-gray-400"
                  >
                    {new Date(post.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </time>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Tags Cloud */}
      {showTags && (
        <div>
          <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
            Popular Tags
          </h3>
          
          <TagCloud limit={15} />
        </div>
      )}
    </div>
  );
};

export default Sidebar;