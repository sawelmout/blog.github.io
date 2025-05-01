# Blogy - SEO Optimized Blog Platform

Blogy is a modern, highly customizable blog platform designed for SEO optimization and excellent user experience. Built with React and optimized for GitHub Pages deployment, it offers a comprehensive solution for bloggers, writers, and content creators.

## Features

- **Complete SEO Optimization**: Structured data, meta tags, Open Graph, Twitter Cards, and more
- **Mobile-First Responsive Design**: Perfect viewing experience on all devices
- **Single Configuration File**: Control all aspects of your blog from one file
- **Dark Mode Support**: Automatic and manual theme switching
- **Advanced Content Management**: Categories, tags, authors, and related posts
- **Performance Optimized**: Fast loading times with Core Web Vitals considerations
- **GitHub Pages Compatible**: Easy to deploy and host for free

## Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/blogy.git
   cd blogy
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### Customization

All customization is handled through the `config.js` file in the root directory. This includes:

- Site details (title, description, logo)
- Navigation menu
- Categories and tags
- Blog posts content
- Authors information
- Color schemes and design options
- SEO configuration
- And much more!

### Adding New Content

To add a new blog post, edit the `config.js` file and add a new entry to the `posts` array following the template provided in the file.

## Deploying to GitHub Pages

1. Update the `site.url` and `site.baseUrl` in `config.js` to match your GitHub Pages URL.

2. Build the project:
   ```bash
   npm run build
   ```

3. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```

## Advanced Features

### SEO Optimization

Blogy includes comprehensive SEO features:

- Semantic HTML5 structure
- Automated XML sitemap generation
- Schema.org structured data for rich snippets
- Meta tags optimization
- Open Graph and Twitter Card support
- Canonical URL implementation
- Robots.txt generation

### Performance

- Optimized for Core Web Vitals
- Lazy loading for images
- Efficient bundle size
- PWA capabilities

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with React and Tailwind CSS
- Icons from Lucide React
- Deployed with GitHub Pages