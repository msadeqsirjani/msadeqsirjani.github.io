# Mohammad Sadegh Sirjani - Academic Portfolio

A modern, responsive academic portfolio website showcasing the work and achievements of Mohammad Sadegh Sirjani, Ph.D. student in Computer Science at the University of Texas at San Antonio (UTSA).

[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-blue)](https://msadeqsirjani.github.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## 🌟 Features

### Core Features
- **Modern Design**: Clean, minimal, and visually appealing interface with contemporary UI patterns
- **Responsive Layout**: Fully optimized for desktop, tablet, and mobile devices
- **Dark/Light Mode**: Seamless theme switching with user preference persistence
- **Smooth Animations**: CSS transitions, scroll animations, and intersection observers
- **Interactive Sections**: Home, Biography, Education, Research, Publications, Teaching, News, Awards, and Contact
- **Contact Form**: Integrated with Formspree for reliable email functionality
- **Downloadable CV**: Direct link to academic CV (PDF format)
- **SEO Optimized**: Meta tags, structured data, and semantic HTML

### Performance & Accessibility
- **Fast Loading**: Optimized assets and minimal dependencies
- **Progressive Enhancement**: Works without JavaScript enabled
- **Accessible**: ARIA labels, keyboard navigation, and screen reader support
- **Cross-Browser Compatible**: Tested on all modern browsers
- **PWA Ready**: Progressive Web App manifest included

## 🚀 Live Demo

Visit the live portfolio at: [msadeqsirjani.github.io](https://msadeqsirjani.github.io)

## 📁 Project Structure

```
ScholarPortfolio/
├── index.html                    # Main HTML file with semantic structure
├── styles.css                    # CSS styles, animations, and theme variables
├── script.js                     # JavaScript functionality and interactivity
├── manifest.json                 # PWA manifest for installability
├── favicon.svg                   # Scalable vector favicon
├── images/
│   ├── profile.jpg              # Profile image (optimized)
│   └── [additional assets]      # Other image resources
├── docs/
│   └── msadeqsirjani-cv.pdf     # Academic CV (PDF format)
├── README.md                     # Project documentation
└── LICENSE                       # MIT License file
```

## 🛠️ Technologies & Dependencies

### Frontend
- **HTML5**: Semantic markup, accessibility features, and structured data
- **CSS3**: Modern styling with Flexbox, Grid, Custom Properties, and animations
- **JavaScript (ES6+)**: Vanilla JS for interactive functionality and form handling
- **SVG**: Scalable vector graphics for icons and favicon

### Services & Tools
- **Formspree**: Contact form backend and email delivery
- **GitHub Pages**: Static site hosting and continuous deployment
- **Git**: Version control and collaboration

### Performance
- **No Framework Dependencies**: Pure vanilla JavaScript for minimal bundle size
- **Optimized Assets**: Compressed images and minified resources
- **Modern CSS**: Native CSS features without preprocessors

## 📋 Sections

1. **Home**: Hero section with profile image and introduction
2. **Biography**: Academic background and research interests
3. **Education**: Academic qualifications and institutions
4. **Research**: Research interests and areas of expertise
5. **Publications**: Academic papers with DOIs and links
6. **Teaching**: Teaching experience and courses
7. **News**: Recent updates and achievements
8. **Awards**: Honors and recognitions
9. **Contact**: Contact information and form

## 🚀 Getting Started

### Prerequisites

- **Web Browser**: Chrome, Firefox, Safari, or Edge (latest version)
- **Git**: Version control system ([Download](https://git-scm.com/))
- **GitHub Account**: For hosting and deployment ([Sign up](https://github.com/))
- **Text Editor**: VS Code, Sublime Text, or your preferred editor

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/msadeqsirjani/msadeqsirjani.github.io.git
   cd msadeqsirjani.github.io
   ```

2. **Local Development Server**

   Choose one of these methods:

   **Python 3:**
   ```bash
   python -m http.server 8000
   # Visit http://localhost:8000
   ```

   **Node.js (with npx):**
   ```bash
   npx serve
   # Visit http://localhost:3000
   ```

   **PHP:**
   ```bash
   php -S localhost:8000
   # Visit http://localhost:8000
   ```

   **VS Code Live Server Extension:**
   - Install Live Server extension
   - Right-click `index.html` → "Open with Live Server"

3. **Verify Setup**
   - Open the portfolio in your browser
   - Test theme toggle functionality
   - Check responsive design on different screen sizes
   - Test contact form (after Formspree setup)

## 🎨 Customization Guide

### Personal Information
1. **Basic Details** (`index.html`):
   - Update name, title, and affiliation
   - Modify biography and research interests
   - Update education history
   - Add/edit publications with proper DOI links

2. **Profile Image**:
   - Replace `images/profile.jpg` with your photo
   - Recommended size: 800x800px or larger
   - Format: JPG or PNG (optimized for web)
   - Use square aspect ratio for best results

3. **CV Document**:
   - Update `docs/msadeqsirjani-cv.pdf` with your CV
   - Keep file name consistent or update link in HTML
   - Ensure PDF is optimized for web viewing

### Theme & Styling

#### Color Scheme (`styles.css`)
Modify CSS custom properties in the `:root` selector:
```css
:root {
  --primary-color: #2c3e50;      /* Main brand color */
  --secondary-color: #3498db;    /* Accent color */
  --text-color: #333;            /* Body text */
  --bg-color: #ffffff;           /* Background */
  /* ... more variables ... */
}
```

#### Dark Mode Colors
Update dark theme variables in `[data-theme="dark"]`:
```css
[data-theme="dark"] {
  --primary-color: #ecf0f1;
  --bg-color: #1a1a1a;
  /* ... more dark theme colors ... */
}
```

#### Typography
- Modify font families in CSS custom properties
- Adjust font sizes and weights
- Change line heights for better readability

#### Animations & Transitions
- Customize animation durations in `styles.css`
- Modify scroll animation triggers in `script.js`
- Adjust intersection observer thresholds

### Content Updates

#### Sections (`index.html`)
1. **Home Section**: Hero text and introduction
2. **Biography**: Academic background and interests
3. **Education**: Degrees and institutions
4. **Research**: Research areas and projects
5. **Publications**: Papers with proper citations and links
6. **Teaching**: Courses and teaching experience
7. **News**: Recent updates and achievements
8. **Awards**: Honors and recognitions
9. **Contact**: Contact information and social links

#### Adding New Sections
```html
<section id="new-section" class="section">
  <div class="container">
    <h2 class="section-title">Section Title</h2>
    <!-- Your content here -->
  </div>
</section>
```

### Favicon & Branding
- Update `favicon.svg` with your logo/icon
- Modify `manifest.json` for PWA branding
- Update meta tags for social media sharing

## 🌐 Deployment

### GitHub Pages (Recommended)

1. **Initial Setup**
   ```bash
   # Create a new repository named: yourusername.github.io
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/yourusername.github.io.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Navigate to repository **Settings**
   - Click on **Pages** in the sidebar
   - Under **Source**, select branch `main`
   - Click **Save**
   - Your site will be published at `https://yourusername.github.io`

3. **Custom Domain (Optional)**
   - Add a `CNAME` file with your domain name
   - In repository settings → Pages → Custom domain
   - Enter your domain and click **Save**
   - Configure DNS records with your domain provider:
     ```
     Type: A
     Name: @
     Value: 185.199.108.153
            185.199.109.153
            185.199.110.153
            185.199.111.153

     Type: CNAME
     Name: www
     Value: yourusername.github.io
     ```

### Alternative Deployment Options

#### Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

#### Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

#### Cloudflare Pages
1. Connect your GitHub repository
2. Set build settings:
   - Build command: (leave empty)
   - Build output directory: `/`
3. Deploy

### Continuous Deployment
- GitHub Pages automatically deploys on push to main branch
- Set up GitHub Actions for advanced build processes
- Configure branch protection rules for production safety

## 📧 Contact Form Setup

The contact form is integrated with Formspree for email handling:

### Setup Steps

1. **Create Formspree Account**
   - Visit [formspree.io](https://formspree.io) and sign up
   - Free tier includes 50 submissions/month

2. **Create New Form**
   - Click "New Form" in your dashboard
   - Name your form (e.g., "Portfolio Contact")
   - Copy your form endpoint URL

3. **Update HTML**
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
     <!-- form fields -->
   </form>
   ```
   Replace `YOUR_FORM_ID` with your actual Formspree form ID

4. **Configure Form Settings**
   - Enable reCAPTCHA for spam protection
   - Set up email notifications
   - Customize autoresponse messages
   - Configure form field validation

5. **Test the Form**
   - Fill out the form on your live site
   - Check that emails are delivered correctly
   - Verify autoresponse functionality

### Alternative Services
- **EmailJS**: Client-side email sending
- **Netlify Forms**: If hosted on Netlify
- **Google Forms**: Embed Google Forms
- **Custom Backend**: Build your own API endpoint

## 🔧 Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | Latest 2 versions | ✅ Fully Supported |
| Firefox | Latest 2 versions | ✅ Fully Supported |
| Safari | Latest 2 versions | ✅ Fully Supported |
| Edge | Latest 2 versions | ✅ Fully Supported |
| iOS Safari | iOS 13+ | ✅ Fully Supported |
| Chrome Mobile | Latest | ✅ Fully Supported |
| Samsung Internet | Latest | ✅ Fully Supported |

### Features & Compatibility
- **CSS Grid & Flexbox**: All modern browsers
- **CSS Custom Properties**: All modern browsers
- **Intersection Observer**: All modern browsers (with polyfill for older versions)
- **ES6+ JavaScript**: All modern browsers
- **Progressive Enhancement**: Core content accessible even without JavaScript

### Legacy Browser Support
For older browsers, consider adding:
- CSS Grid polyfill
- Intersection Observer polyfill
- Babel transpilation for JavaScript

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

While this is a personal portfolio, suggestions and improvements are welcome! If you'd like to contribute:

### How to Contribute

1. **Fork the Repository**
   ```bash
   # Click the "Fork" button on GitHub
   ```

2. **Clone Your Fork**
   ```bash
   git clone https://github.com/your-username/ScholarPortfolio.git
   cd ScholarPortfolio
   ```

3. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make Your Changes**
   - Follow existing code style
   - Test your changes thoroughly
   - Update documentation if needed

5. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "Add: brief description of your changes"
   ```

6. **Push to Your Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Submit a Pull Request**
   - Go to the original repository on GitHub
   - Click "New Pull Request"
   - Select your feature branch
   - Describe your changes in detail

### Contribution Guidelines
- Write clear, descriptive commit messages
- Follow the existing code style and structure
- Test on multiple browsers before submitting
- Update README if adding new features
- Keep changes focused and atomic

### Areas for Contribution
- Bug fixes and improvements
- Performance optimizations
- Accessibility enhancements
- Documentation improvements
- New features (discuss first in an issue)

## 📞 Contact & Support

### Get in Touch
- **Email**: [m.sadeq.sirjani@gmail.com](mailto:m.sadeq.sirjani@gmail.com)
- **LinkedIn**: [linkedin.com/in/msadeqsirjani](https://www.linkedin.com/in/msadeqsirjani)
- **GitHub**: [@msadeqsirjani](https://github.com/msadeqsirjani)
- **Portfolio**: [msadeqsirjani.github.io](https://msadeqsirjani.github.io)

### Report Issues
Found a bug or have a suggestion? Please [open an issue](https://github.com/msadeqsirjani/msadeqsirjani.github.io/issues) on GitHub.

## 📚 FAQ

<details>
<summary><strong>How do I change the color scheme?</strong></summary>

Edit the CSS custom properties in `styles.css`:
```css
:root {
  --primary-color: #your-color;
  --secondary-color: #your-accent;
}
```
</details>

<details>
<summary><strong>Can I use this template for my own portfolio?</strong></summary>

Yes! This project is MIT licensed. Fork it, customize it, and make it your own. Attribution is appreciated but not required.
</details>

<details>
<summary><strong>How do I add a new section?</strong></summary>

1. Add the HTML section in `index.html`
2. Style it in `styles.css`
3. Add navigation link if needed
4. Update JavaScript for scroll animations
</details>

<details>
<summary><strong>The contact form isn't working. What should I do?</strong></summary>

1. Verify your Formspree form ID is correct
2. Check that the form action URL is properly set
3. Ensure you're testing on a live server (not file://)
4. Check browser console for errors
</details>

<details>
<summary><strong>How do I optimize images?</strong></summary>

Use tools like:
- [TinyPNG](https://tinypng.com/) for compression
- [Squoosh](https://squoosh.app/) for format conversion
- ImageOptim for batch optimization
- WebP format for better compression
</details>

## 📈 Changelog

### Version 1.0.0 (Current)
- ✅ Initial release
- ✅ Dark/Light mode toggle
- ✅ Responsive design
- ✅ Contact form integration
- ✅ Smooth scroll animations
- ✅ PWA manifest
- ✅ SEO optimization

### Planned Features
- [ ] Blog section integration
- [ ] Multi-language support
- [ ] Advanced animations
- [ ] Project showcase gallery
- [ ] Search functionality
- [ ] Print-friendly CV version

## 🙏 Acknowledgments

- Design inspiration from modern academic portfolios
- Icons and assets from open-source libraries
- Community feedback and contributions

---

**Built with ❤️ by Mohammad Sadegh Sirjani**

*Last Updated: October 2025*

---

### ⚠️ Important Notes
- **Before Deployment**: Update all personal information, links, and contact details
- **Formspree Setup**: Configure contact form before going live
- **Image Optimization**: Compress images for better performance
- **Browser Testing**: Test on multiple devices and browsers
- **Accessibility**: Ensure all content is accessible to screen readers 
