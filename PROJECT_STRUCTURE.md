# ScholarPortfolio Project Structure

This document describes the professional folder structure of the ScholarPortfolio project.

## Directory Structure

```
ScholarPortfolio/
├── src/                    # Source code
│   ├── pages/             # HTML pages
│   │   └── index.html     # Main homepage
│   ├── styles/            # CSS stylesheets
│   │   └── styles.css     # Main stylesheet
│   ├── scripts/           # JavaScript files
│   │   └── script.js      # Main JavaScript
│   ├── components/        # Reusable components
│   ├── templates/         # HTML templates
│   └── utils/            # Utility functions
├── assets/                # Static assets
│   ├── images/           # Image files
│   │   └── profile.jpg   # Profile image
│   ├── icons/            # Icon files
│   │   └── favicon.svg   # Favicon
│   ├── fonts/            # Font files
│   └── docs/             # Documents
│       └── msadeqsirjani-cv.pdf
├── dist/                 # Build output (generated)
├── config/               # Configuration files
│   ├── manifest.json     # PWA manifest
│   └── build.config.js   # Build configuration
├── scripts/              # Build and utility scripts
│   └── build.js          # Build script
├── .github/              # GitHub configuration
│   └── workflows/        # GitHub Actions
├── package.json          # Project configuration
├── README.md             # Project documentation
├── LICENSE               # License file
├── CNAME                 # Custom domain
└── .gitignore           # Git ignore rules
```

## Key Directories Explained

### `src/` - Source Code
- **pages/**: Contains all HTML pages
- **styles/**: Contains CSS stylesheets
- **scripts/**: Contains JavaScript files
- **components/**: Reusable HTML components
- **templates/**: HTML templates for dynamic content
- **utils/**: Utility functions and helpers

### `assets/` - Static Assets
- **images/**: All image files (photos, graphics)
- **icons/**: Icon files (favicon, logos)
- **fonts/**: Custom font files
- **docs/**: Document files (CV, papers, etc.)

### `dist/` - Build Output
- Generated during build process
- Contains optimized files ready for deployment
- Should not be committed to version control

### `config/` - Configuration Files
- **manifest.json**: PWA configuration
- **build.config.js**: Build process settings

### `scripts/` - Build Scripts
- **build.js**: Main build script
- Other utility scripts for development

## Build Process

The project uses a custom build script that:

1. Copies HTML files from `src/pages/` to `dist/`
2. Copies CSS files from `src/styles/` to `dist/`
3. Copies JS files from `src/scripts/` to `dist/`
4. Copies assets from `assets/` to `dist/assets/`
5. Copies configuration files to `dist/`

## Development Workflow

1. **Development**: Work in the `src/` and `assets/` directories
2. **Build**: Run `npm run build` to generate `dist/`
3. **Deploy**: The `dist/` directory contains the production-ready files

## File Paths

When referencing assets in HTML files, use relative paths:
- CSS: `../styles/styles.css`
- JS: `../scripts/script.js`
- Images: `../../assets/images/`
- Icons: `../../assets/icons/`
- Docs: `../../assets/docs/`

## Benefits of This Structure

1. **Separation of Concerns**: Source code, assets, and configuration are clearly separated
2. **Scalability**: Easy to add new pages, components, or assets
3. **Maintainability**: Clear organization makes it easy to find and modify files
4. **Build Process**: Automated build process ensures consistent deployment
5. **Version Control**: Only source files are tracked, build outputs are ignored 