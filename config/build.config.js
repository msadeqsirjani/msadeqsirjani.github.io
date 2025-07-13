module.exports = {
    // Source directories
    src: {
        pages: 'src/pages',
        styles: 'src/styles',
        scripts: 'src/scripts',
        components: 'src/components',
        templates: 'src/templates',
        utils: 'src/utils'
    },
    
    // Asset directories
    assets: {
        images: 'assets/images',
        icons: 'assets/icons',
        fonts: 'assets/fonts',
        docs: 'assets/docs'
    },
    
    // Output directory
    dist: 'dist',
    
    // Configuration files
    config: 'config',
    
    // Build settings
    build: {
        minify: false,
        sourceMaps: false,
        optimizeImages: false
    },
    
    // File patterns to include/exclude
    patterns: {
        include: ['*.html', '*.css', '*.js', '*.svg', '*.jpg', '*.png', '*.pdf'],
        exclude: ['.DS_Store', 'node_modules', '.git']
    }
}; 