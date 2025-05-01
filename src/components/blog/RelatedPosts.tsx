import React from 'react';
import { getRelatedPosts } from '../../utils/content';
import PostCard from './PostCard';

interface RelatedPostsProps {
  postId: string;
  limit?: number;
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({ postId, limit = 3 }) => {
  const relatedPosts = getRelatedPosts(postId, limit);
  
  if (relatedPosts.length === 0) {
    return null;
  }
  
  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Related Posts
      </h2>
      
      <div className="grid md:grid-cols-3 gap-6">
        {relatedPosts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
};

export default RelatedPosts;