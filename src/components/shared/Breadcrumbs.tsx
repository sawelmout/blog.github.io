import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, ChevronRight } from 'lucide-react';
import { generateBreadcrumbSchema } from '../../utils/seo';

interface BreadcrumbItem {
  name: string;
  url: string;
  isLast?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  const breadcrumbsData = [
    { name: 'Home', url: '/' },
    ...items
  ];
  
  // Generate the structured data
  const schema = generateBreadcrumbSchema(breadcrumbsData);

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <script type="application/ld+json">{schema}</script>
      <ol className="flex items-center flex-wrap text-sm">
        <li className="flex items-center">
          <Link to="/" className="text-gray-500 hover:text-primary flex items-center transition-colors duration-200">
            <HomeIcon size={16} className="mr-1" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        
        {items.map((item, index) => (
          <li key={item.url} className="flex items-center">
            <ChevronRight className="mx-2 text-gray-400" size={14} />
            {item.isLast ? (
              <span className="text-gray-800 dark:text-gray-200 font-medium" aria-current="page">
                {item.name}
              </span>
            ) : (
              <Link 
                to={item.url}
                className="text-gray-500 hover:text-primary transition-colors duration-200"
              >
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;