import React from 'react';
import { Link } from 'react-router-dom';
import { getPopularTags } from '../../utils/content';

interface TagCloudProps {
  limit?: number;
}

const TagCloud: React.FC<TagCloudProps> = ({ limit = 20 }) => {
  const tags = getPopularTags(limit);
  
  // Find the max count to determine relative sizes
  const maxCount = Math.max(...tags.map(tag => tag.count));
  
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map(tag => {
        // Calculate relative size based on count
        const relativeSize = 0.8 + (tag.count / maxCount) * 0.7; // Range from 0.8 to 1.5
        
        return (
          <Link
            key={tag.id}
            to={`/tags/${tag.id}`}
            className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-primary hover:text-white transition-colors"
            style={{ fontSize: `${relativeSize}rem` }}
          >
            {tag.name}
            <span className="text-xs ml-1 text-gray-500 dark:text-gray-400">
              ({tag.count})
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default TagCloud;