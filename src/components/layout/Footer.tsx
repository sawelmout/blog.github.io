import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Github as GitHub, Youtube, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import NewsletterForm from '../blog/NewsletterForm';
import config from '../../../config';

const Footer: React.FC = () => {
  // Get social media icons
  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'facebook':
        return <Facebook size={20} />;
      case 'twitter':
        return <Twitter size={20} />;
      case 'instagram':
        return <Instagram size={20} />;
      case 'linkedin':
        return <Linkedin size={20} />;
      case 'github':
        return <GitHub size={20} />;
      case 'youtube':
        return <Youtube size={20} />;
      default:
        return <ArrowUpRight size={20} />;
    }
  };
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* About/Company Section */}
          <div>
            <Link to="/" className="inline-block mb-6">
              <img 
                src={config.site.logo.dark} 
                alt={config.site.logo.alt}
                className="h-8 w-auto"
              />
            </Link>
            
            <p className="text-gray-300 mb-6 text-sm">
              {config.site.description}
            </p>
            
            <div className="space-y-2 text-sm text-gray-300">
              {config.contact.address && (
                <div className="flex items-start">
                  <MapPin size={18} className="text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
                  <span>{config.contact.address}</span>
                </div>
              )}
              
              {config.contact.email && (
                <div className="flex items-center">
                  <Mail size={18} className="text-gray-400 mr-2" />
                  <a 
                    href={`mailto:${config.contact.email}`}
                    className="hover:text-primary transition-colors"
                  >
                    {config.contact.email}
                  </a>
                </div>
              )}
              
              {config.contact.phone && (
                <div className="flex items-center">
                  <Phone size={18} className="text-gray-400 mr-2" />
                  <a 
                    href={`tel:${config.contact.phone.replace(/\s+/g, '')}`}
                    className="hover:text-primary transition-colors"
                  >
                    {config.contact.phone}
                  </a>
                </div>
              )}
            </div>
            
            {/* Social Media Icons */}
            <div className="flex items-center space-x-3 mt-6">
              {Object.entries(config.social).map(([platform, url]) => (
                url && (
                  <a 
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 hover:bg-primary transition-colors"
                    aria-label={platform}
                  >
                    {getSocialIcon(platform)}
                  </a>
                )
              ))}
            </div>
          </div>
          
          {/* Footer Sections from Config */}
          {config.footer.sections.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4">
                {section.title}
              </h3>
              
              <ul className="space-y-2 text-gray-300">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      to={link.url}
                      className="hover:text-primary transition-colors inline-block py-1"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          {/* Newsletter Section */}
          <NewsletterForm location="footer" />
        </div>
        
        {/* Bottom/Copyright Section */}
        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            {config.footer.copyright}
          </p>
          
          <p className="text-gray-400 text-xs mt-2 md:mt-0">
            Designed with ❤️ using React and Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;