import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from './Header';
import Footer from './Footer';
import config from '../../../config';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Helmet>
        <link rel="icon" href={config.site.favicon} />
        <meta name="theme-color" content={config.site.themeColor} />
        
        {/* Google Analytics (if configured) */}
        {config.seo.googleAnalyticsId && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${config.seo.googleAnalyticsId}`} />
            <script>
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${config.seo.googleAnalyticsId}');
              `}
            </script>
          </>
        )}
      </Helmet>
      
      <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
        <Header />
        
        <main className="flex-grow">
          {children}
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Layout;