import React, { useState, useEffect } from 'react';
import { Octokit } from '@octokit/rest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash, faSearch } from '@fortawesome/free-solid-svg-icons';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
  const [bulkDeleteConfirm, setBulkDeleteConfirm] = useState(false);
  const [checkboxMode, setCheckboxMode] = useState(false);

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

      const currentBranch = 'main';
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

  const handleBulkDelete = () => {
    if (selectedItems.size === 0) return;
    setBulkDeleteConfirm(true);
  };

  const confirmBulkDelete = async () => {
    const updatedItems = items.filter((_, i) => !selectedItems.has(i));
    setItems(updatedItems);
    setSelectedItems(new Set());
    setBulkDeleteConfirm(false);
    await saveToGitHub(updatedItems);
  };

  const toggleSelectItem = (index: number) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedItems(newSelected);
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

  // Filter items based on search query
  const filteredItems = items.filter(item => {
    if (!searchQuery) return true;

    const query = searchQuery.toLowerCase();
    if (contentType === 'publications') {
      const pub = item as Publication;
      return (
        pub.title?.toLowerCase().includes(query) ||
        pub.authors?.toLowerCase().includes(query) ||
        pub.venue?.toLowerCase().includes(query) ||
        pub.year?.toString().includes(query)
      );
    }
    // Add more content type filters here
    return true;
  });

  const handleDoubleClick = () => {
    setCheckboxMode(!checkboxMode);
    if (checkboxMode) {
      // Exit checkbox mode and clear selections
      setSelectedItems(new Set());
    }
  };

  const renderPublicationItem = (item: Publication, index: number) => {
    const actualIndex = items.findIndex(i => i === item);
    const isSelected = selectedItems.has(actualIndex);

    return (
      <tr
        key={actualIndex}
        className={`table-row ${isSelected ? 'selected' : ''}`}
        onDoubleClick={handleDoubleClick}
      >
        {checkboxMode && (
          <td className="table-cell checkbox-cell">
            <input
              type="checkbox"
              className="item-checkbox"
              checked={isSelected}
              onChange={() => toggleSelectItem(actualIndex)}
              aria-label={`Select ${item.title}`}
            />
          </td>
        )}
        <td className="table-cell number-cell">{index + 1}</td>
        <td className="table-cell title-cell">{item.title}</td>
        <td className="table-cell venue-cell">{item.venue}</td>
        <td className="table-cell year-cell">{item.year}</td>
        <td className="table-cell status-cell">
          <span className={`status-badge status-${item.status.toLowerCase()}`}>
            {item.status}
          </span>
        </td>
        <td className="table-cell actions-cell">
          <button
            onClick={() => handleEdit(actualIndex)}
            className="btn-icon btn-edit"
            aria-label="Edit"
            title="Edit"
          >
            <FontAwesomeIcon icon={faPencil} />
          </button>
          <button
            onClick={() => handleDelete(actualIndex)}
            className="btn-icon btn-delete"
            aria-label="Delete"
            title="Delete"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </td>
      </tr>
    );
  };

  const renderList = () => {
    if (contentType === 'publications') {
      return (
        <table className="publications-table">
          <thead>
            <tr>
              {checkboxMode && <th className="checkbox-header"></th>}
              <th className="number-header">#</th>
              <th className="title-header">Title</th>
              <th className="venue-header">Venue</th>
              <th className="year-header">Year</th>
              <th className="status-header">Status</th>
              <th className="actions-header">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item, index) => renderPublicationItem(item, index))}
          </tbody>
        </table>
      );
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

      {items.length > 0 && (
        <>
          <div className="list-controls">
            <div className="search-container">
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
              <input
                type="text"
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>

            {!checkboxMode && (
              <div className="checkbox-hint">
                <span>Double-click on any item to enable selection mode</span>
              </div>
            )}

            {selectedItems.size > 0 && (
              <div className="selection-actions">
                <span className="selection-count">
                  {selectedItems.size} selected
                </span>
                <button onClick={handleBulkDelete} className="btn-bulk-delete">
                  <FontAwesomeIcon icon={faTrash} />
                  Delete Selected
                </button>
              </div>
            )}
          </div>

        </>
      )}

      <div className="item-list">
        {items.length === 0 ? (
          <div className="empty-state">
            <p>No items yet</p>
            <p>Click "Add New" to create your first item</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="empty-state">
            <p>No results found</p>
            <p>Try adjusting your search query</p>
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

      {bulkDeleteConfirm && (
        <div className="confirm-dialog">
          <div className="confirm-content">
            <h3>Confirm Bulk Delete</h3>
            <p>
              Are you sure you want to delete {selectedItems.size} item(s)?
              This action cannot be undone.
            </p>
            <div className="confirm-actions">
              <button onClick={() => setBulkDeleteConfirm(false)} className="btn-cancel">
                Cancel
              </button>
              <button onClick={confirmBulkDelete} className="btn-delete">
                Delete All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormBasedEditor;
