import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Calendar, Clock, User } from 'lucide-react';
import SEO from '../components/shared/SEO';
import Layout from '../components/layout/Layout';
import Breadcrumbs from '../components/shared/Breadcrumbs';
import TableOfContents from '../components/blog/TableOfContents';
import RelatedPosts from '../components/blog/RelatedPosts';
import PostShare from '../components/blog/PostShare';
import AuthorCard from '../components/blog/AuthorCard';
import Sidebar from '../components/layout/Sidebar';
import {
  getPostBySlug,
  getAllPosts,
  getAuthorById,
  getCategoryById,
  getTagById,
  formatDate,
  calculateReadingTime,
  parseMarkdown
} from '../utils/content';
import { generatePostSchema } from '../utils/seo';
import config from '../../config';

const PostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState(getPostBySlug(slug || ''));
  const [notFound, setNotFound] = useState(false);
  const [htmlContent, setHtmlContent] = useState('');
  const navigate = useNavigate();
  
  // Scroll progress indicator
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    // Set post based on slug
    const currentPost = getPostBySlug(slug || '');
    
    if (!currentPost) {
      setNotFound(true);
      return;
    }
    
    setPost(currentPost);
    
    // Parse markdown content to HTML
    if (currentPost) {
      setHtmlContent(parseMarkdown(currentPost.content));
    }
    
    // Add IDs to headings for table of contents
    setTimeout(() => {
      const articleElement = document.querySelector('.blog-content');
      if (!articleElement) return;
      
      const headings = articleElement.querySelectorAll('h1, h2, h3, h4, h5, h6');
      headings.forEach(heading => {
        const text = heading.textContent || '';
        const id = text
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-');
        
        heading.setAttribute('id', id);
      });
    }, 0);
    
    // Scroll progress handler
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = scrollTop / (docHeight - winHeight);
      setScrollProgress(scrollPercent * 100);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [slug]);
  
  if (notFound) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="mb-8">The post you're looking for doesn't exist or has been moved.</p>
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
  
  if (!post) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 flex justify-center">
          <p>Loading...</p>
        </div>
      </Layout>
    );
  }
  
  // Get post data
  const author = getAuthorById(post.author);
  const categories = post.categories.map(id => getCategoryById(id)).filter(Boolean);
  const tags = post.tags.map(id => getTagById(id)).filter(Boolean);
  const readingTime = calculateReadingTime(post.content);
  
  // Get next and previous posts
  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex(p => p.id === post.id);
  const previousPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  
  // Generate schema
  const postSchema = generatePostSchema(post);
  
  return (
    <Layout>
      <SEO
        title={post.seo?.title || post.title}
        description={post.seo?.description || post.excerpt}
        keywords={post.seo?.keywords}
        imageUrl={post.coverImage}
        schema={postSchema}
        type="article"
      />
      
      {/* Reading Progress Bar */}
      {config.design.features.progressBar && (
        <div 
          className="fixed top-16 left-0 h-1 bg-primary z-50 transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      )}
      
      <article className="pt-10 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { name: 'Posts', url: '/posts' },
              { name: post.title, url: `/posts/${post.slug}`, isLast: true }
            ]}
          />
          
          {/* Post Header */}
          <header className="max-w-4xl mx-auto text-center mb-10">
            {categories.length > 0 && (
              <div className="flex justify-center gap-2 mb-4">
                {categories.map(category => category && (
                  <Link
                    key={category.id}
                    to={`/categories/${category.id}`}
                    className="text-xs font-semibold px-3 py-1 rounded-full"
                    style={{ 
                      backgroundColor: category.color ? `${category.color}20` : '#3B82F620',
                      color: category.color || '#3B82F6' 
                    }}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            )}
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-8">
              {author && (
                <Link to={`/authors/${author.id}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                  <User size={16} />
                  <span>{author.name}</span>
                </Link>
              )}
              
              <time dateTime={new Date(post.date).toISOString()} className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{formatDate(post.date)}</span>
              </time>
              
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{readingTime} min read</span>
              </div>
            </div>
            
            <img 
              src={post.coverImage} 
              alt={post.title}
              className="w-full h-auto max-h-96 object-cover rounded-xl"
            />
          </header>
          
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Sidebar for Desktop */}
            {config.design.features.tableOfContents && (
              <aside className="hidden lg:block lg:col-span-3 order-1">
                <div className="sticky top-20">
                  <TableOfContents content={post.content} />
                  <div className="mt-8">
                    <PostShare title={post.title} url={`/posts/${post.slug}`} />
                  </div>
                </div>
              </aside>
            )}
            
            {/* Main Content */}
            <main className={`lg:col-span-${config.design.features.tableOfContents ? '6' : '8'} order-2`}>
              <div 
                className="prose prose-lg max-w-none dark:prose-invert blog-content"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
              
              {/* Tags */}
              {tags.length > 0 && (
                <div className="mt-10">
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.map(tag => tag && (
                      <Link
                        key={tag.id}
                        to={`/tags/${tag.id}`}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm"
                      >
                        {tag.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Author Bio */}
              {author && (
                <div className="mt-10 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">About the Author</h3>
                  <AuthorCard author={author} />
                </div>
              )}
              
              {/* Post Navigation */}
              <nav className="mt-10 flex flex-col sm:flex-row justify-between border-t border-b border-gray-200 dark:border-gray-800 py-6">
                {previousPost ? (
                  <Link
                    to={`/posts/${previousPost.slug}`}
                    className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors mb-4 sm:mb-0"
                  >
                    <ArrowLeft size={16} className="mr-2" />
                    <span>
                      <span className="block text-xs mb-1">Previous post</span>
                      <span className="font-medium">{previousPost.title}</span>
                    </span>
                  </Link>
                ) : (
                  <div></div>
                )}
                
                {nextPost && (
                  <Link
                    to={`/posts/${nextPost.slug}`}
                    className="flex items-center text-right text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors ml-auto"
                  >
                    <span>
                      <span className="block text-xs mb-1">Next post</span>
                      <span className="font-medium">{nextPost.title}</span>
                    </span>
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                )}
              </nav>
              
              {/* Related Posts */}
              <RelatedPosts postId={post.id} />
            </main>
            
            {/* Right Sidebar */}
            <aside className="lg:col-span-3 order-3">
              <div className="sticky top-20">
                <Sidebar 
                  showCategories={true}
                  showTags={true}
                  showNewsletter={true}
                  showRecentPosts={true}
                />
              </div>
            </aside>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default PostPage;