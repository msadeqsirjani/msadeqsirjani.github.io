import React, { useState, useEffect } from 'react';
import { Octokit } from '@octokit/rest';
import PublicationForm from './PublicationForm';
import type { Publication } from '../../types';
import './ContentForm.css';

interface FormBasedEditorProps {
  contentType: string;
  token: string;
  onSaveStatus: (status: string) => void;
}

const FormBasedEditor: React.FC<FormBasedEditorProps> = ({ contentType, token, onSaveStatus }) => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<number | null>(null);
  const [adding, setAdding] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

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
      setItems(data);
    } catch (error) {
      console.error('Error loading content:', error);
      onSaveStatus('Error loading content');
    } finally {
      setLoading(false);
    }
  };

  const saveToGitHub = async (updatedItems: any[]) => {
    onSaveStatus('Saving...');

    try {
      const repoOwner = 'msadeqsirjani';
      const repoName = 'msadeqsirjani.github.io';
      const fileName = fileMap[contentType];
      const filePath = `react-portfolio/public/assets/data/${fileName}`;

      const octokit = new Octokit({ auth: token });

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
      }

      const currentBranch = 'claude/admin-dashboard-content-update-011CUoRUJ37E97fDvjKapQMC';
      const content = JSON.stringify(updatedItems, null, 2);

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
      onSaveStatus(`Error: ${error.message || 'Failed to save content'}`);
    }
  };

  const handleAdd = () => {
    setAdding(true);
    setEditing(null);
  };

  const handleEdit = (index: number) => {
    setEditing(index);
    setAdding(false);
  };

  const handleDelete = (index: number) => {
    setDeleteConfirm(index);
  };

  const confirmDelete = async () => {
    if (deleteConfirm === null) return;

    const updatedItems = items.filter((_, i) => i !== deleteConfirm);
    setItems(updatedItems);
    setDeleteConfirm(null);
    await saveToGitHub(updatedItems);
  };

  const handleSave = async (item: any) => {
    let updatedItems;
    if (editing !== null) {
      updatedItems = items.map((existing, i) => (i === editing ? item : existing));
    } else {
      updatedItems = [item, ...items];
    }

    setItems(updatedItems);
    setAdding(false);
    setEditing(null);
    await saveToGitHub(updatedItems);
  };

  const handleCancel = () => {
    setAdding(false);
    setEditing(null);
  };

  const renderPublicationItem = (item: Publication, index: number) => (
    <div key={index} className="item-card">
      <div className="item-header">
        <div style={{ flex: 1 }}>
          <h3 className="item-title">{item.title}</h3>
          <p className="item-meta">
            {item.venue} ({item.year}) - {item.status.toUpperCase()}
          </p>
          {item.authors && <p className="item-meta">{item.authors}</p>}
        </div>
        <div className="item-actions">
          <button onClick={() => handleEdit(index)} className="btn-edit">
            Edit
          </button>
          <button onClick={() => handleDelete(index)} className="btn-delete">
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  const renderList = () => {
    if (contentType === 'publications') {
      return items.map((item, index) => renderPublicationItem(item, index));
    }
    // Add more content type renderers here
    return null;
  };

  const renderForm = () => {
    if (contentType === 'publications') {
      const item = editing !== null ? items[editing] : undefined;
      return (
        <PublicationForm
          item={item}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      );
    }
    // Add more form renderers here
    return null;
  };

  if (loading) {
    return <div className="loading">Loading content...</div>;
  }

  if (adding || editing !== null) {
    return (
      <div className="admin-editor">
        <div className="editor-header">
          <h2>{editing !== null ? 'Edit' : 'Add New'} {contentType}</h2>
        </div>
        {renderForm()}
      </div>
    );
  }

  return (
    <div className="admin-editor">
      <div className="editor-header">
        <h2>Manage {contentType}</h2>
        <button onClick={handleAdd} className="add-button">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New
        </button>
      </div>

      <div className="item-list">
        {items.length === 0 ? (
          <div className="empty-state">
            <p>No items yet</p>
            <p>Click "Add New" to create your first item</p>
          </div>
        ) : (
          renderList()
        )}
      </div>

      {deleteConfirm !== null && (
        <div className="confirm-dialog">
          <div className="confirm-content">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this item? This action cannot be undone.</p>
            <div className="confirm-actions">
              <button onClick={() => setDeleteConfirm(null)} className="btn-cancel">
                Cancel
              </button>
              <button onClick={confirmDelete} className="btn-delete">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormBasedEditor;
