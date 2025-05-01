import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar } from 'lucide-react';
import { formatDate, calculateReadingTime, getAuthorById, getCategoryById } from '../../utils/content';
import type { BlogPost } from '../../types';

interface PostCardProps {
  post: BlogPost;
  variant?: 'default' | 'featured' | 'compact';
}

const PostCard: React.FC<PostCardProps> = ({ post, variant = 'default' }) => {
  const author = getAuthorById(post.author);
  const category = post.categories.length > 0 ? getCategoryById(post.categories[0]) : null;
  const readingTime = calculateReadingTime(post.content);
  
  if (variant === 'compact') {
    return (
      <article className="flex items-start gap-3 mb-4">
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
            className="text-sm font-medium hover:text-primary dark:text-white dark:hover:text-primary transition-colors line-clamp-2"
          >
            {post.title}
          </Link>
          <time 
            dateTime={new Date(post.date).toISOString()}
            className="text-xs text-gray-500 dark:text-gray-400"
          >
            {formatDate(post.date)}
          </time>
        </div>
      </article>
    );
  }
  
  if (variant === 'featured') {
    return (
      <article className="grid md:grid-cols-2 gap-6 mb-10">
        <Link 
          to={`/posts/${post.slug}`}
          className="block overflow-hidden rounded-lg"
        >
          <img 
            src={post.coverImage} 
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </Link>
        <div className="flex flex-col">
          {category && (
            <Link 
              to={`/categories/${category.id}`}
              className="text-xs font-semibold px-3 py-1 rounded-full mb-3 w-fit"
              style={{ 
                backgroundColor: category.color ? `${category.color}20` : '#3B82F620',
                color: category.color || '#3B82F6' 
              }}
            >
              {category.name}
            </Link>
          )}
          
          <h2 className="text-2xl font-bold mb-3">
            <Link 
              to={`/posts/${post.slug}`}
              className="hover:text-primary dark:text-white dark:hover:text-primary transition-colors"
            >
              {post.title}
            </Link>
          </h2>
          
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
            {post.excerpt}
          </p>
          
          <div className="mt-auto">
            <div className="flex items-center space-x-4 mb-3">
              {author && (
                <Link 
                  to={`/authors/${author.id}`}
                  className="flex items-center group"
                >
                  <img 
                    src={author.avatar} 
                    alt={author.name}
                    className="w-10 h-10 rounded-full mr-2"
                  />
                  <span className="text-sm font-medium group-hover:text-primary transition-colors">
                    {author.name}
                  </span>
                </Link>
              )}
            </div>
            
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4">
              <time dateTime={new Date(post.date).toISOString()} className="flex items-center">
                <Calendar size={14} className="mr-1" />
                {formatDate(post.date)}
              </time>
              <span className="flex items-center">
                <Clock size={14} className="mr-1" />
                {readingTime} min read
              </span>
            </div>
          </div>
        </div>
      </article>
    );
  }
  
  // Default card
  return (
    <article className="rounded-lg overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 h-full flex flex-col transition-all duration-200 hover:shadow-md">
      <Link 
        to={`/posts/${post.slug}`}
        className="block overflow-hidden aspect-video"
      >
        <img 
          src={post.coverImage} 
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </Link>
      
      <div className="p-5 flex flex-col flex-grow">
        {category && (
          <Link 
            to={`/categories/${category.id}`}
            className="text-xs font-semibold px-3 py-1 rounded-full mb-3 w-fit"
            style={{ 
              backgroundColor: category.color ? `${category.color}20` : '#3B82F620',
              color: category.color || '#3B82F6' 
            }}
          >
            {category.name}
          </Link>
        )}
        
        <h2 className="text-xl font-bold mb-3">
          <Link 
            to={`/posts/${post.slug}`}
            className="hover:text-primary dark:text-white dark:hover:text-primary transition-colors"
          >
            {post.title}
          </Link>
        </h2>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {post.excerpt}
        </p>
        
        <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between">
            {author && (
              <Link 
                to={`/authors/${author.id}`}
                className="flex items-center group"
              >
                <img 
                  src={author.avatar} 
                  alt={author.name}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <span className="text-sm font-medium group-hover:text-primary transition-colors">
                  {author.name}
                </span>
              </Link>
            )}
            
            <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
              <Clock size={12} className="mr-1" />
              {readingTime} min
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostCard;