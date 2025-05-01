import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import config from '../../../config';

interface NewsletterFormProps {
  location?: 'sidebar' | 'footer';
}

const NewsletterForm: React.FC<NewsletterFormProps> = ({ location = 'sidebar' }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  
  // Check if newsletter feature is enabled
  if (!config.design.features.newsletter) {
    return null;
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setStatus('error');
      setMessage('Please enter your email address.');
      return;
    }
    
    setStatus('loading');
    
    // Simulate form submission
    setTimeout(() => {
      setStatus('success');
      setMessage('Thank you for subscribing!');
      setEmail('');
      
      // Reset message after 3 seconds
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 3000);
    }, 1000);
    
    // In a real implementation, you would submit to a newsletter service
    // try {
    //   const response = await fetch('/api/subscribe', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email })
    //   });
    //   
    //   const data = await response.json();
    //   
    //   if (response.ok) {
    //     setStatus('success');
    //     setMessage(data.message || 'Thank you for subscribing!');
    //     setEmail('');
    //   } else {
    //     setStatus('error');
    //     setMessage(data.message || 'Something went wrong. Please try again.');
    //   }
    // } catch (error) {
    //   setStatus('error');
    //   setMessage('Something went wrong. Please try again.');
    // }
  };
  
  if (location === 'footer') {
    return (
      <div className="w-full lg:max-w-sm">
        <h3 className="text-lg font-semibold text-white mb-3">
          Subscribe to our newsletter
        </h3>
        <p className="text-gray-300 text-sm mb-4">
          Get the latest articles and resources sent to your inbox weekly.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full py-2 px-4 bg-primary hover:bg-primary/90 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
          
          {message && (
            <p className={`text-sm ${status === 'error' ? 'text-red-400' : 'text-green-400'}`}>
              {message}
            </p>
          )}
        </form>
      </div>
    );
  }
  
  // Default sidebar variant
  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
        <Mail size={24} />
      </div>
      
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
        Subscribe to our newsletter
      </h3>
      
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
        Get the latest articles and resources sent to your inbox weekly.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
          required
        />
        
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full py-2 px-4 bg-primary hover:bg-primary/90 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </button>
        
        {message && (
          <p className={`text-sm ${status === 'error' ? 'text-red-500' : 'text-green-500'}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default NewsletterForm;