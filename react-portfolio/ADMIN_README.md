# Admin Dashboard Documentation

## Overview

This portfolio website includes an admin dashboard that allows you to update content directly from the web browser. All content is stored in JSON files and managed via the GitHub API, making it perfect for GitHub Pages hosting.

## Features

- **Web-based Content Management**: Edit all portfolio content from your browser
- **GitHub Integration**: Changes are committed directly to your repository
- **No Database Required**: All data stored in JSON files
- **Secure Authentication**: Uses GitHub Personal Access Tokens
- **Real-time Updates**: See changes immediately after rebuilding the site

## Accessing the Admin Dashboard

The admin dashboard is available at:
- **Production**: `https://yourusername.github.io/admin.html`
- **Local Development**: `http://localhost:5173/admin.html`

## Setting Up Authentication

### Creating a GitHub Personal Access Token

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give your token a descriptive name (e.g., "Portfolio Admin Access")
4. Set expiration (recommend 90 days or custom)
5. Select the following scope:
   - **repo** (Full control of private repositories)
6. Click "Generate token"
7. **Important**: Copy the token immediately - you won't be able to see it again!

### Logging In

1. Navigate to `/admin.html`
2. Enter your GitHub Personal Access Token
3. Click "Login"
4. Your token will be stored in browser session storage (cleared when you close the tab)

## Managing Content

The admin dashboard provides tabs for managing different content types:

### 1. Publications
Edit your research publications, papers, and articles.

**Fields:**
- `title`: Publication title
- `venue`: Conference/journal name
- `year`: Publication year
- `status`: "published", "accepted", "review", or "arxiv"
- `authors`: List of authors
- `link`: DOI or publication URL
- `pdfLink`: Path to PDF file
- `bibtexId`: BibTeX citation ID
- `abstract`: Publication abstract
- `citations`: Number of citations
- `downloads`: Download count

### 2. Education
Manage your educational background.

**Fields:**
- `degree`: Degree name (e.g., "Ph.D., Computer Science")
- `university`: Full university description
- `universityName`: University name only
- `duration`: Time period (e.g., "Jan. 2025 - Present")
- `gpa`: GPA information
- `universityUrl`: University website URL
- `current`: Boolean indicating if currently enrolled

### 3. Research Experience
Update your research positions and projects.

**Fields:**
- `position`: Job title (e.g., "Research Assistant")
- `lab`: Laboratory or group name
- `duration`: Time period
- `description`: Array of description strings
- `current`: Boolean indicating if current position

### 4. Teaching
Manage your teaching experience.

**Fields:**
- `course`: Course name
- `instructor`: Instructor name(s)
- `university`: University name
- `date`: Semester/year

### 5. News
Add and update news items.

**Fields:**
- `date`: Date string (e.g., "Sep. 2025")
- `description`: News description

### 6. Awards
Manage your awards and honors.

**Fields:**
- `date`: Date string
- `description`: Award description

### 7. Research Interests
Edit your research interests (with icons).

**Fields:**
- `icon`: FontAwesome icon name (e.g., "faNetworkWired")
- `name`: Interest name (can include HTML like `<br>`)

**Available Icons:**
- `faNetworkWired`
- `faMicrochip`
- `faServer`
- `faGears`
- `faBolt`
- `faArrowsRotate`

## Editing Workflow

### Step 1: Select Content Type
Click on the tab for the content type you want to edit (Publications, Education, etc.)

### Step 2: Edit JSON
The current content will load as JSON in the text editor. Edit the JSON directly:

```json
[
  {
    "title": "My Research Paper",
    "venue": "Conference Name",
    "year": "2025",
    "status": "published"
  }
]
```

### Step 3: Format JSON (Optional)
Click the "Format JSON" button to beautify your JSON and check for syntax errors.

### Step 4: Save Changes
Click "Save to GitHub" to commit your changes to the repository.

The system will:
1. Validate your JSON syntax
2. Get the current file SHA from GitHub
3. Create a new commit with your changes
4. Push to your repository

### Step 5: Rebuild Site
After saving, you need to rebuild your site for changes to appear:

```bash
cd react-portfolio
npm run build
git add dist/
git commit -m "Update site content"
git push
```

Or if you have GitHub Actions set up, the site will rebuild automatically.

## JSON File Locations

All content is stored in:
```
react-portfolio/public/assets/data/
├── publications.json
├── education.json
├── research.json
├── teaching.json
├── news.json
├── awards.json
└── research-interests.json
```

## Updating Other Components

The Publications component has been updated to load data asynchronously from JSON. To update other components to use the JSON data:

```typescript
import { useState, useEffect } from 'react';
import { fetchEducation } from '../../data/content';
import type { EducationItem } from '../../types';

const Education = () => {
  const [education, setEducation] = useState<EducationItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEducation()
      .then(data => {
        setEducation(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load education:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Render education data
};
```

## Security Notes

1. **Token Storage**: Your GitHub token is stored only in browser session storage and is never sent to any server except GitHub API.

2. **Token Scope**: Only grant "repo" scope to your token - no additional permissions needed.

3. **Token Expiration**: Set tokens to expire and rotate them regularly.

4. **Don't Commit Tokens**: Never commit your token to the repository.

5. **Admin Page**: The admin page is marked with `<meta name="robots" content="noindex, nofollow">` to prevent search engine indexing.

## Troubleshooting

### "Invalid GitHub token" error
- Check that your token hasn't expired
- Verify you selected the "repo" scope when creating the token
- Try generating a new token

### "Failed to save content" error
- Check your internet connection
- Verify the repository name and owner in `AdminEditor.tsx` match your repository
- Ensure you have write access to the repository
- Check browser console for detailed error messages

### JSON syntax errors
- Use the "Format JSON" button to identify syntax issues
- Validate your JSON using an online validator
- Common issues:
  - Missing commas between array items
  - Missing quotes around strings
  - Trailing commas
  - Unescaped special characters

### Changes not appearing on site
- Remember to rebuild the site after saving changes
- Clear your browser cache
- Check that the JSON files were actually updated in the repository

## Development

### Running Admin Locally

```bash
cd react-portfolio
npm install
npm run dev
```

Then navigate to `http://localhost:5173/admin.html`

### Building

```bash
npm run build
```

This creates both the main site and admin dashboard in the `dist/` folder:
- `dist/index.html` - Main portfolio site
- `dist/admin.html` - Admin dashboard

## Configuration

To customize the admin dashboard for your repository, update these values in `src/components/Admin/AdminEditor.tsx`:

```typescript
const repoOwner = 'msadeqsirjani'; // Your GitHub username
const repoName = 'msadeqsirjani.github.io'; // Your repository name
const currentBranch = 'main'; // Your branch name
```

## Future Enhancements

Potential improvements:
- Rich text editor for abstracts and descriptions
- Image upload support
- Batch operations
- Preview changes before committing
- Version history viewer
- Markdown support

## Support

For issues or questions:
1. Check this documentation
2. Review browser console for errors
3. Check GitHub repository issues
4. Verify JSON syntax and file permissions

## License

This admin dashboard is part of your portfolio project and follows the same license.
