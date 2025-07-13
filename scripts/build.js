const fs = require('fs');
const path = require('path');

// Create dist directory if it doesn't exist
if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist');
}

// Copy HTML files from src/pages to dist
if (fs.existsSync('src/pages')) {
    const pagesDir = 'src/pages';
    const files = fs.readdirSync(pagesDir);
    
    files.forEach(file => {
        if (file.endsWith('.html')) {
            const sourcePath = path.join(pagesDir, file);
            const destPath = path.join('dist', file);
            fs.copyFileSync(sourcePath, destPath);
            console.log(`Copied ${sourcePath} to ${destPath}`);
        }
    });
}

// Copy CSS files from src/styles to dist
if (fs.existsSync('src/styles')) {
    const stylesDir = 'src/styles';
    const files = fs.readdirSync(stylesDir);
    
    files.forEach(file => {
        if (file.endsWith('.css')) {
            const sourcePath = path.join(stylesDir, file);
            const destPath = path.join('dist', file);
            fs.copyFileSync(sourcePath, destPath);
            console.log(`Copied ${sourcePath} to ${destPath}`);
        }
    });
}

// Copy JS files from src/scripts to dist
if (fs.existsSync('src/scripts')) {
    const scriptsDir = 'src/scripts';
    const files = fs.readdirSync(scriptsDir);
    
    files.forEach(file => {
        if (file.endsWith('.js')) {
            const sourcePath = path.join(scriptsDir, file);
            const destPath = path.join('dist', file);
            fs.copyFileSync(sourcePath, destPath);
            console.log(`Copied ${sourcePath} to ${destPath}`);
        }
    });
}

// Copy assets directory to dist
if (fs.existsSync('assets')) {
    const copyAssets = (src, dest) => {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }
        
        const items = fs.readdirSync(src);
        items.forEach(item => {
            const srcPath = path.join(src, item);
            const destPath = path.join(dest, item);
            
            if (fs.statSync(srcPath).isDirectory()) {
                copyAssets(srcPath, destPath);
            } else {
                fs.copyFileSync(srcPath, destPath);
                console.log(`Copied ${srcPath} to ${destPath}`);
            }
        });
    };
    
    copyAssets('assets', 'dist/assets');
}

// Copy config files to dist
if (fs.existsSync('config')) {
    const configDir = 'config';
    const files = fs.readdirSync(configDir);
    
    files.forEach(file => {
        const sourcePath = path.join(configDir, file);
        const destPath = path.join('dist', file);
        fs.copyFileSync(sourcePath, destPath);
        console.log(`Copied ${sourcePath} to ${destPath}`);
    });
}

// Copy other root files to dist
const rootFiles = ['CNAME', 'LICENSE', 'README.md'];
rootFiles.forEach(file => {
    if (fs.existsSync(file)) {
        const destPath = path.join('dist', file);
        fs.copyFileSync(file, destPath);
        console.log(`Copied ${file} to ${destPath}`);
    }
});

console.log('Build completed successfully!'); 