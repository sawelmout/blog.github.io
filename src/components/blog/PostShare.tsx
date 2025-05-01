import React from 'react';
import { Facebook, Twitter, Linkedin, Link2 } from 'lucide-react';
import config from '../../../config';

interface PostShareProps {
  title: string;
  url: string;
}

const PostShare: React.FC<PostShareProps> = ({ title, url }) => {
  const fullUrl = `${config.site.url}${url}`;
  const encodedUrl = encodeURIComponent(fullUrl);
  const encodedTitle = encodeURIComponent(title);
  
  const shareData = {
    title: title,
    url: fullUrl
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullUrl).then(() => {
      alert('Link copied to clipboard!');
    }).catch(() => {
      alert('Failed to copy link.');
    });
  };
  
  const webShareAvailable = typeof navigator !== 'undefined' && navigator.share;
  
  const handleShare = async () => {
    if (webShareAvailable) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      copyToClipboard();
    }
  };
  
  return (
    <div className="flex flex-col items-center">
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
        Share this post
      </p>
      
      <div className="flex space-x-3">
        <a 
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Facebook"
          className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1877F2] text-white hover:opacity-90 transition-opacity"
        >
          <Facebook size={16} />
        </a>
        
        <a 
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Twitter"
          className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1DA1F2] text-white hover:opacity-90 transition-opacity"
        >
          <Twitter size={16} />
        </a>
        
        <a 
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on LinkedIn"
          className="w-8 h-8 flex items-center justify-center rounded-full bg-[#0A66C2] text-white hover:opacity-90 transition-opacity"
        >
          <Linkedin size={16} />
        </a>
        
        <button
          onClick={handleShare}
          aria-label="Copy link"
          className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white hover:opacity-90 transition-opacity"
        >
          <Link2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default PostShare;