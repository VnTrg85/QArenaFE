import React, { useState, useEffect } from 'react';
import './ProjectModal.scss';

const ProjectModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    projectName: '',
    description: '',
    out_scope: '',
    goal: '',
    additional_requirement: '',
    create_at: '',
    end_at: '',
    status: '',
    platform: '',
    language: '',
    link: ''
  });

  useEffect(() => {
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + 15);

    setFormData((prev) => ({
      ...prev,
      create_at: today.toISOString().split('T')[0],
      end_at: futureDate.toISOString().split('T')[0],
      status: 'Pending'
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Thêm Project mới</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="projectName" placeholder="Project Name:" value={formData.projectName} onChange={handleChange} required />
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
          <textarea name="out_scope" placeholder="Out Scope:" value={formData.out_scope} onChange={handleChange} />
          <textarea name="goal" placeholder="Goal:" value={formData.goal} onChange={handleChange} />
          <textarea name="additional_requirement" placeholder="Additional Requirement" value={formData.additional_requirement} onChange={handleChange} />
          <input type="date" name="create_at" value={formData.create_at} onChange={handleChange} disabled />
          <input type="date" name="end_at" value={formData.end_at} onChange={handleChange} />
          <input type="text" name="status" placeholder="status:" value={formData.status} onChange={handleChange} disabled/>
          <input type="text" name="platform" placeholder="Platform:" value={formData.platform} onChange={handleChange} />
          <input type="text" name="language" placeholder="Language:" value={formData.language} onChange={handleChange} />
          <input type="url" name="link" placeholder="Link:" value={formData.link} onChange={handleChange} />
          <div className="modal-buttons">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectModal;
