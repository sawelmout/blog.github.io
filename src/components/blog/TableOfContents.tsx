import React, { useEffect, useState } from 'react';
import { Link } from 'react-scroll';
import { extractTableOfContents } from '../../utils/content';

interface TableOfContentsProps {
  content: string;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
  const [headings, setHeadings] = useState<Array<{id: string, text: string, level: number}>>([]);
  const [activeId, setActiveId] = useState<string>('');
  
  useEffect(() => {
    // Extract headings from content
    const extractedHeadings = extractTableOfContents(content);
    setHeadings(extractedHeadings);
    
    // Set up intersection observer to highlight active section
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };
    
    const observerOptions = {
      rootMargin: '0px 0px -80% 0px',
      threshold: 0.1
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observe all heading elements
    extractedHeadings.forEach(heading => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });
    
    return () => {
      observer.disconnect();
    };
  }, [content]);
  
  if (headings.length < 2) {
    return null;
  }
  
  return (
    <nav className="sticky top-20 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <h2 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">
        Table of Contents
      </h2>
      
      <ul className="space-y-1 text-sm">
        {headings.map(heading => (
          <li 
            key={heading.id}
            style={{ paddingLeft: `${(heading.level - 1) * 0.75}rem` }}
          >
            <Link
              to={heading.id}
              spy={true}
              smooth={true}
              offset={-100}
              duration={300}
              className={`
                block py-1 border-l-2 pl-2 cursor-pointer hover:text-primary transition-colors
                ${activeId === heading.id 
                  ? 'text-primary border-primary font-medium' 
                  : 'text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700'}
              `}
            >
              {heading.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;