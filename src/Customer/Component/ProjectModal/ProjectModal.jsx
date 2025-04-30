import React, { useState, useEffect } from 'react';
import './ProjectModal.scss';
import { get_user_by_email } from '../../../Services/UserService';
import { createTestProject } from '../../Service/TestProject';
import { useNavigate } from 'react-router-dom';
import QuillEditor from '../QuillEditor';

const ProjectModal = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    projectName: '',
    description: '',
    outScope: '',
    additionalRequirement: '',
    link: '',
    goal: '',
    platform: '',
    create_At: '',
    end_At: '',
    status: '',
    language: ''
  });
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + 15);
    setFormData((prev) => ({
      ...prev,
      create_At: today.toISOString().split('T')[0],
      end_At: futureDate.toISOString().split('T')[0],
      status: 'Pending'
    }));

    const initializeUser = async () => {
          try {
            const user = JSON.parse(localStorage.getItem("user"));
            if (user && user.email) {
              const userInfo = await get_user_by_email(user.email);
              console.log("userInfo:", userInfo);
              if (userInfo.status === "success" && userInfo.data && userInfo.data.id) {
                setUserId(userInfo.data.id);
              } else {
                console.error("Failed to get user info:", userInfo.data || userInfo);
              }
            } else {
              console.error("No user email found in localStorage!");
            }
          } catch (error) {
            console.error("Error initializing user:", error);
          }
        };
      
        initializeUser();
  }, []);

  const stripHtml = (html) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const requiredFields = ['projectName', 'description', 'outScope', 'goal', 'additionalRequirement', 'link', 'platform', 'language'];
    for (let field of requiredFields) {
      const value = stripHtml(formData[field] || '');
      if (!value.trim()) {
        alert(`Vui lòng nhập: ${field}`);
        return;
      }
    }
  
    if (!userId) {
      alert("Không xác định được người dùng!");
      return;
    }
  
    const formattedData = {
      ...formData,
      platform: formData.platform.split(',').map(item => item.trim()),
      language: formData.language.split(',').map(item => item.trim()),
    };
  
    const completeProject = {
      ...formattedData,
      userId: userId,
      description: stripHtml(formattedData.description),
      outScope: stripHtml(formattedData.outScope),
      goal: stripHtml(formattedData.goal),
      additionalRequirement: stripHtml(formattedData.additionalRequirement),
    };
  
    try {
      const res = await createTestProject(completeProject);
      console.log("Create project response:", res);
      navigate(`/Q3VzdG9tZXI=/project`);
    } catch (error) {
      console.error("Error creating project:", error);
      alert("Tạo project thất bại!");
    }
  };

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link'],
      ['clean']
    ]
  };

  return (
      <div className="modal-content">
        <h2>Thêm Project mới</h2>
        <form onSubmit={handleSubmit}>
          <p><strong>Project Name: </strong></p>
          <input type="text" name="projectName" placeholder="Project Name:" value={formData.projectName} onChange={handleChange} required />
          <p><strong>Description: </strong></p>
          <QuillEditor theme="snow" modules={modules} value={formData.description} onChange={(value) => setFormData(prev => ({ ...prev, description: value }))} />

          <p><strong>Out Scope: </strong></p>
          <QuillEditor theme="snow" modules={modules} value={formData.outScope} onChange={(value) => setFormData(prev => ({ ...prev, outScope: value }))} />

          <p><strong>Goal: </strong></p>
          <QuillEditor theme="snow" modules={modules} value={formData.goal} onChange={(value) => setFormData(prev => ({ ...prev, goal: value }))} />

          <p><strong>Additional Requirement: </strong></p>
          <QuillEditor theme="snow" modules={modules} value={formData.additionalRequirement} onChange={(value) => setFormData(prev => ({ ...prev, additionalRequirement: value }))} />
          <p><strong>Create At: </strong></p>
          <input type="date" name="create_at" value={formData.create_At} onChange={handleChange} disabled />
          <p><strong>End At: </strong></p>
          <input type="date" name="end_at" value={formData.end_At} onChange={handleChange} />
          <p><strong>Status: </strong></p>
          <input type="text" name="status" placeholder="status:" value={formData.status} onChange={handleChange} disabled/>
          <p><strong>Platform: </strong></p>
          <input type="text" name="platform" placeholder="Platform:" value={formData.platform} onChange={handleChange} />
          <p><strong>Language: </strong></p>
          <input type="text" name="language" placeholder="Language:" value={formData.language} onChange={handleChange} />
          <p><strong>Link: </strong></p>
          <input type="url" name="link" placeholder="Link:" value={formData.link} onChange={handleChange} />
          <div className="modal-buttons">
            <button type="submit">Save</button>
            <button type="button" onClick={() => navigate(`/Q3VzdG9tZXI=/project`)}>Cancel</button>
          </div>
        </form>
      </div>
  );
};

export default ProjectModal;
