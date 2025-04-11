import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProjectList.scss';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get('https://localhost:8080/testProject/getAll')
      .then((res) => {
        setProjects(res.data);
      })
      .catch((err) => {
        console.error('Failed to fetch projects:', err);
      });
  }, []);

  return (
    <div className="project-list">
      <h2 className="section-title">Test Projects</h2>
      <div className="table-wrapper">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Created At</th>
              <th>End At</th>
              <th>Platform</th>
              <th>Language</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td>{project.projectName}</td>
                <td className="description-cell">{project.description}</td>
                <td>{project.status}</td>
                <td>{new Date(project.create_at).toLocaleDateString()}</td>
                <td>{new Date(project.end_at).toLocaleDateString()}</td>
                <td>{project.platform?.join(', ')}</td>
                <td>{project.language?.join(', ')}</td>
                <td>
                  <a href={project.link} target="_blank" rel="noopener noreferrer">Visit</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectList;
