import React from 'react';
import { Link } from 'react-router-dom';
import { getPostsByAuthor } from '../../utils/content';
import type { Author } from '../../types';

interface AuthorCardProps {
  author: Author;
  showBio?: boolean;
}

const AuthorCard: React.FC<AuthorCardProps> = ({ author, showBio = true }) => {
  const postCount = getPostsByAuthor(author.id).length;
  
  return (
    <div className="flex items-start space-x-4">
      <Link to={`/authors/${author.id}`}>
        <img 
          src={author.avatar} 
          alt={author.name}
          className="w-12 h-12 rounded-full object-cover"
        />
      </Link>
      
      <div>
        <div className="flex items-baseline">
          <Link 
            to={`/authors/${author.id}`}
            className="font-medium text-gray-900 dark:text-white hover:text-primary dark:hover:text-primary transition-colors"
          >
            {author.name}
          </Link>
          
          <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
            {author.role}
          </span>
        </div>
        
        {showBio && (
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            {author.bio}
          </p>
        )}
        
        <div className="mt-2 flex items-center space-x-3">
          {/* Social Links */}
          {Object.entries(author.social).map(([platform, url]) => (
            <a 
              key={platform} 
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-primary transition-colors"
              aria-label={`${author.name}'s ${platform}`}
            >
              <span className="capitalize text-xs">{platform}</span>
            </a>
          ))}
          
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {postCount} article{postCount !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AuthorCard;