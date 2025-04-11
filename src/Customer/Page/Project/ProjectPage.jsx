import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProjectCard from '../../Component/ProjectCard/ProjectCard';
import ProjectModal from '../../Component/ProjectModal/ProjectModal';
import './ProjectPage.scss';

const ProjectPage = () => {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = () => {
    axios.get('/testProject/getAll')
      .then((res) => setProjects(res.data))
      .catch((err) => console.error(err));
  };

  const addProject = (newProject) => {
    axios.post('/testProject/create', newProject)
      .then(() => fetchProjects())
      .catch((err) => console.error(err));
  };

  return (
    <div className="project-page">
      <div className="project-header">
        <h2>Danh sách Project</h2>
        <button onClick={() => setShowModal(true)}>+ Thêm mới</button>
      </div>
      <div className="project-grid">
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      {showModal && (
        <ProjectModal onClose={() => setShowModal(false)} onSubmit={addProject} />
      )}
    </div>
  );
};

export default ProjectPage;
