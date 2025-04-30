import React, { useEffect, useState } from 'react';
import { getTestProjectsByUser, createTestProject } from '../../Service/TestProject/index';
import ProjectCard from '../../Component/ProjectCard/ProjectCard';
import ProjectModal from '../../Component/ProjectModal/ProjectModal';
import './ProjectPage.scss';
import { get_user_by_email } from "../../../Services/UserService";
import { useNavigate } from 'react-router-dom';

const ProjectPage = () => {
  const [projects, setProjects] = useState([]);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");

  const handleViewDetail = (projectId) => {
    console.log("Navigating to project detail with id:", projectId);
    navigate(`/Q3VzdG9tZXI=/project/${projectId}`);
  };

  useEffect(() => {
    const initializeUser = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user.email) {
          const userInfo = await get_user_by_email(user.email);
          console.log("userInfo:", userInfo);
          if (userInfo.status === "success" && userInfo.data && userInfo.data.id) {
            setUserId(userInfo.data.id);
            fetchProjects(userInfo.data.id);
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

  const filteredProjects = activeTab === "all"
  ? projects
  : projects.filter(project => project.status?.toLowerCase() === activeTab);

  const fetchProjects = async (id) => {
    try {
      const res = await getTestProjectsByUser(id);
      console.log("Fetched projects:", res);
      if (res && Array.isArray(res) && res.length > 0) {
        setProjects(res); 
      } else {
        console.error("Failed to fetch projects:", res.data);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  return (
    <div className="project-page">
      <div className="project-header">
        <h2>Danh sách Project</h2>
        <button onClick={() => navigate(`/Q3VzdG9tZXI=/project/create`)}>+ Thêm mới</button>
      </div>
      <div className="project-tabs-menu">
        {["all", "pending", "doing", "done"].map(status => (
          <button
            key={status}
            className={activeTab === status ? "active" : ""}
            onClick={() => setActiveTab(status)}
          >
            {status === "all" ? "Tất cả" : status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>
      <div className="project-grid">
        {filteredProjects.map(project => (
          <ProjectCard key={project.id} project={project} onViewDetail={() => handleViewDetail(project.id)} />
        ))}
      </div>
    </div>
  );
};

export default ProjectPage;
