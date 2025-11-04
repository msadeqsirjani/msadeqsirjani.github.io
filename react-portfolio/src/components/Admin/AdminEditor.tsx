import React, { useState, useEffect } from 'react';
import { Octokit } from '@octokit/rest';
import './AdminEditor.css';

interface AdminEditorProps {
  contentType: string;
  token: string;
  onSaveStatus: (status: string) => void;
}

const AdminEditor: React.FC<AdminEditorProps> = ({ contentType, token, onSaveStatus }) => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const fileMap: { [key: string]: string } = {
    'publications': 'publications.json',
    'education': 'education.json',
    'research': 'research.json',
    'teaching': 'teaching.json',
    'news': 'news.json',
    'awards': 'awards.json',
    'research-interests': 'research-interests.json',
  };

  useEffect(() => {
    loadContent();
  }, [contentType]);

  const loadContent = async () => {
    setLoading(true);
    try {
      const fileName = fileMap[contentType];
      const response = await fetch(`/assets/data/${fileName}`);
      const data = await response.json();
      setContent(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Error loading content:', error);
      onSaveStatus('Error loading content');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    onSaveStatus('Saving...');

    try {
      // Validate JSON
      JSON.parse(content);

      // Get repository info from the current URL
      const repoOwner = 'msadeqsirjani'; // Update this to your GitHub username
      const repoName = 'msadeqsirjani.github.io'; // Update this to your repo name
      const fileName = fileMap[contentType];
      const filePath = `react-portfolio/public/assets/data/${fileName}`;

      // Initialize Octokit
      const octokit = new Octokit({ auth: token });

      // Get current file SHA
      let sha: string | undefined;
      try {
        const { data: fileData } = await octokit.repos.getContent({
          owner: repoOwner,
          repo: repoName,
          path: filePath,
        });

        if ('sha' in fileData) {
          sha = fileData.sha;
        }
      } catch (error: any) {
        if (error.status !== 404) {
          throw error;
        }
        // File doesn't exist, we'll create it
      }

      // Get current branch
      const currentBranch = 'claude/admin-dashboard-content-update-011CUoRUJ37E97fDvjKapQMC';

      // Update or create file - handle sha properly
      const updateParams: any = {
        owner: repoOwner,
        repo: repoName,
        path: filePath,
        message: `[admin]: update ${fileName} via admin dashboard`,
        content: btoa(unescape(encodeURIComponent(content))),
        branch: currentBranch,
      };

      if (sha) {
        updateParams.sha = sha;
      }

      await octokit.repos.createOrUpdateFileContents(updateParams);

      onSaveStatus(`Successfully saved ${fileName}!`);
      setTimeout(() => onSaveStatus(''), 3000);
    } catch (error: any) {
      console.error('Error saving content:', error);
      if (error instanceof SyntaxError) {
        onSaveStatus('Error: Invalid JSON format. Please check your syntax.');
      } else {
        onSaveStatus(`Error: ${error.message || 'Failed to save content'}`);
      }
    } finally {
      setSaving(false);
    }
  };

  const formatJSON = () => {
    try {
      const parsed = JSON.parse(content);
      setContent(JSON.stringify(parsed, null, 2));
      onSaveStatus('JSON formatted successfully');
      setTimeout(() => onSaveStatus(''), 2000);
    } catch (error) {
      onSaveStatus('Error: Invalid JSON format');
      setTimeout(() => onSaveStatus(''), 3000);
    }
  };

  return (
    <div className="admin-editor">
      <div className="editor-header">
        <h2>Editing: {contentType}</h2>
        <div className="editor-actions">
          <button onClick={formatJSON} className="format-btn" disabled={saving}>
            Format JSON
          </button>
          <button onClick={handleSave} className="save-btn" disabled={saving || loading}>
            {saving ? 'Saving...' : 'Save to GitHub'}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading content...</div>
      ) : (
        <textarea
          className="json-editor"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          spellCheck={false}
        />
      )}

      <div className="editor-help">
        <h3>Editing Tips:</h3>
        <ul>
          <li>Edit the JSON directly in the textarea above</li>
          <li>Use the "Format JSON" button to beautify your JSON</li>
          <li>Click "Save to GitHub" to commit changes to your repository</li>
          <li>Make sure your JSON is valid before saving</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminEditor;
