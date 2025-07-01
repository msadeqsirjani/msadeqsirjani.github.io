# Deployment Guide for GitHub Pages

This guide will help you deploy your portfolio to GitHub Pages at `msadeqsirjani.github.io`.

## Prerequisites

- GitHub account
- Git installed on your computer
- Basic knowledge of Git commands

## Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Repository name: `msadeqsirjani.github.io` (exactly as shown)
5. Make it **Public** (required for GitHub Pages)
6. Don't initialize with README (we already have one)
7. Click "Create repository"

## Step 2: Upload Your Files

### Option A: Using Git (Recommended)

1. **Initialize Git in your local project folder:**
   ```bash
   cd /path/to/your/ScholarPortfolio
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Connect to GitHub repository:**
   ```bash
   git remote add origin https://github.com/msadeqsirjani/msadeqsirjani.github.io.git
   git branch -M main
   git push -u origin main
   ```

### Option B: Using GitHub Web Interface

1. Go to your repository on GitHub
2. Click "uploading an existing file"
3. Drag and drop all your project files
4. Add commit message: "Initial commit"
5. Click "Commit changes"

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll down to "Pages" section (in the left sidebar)
4. Under "Source", select "Deploy from a branch"
5. Select "main" branch
6. Select "/ (root)" folder
7. Click "Save"

## Step 4: Wait for Deployment

- GitHub Pages will take a few minutes to build and deploy your site
- You'll see a green checkmark when deployment is complete
- Your site will be available at: `https://msadeqsirjani.github.io`

## Step 5: Custom Domain (Optional)

If you want to use a custom domain:

1. In repository Settings → Pages
2. Add your custom domain in the "Custom domain" field
3. Save the changes
4. Update your DNS records with your domain provider
5. Add a `CNAME` file to your repository with your domain name

## Step 6: Update Content

To update your portfolio:

1. Make changes to your local files
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Update portfolio content"
   git push
   ```
3. GitHub Pages will automatically rebuild and deploy

## Troubleshooting

### Site Not Loading
- Check if the repository is public
- Verify the repository name is exactly `msadeqsirjani.github.io`
- Wait a few minutes for initial deployment

### Images Not Showing
- Ensure image paths are relative (e.g., `images/profile.jpg`)
- Check that image files are actually uploaded to GitHub

### Contact Form Not Working
- Verify your Formspree endpoint is correct
- Test the form on the live site

### Styling Issues
- Clear browser cache
- Check browser console for errors
- Verify all CSS and JS files are uploaded

## Useful Commands

```bash
# Check repository status
git status

# View deployment status
git log --oneline

# Force push (use carefully)
git push --force

# Pull latest changes
git pull origin main
```

## Next Steps

1. **Test everything** on the live site
2. **Update personal information** in the HTML file
3. **Add Google Analytics** (optional)
4. **Set up custom domain** (optional)
5. **Share your portfolio** with colleagues and potential employers

## Support

If you encounter issues:
- Check GitHub Pages documentation
- Review GitHub Actions logs (if using CI/CD)
- Ensure all files are properly committed and pushed

Your portfolio should now be live at `https://msadeqsirjani.github.io`! 