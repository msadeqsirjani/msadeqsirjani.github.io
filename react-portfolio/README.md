# Scholar Portfolio - React TypeScript Implementation

A modern, responsive academic portfolio website built with React and TypeScript. This is a React implementation of the original HTML portfolio website.

## Features

- ✅ **Modern Stack**: Built with React 18, TypeScript, and Vite
- ✅ **Responsive Design**: Mobile-first approach with responsive layouts
- ✅ **Dark Mode**: Toggle between light and dark themes
- ✅ **Interactive Components**:
  - Smooth scrolling navigation
  - Publication search and filtering
  - Contact form integration
- ✅ **Accessibility**: ARIA labels and semantic HTML
- ✅ **Performance Optimized**: Fast loading with Vite build tool
- ✅ **Type Safe**: Full TypeScript implementation

## Project Structure

```
react-portfolio/
├── src/
│   ├── components/
│   │   ├── Navbar/          # Navigation with theme toggle
│   │   ├── Hero/            # Hero section with profile
│   │   ├── Biography/       # About section
│   │   ├── Education/       # Education timeline
│   │   ├── Research/        # Research interests & experience
│   │   ├── Publications/    # Publications with search/filter
│   │   ├── Teaching/        # Teaching experience
│   │   ├── News/            # News items
│   │   ├── Awards/          # Awards and honors
│   │   ├── Contact/         # Contact form
│   │   └── Footer/          # Footer with social links
│   ├── data/
│   │   └── content.ts       # All content data
│   ├── types/
│   │   └── index.ts         # TypeScript type definitions
│   ├── App.tsx              # Main App component
│   ├── App.css              # App styles
│   ├── index.css            # Global styles
│   └── main.tsx             # Entry point
├── public/                   # Static assets
├── index.html               # HTML template
├── package.json             # Dependencies
└── tsconfig.json            # TypeScript config
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd react-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Components

### Navbar
- Responsive navigation with mobile menu
- Theme toggle (light/dark mode)
- Smooth scroll to sections
- Dropdown menu for additional links

### Hero
- Profile image with multiple format support
- Name and title
- Social media links
- Download CV and contact buttons

### Publications
- Search by title, venue, or keywords
- Filter by status (published, accepted, under review)
- Filter by year
- Download PDFs and view online

### Contact
- Form integration with Formspree
- Contact information display
- Location, email, and institution links

### Footer
- Social media links
- Quick navigation links
- Copyright and last updated info
- Scroll to top button

## Customization

### Update Content

Edit `/src/data/content.ts` to update:
- Publications
- Education history
- Research experience
- Teaching positions
- News items
- Awards

### Change Theme Colors

Edit CSS variables in `/src/index.css`:
```css
:root {
  --text-color: #1a1a1a;
  --text-light: #4a5568;
  --accent-color: #1d4ed8;
  --accent-hover: #1e40af;
  /* ... */
}
```

### Add New Sections

1. Create component folder in `/src/components/`
2. Import and add to `App.tsx`
3. Update data types in `/src/types/index.ts` if needed
4. Add content in `/src/data/content.ts`

## Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **CSS3** - Styling with CSS custom properties
- **Font Awesome** - Icons
- **Google Fonts (Inter)** - Typography

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

© 2025 Mohammad Sadegh Sirjani. All rights reserved.

## Complete Feature List

### ✅ Implemented Features
- **Reading Progress Bar** - Visual indicator at top of page showing scroll progress
- **Dark/Light Theme Toggle** - With localStorage persistence and system preference detection
- **Pull-to-Refresh** - Mobile pull-to-refresh indicator
- **Scroll-to-Top Button** - Appears after 20% scroll with smooth animation
- **Quick Action Buttons** - Floating action menu with email, CV download, and calendar links
- **Publication Search & Filter** - Real-time search and filtering by status/year
- **BibTeX Copy** - One-click BibTeX citation copying with toast notifications
- **QR Code Generator** - Auto-generated QR code in footer for mobile access
- **Smooth Scrolling** - Animated section navigation
- **Responsive Design** - Mobile-first responsive layouts
- **Form Integration** - Contact form with Formspree
- **SEO Optimized** - Meta tags, Open Graph, and structured data

### Component Architecture
All components use the original CSS (`assets/css/styles.css`) ensuring **100% visual match** with the original HTML website.

## Setup Instructions

### Important: Copy Assets Folder
```bash
cp -r ../assets ./public/
```

This will copy all images, PDFs, icons, and data files to the public folder.

## Notes

- The project uses the **original CSS file** (`styles.css`) - no CSS has been modified
- All JavaScript functionality has been converted to React TypeScript components
- **100% feature parity** with the original HTML website
- Theme preference is saved to localStorage
- BibTeX data is loaded from `/public/assets/data/bibtex.json`
- Update the Formspree form action URL in Contact component if needed
