import React, { useState } from 'react';
import type { Publication } from '../../types';
import './ContentForm.css';

interface PublicationFormProps {
  item?: Publication;
  onSave: (item: Publication) => void;
  onCancel: () => void;
}

const PublicationForm: React.FC<PublicationFormProps> = ({ item, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Publication>(
    item || {
      title: '',
      venue: '',
      year: new Date().getFullYear().toString(),
      status: 'review',
      authors: '',
      link: '',
      pdfLink: '',
      bibtexId: '',
      abstract: '',
      citations: 0,
      downloads: 0,
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (field: keyof Publication, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <form className="content-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="venue">Venue *</label>
          <input
            type="text"
            id="venue"
            value={formData.venue}
            onChange={(e) => handleChange('venue', e.target.value)}
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="year">Year *</label>
          <input
            type="text"
            id="year"
            value={formData.year}
            onChange={(e) => handleChange('year', e.target.value)}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="status">Status *</label>
          <select
            id="status"
            value={formData.status}
            onChange={(e) => handleChange('status', e.target.value as any)}
            required
          >
            <option value="published">Published</option>
            <option value="accepted">Accepted</option>
            <option value="review">Under Review</option>
            <option value="arxiv">arXiv</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="authors">Authors</label>
          <input
            type="text"
            id="authors"
            value={formData.authors || ''}
            onChange={(e) => handleChange('authors', e.target.value)}
            placeholder="John Doe, Jane Smith"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="link">DOI/Link</label>
          <input
            type="url"
            id="link"
            value={formData.link || ''}
            onChange={(e) => handleChange('link', e.target.value)}
            placeholder="https://doi.org/..."
          />
        </div>
        <div className="form-field">
          <label htmlFor="pdfLink">PDF Link</label>
          <input
            type="text"
            id="pdfLink"
            value={formData.pdfLink || ''}
            onChange={(e) => handleChange('pdfLink', e.target.value)}
            placeholder="assets/docs/publications/paper.pdf"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="bibtexId">BibTeX ID</label>
          <input
            type="text"
            id="bibtexId"
            value={formData.bibtexId || ''}
            onChange={(e) => handleChange('bibtexId', e.target.value)}
            placeholder="Smith2024"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="abstract">Abstract</label>
          <textarea
            id="abstract"
            value={formData.abstract || ''}
            onChange={(e) => handleChange('abstract', e.target.value)}
            rows={6}
            placeholder="Enter the publication abstract..."
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="citations">Citations</label>
          <input
            type="number"
            id="citations"
            value={formData.citations || 0}
            onChange={(e) => handleChange('citations', parseInt(e.target.value) || 0)}
            min="0"
          />
        </div>
        <div className="form-field">
          <label htmlFor="downloads">Downloads</label>
          <input
            type="number"
            id="downloads"
            value={formData.downloads || 0}
            onChange={(e) => handleChange('downloads', parseInt(e.target.value) || 0)}
            min="0"
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel} className="btn-cancel">
          Cancel
        </button>
        <button type="submit" className="btn-save">
          Save Publication
        </button>
      </div>
    </form>
  );
};

export default PublicationForm;
