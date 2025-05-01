import React from 'react';
import { Link } from 'react-router-dom';
import { getPostsByCategory } from '../../utils/content';
import type { Category } from '../../types';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const postCount = getPostsByCategory(category.id).length;
  
  return (
    <article className="relative rounded-lg overflow-hidden group h-48">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 z-10"></div>
      <img 
        src={category.image} 
        alt={category.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      
      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-6 z-20">
        <h2 className="text-white text-xl font-bold mb-1">
          {category.name}
        </h2>
        
        <p className="text-gray-200 text-sm mb-3 line-clamp-2">
          {category.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-white text-xs">
            {postCount} article{postCount !== 1 ? 's' : ''}
          </span>
          
          <Link 
            to={`/categories/${category.id}`}
            className="text-xs font-medium py-1 px-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full transition-colors"
          >
            View All
          </Link>
        </div>
      </div>
    </article>
  );
};

export default CategoryCard;