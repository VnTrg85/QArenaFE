import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getTestProjectDetail } from '../../Service/TestProject/index';
import { getBugReportsByProject } from '../../Service/BugReport/index';
import './ProjectDetailPage.css';

const ProjectDetailPage = () => {
  const location = useLocation();
  const [projectId,setProjectId] = useState( location.pathname.split("/")[3])
  
  console.log(projectId);
  
  const [project, setProject] = useState(null);
  const [bugReports, setBugReports] = useState([]);
  const [expandedBug, setExpandedBug] = useState(null);

  useEffect(() => {
    const fetchProjectDetail = async () => {
      try {
        const res = await getTestProjectDetail(projectId);
        if (res.status === 'success') {
          setProject(res.data);
        } else {
          console.error('Failed to fetch project details');
        }
      } catch (error) {
        console.error('Error fetching project details:', error);
      }
    };

    const fetchBugReports = async () => {
      try {
        const res = await getBugReportsByProject(projectId);
        setBugReports(res);
      } catch (error) {
        console.error('Error fetching bug reports:', error);
      }
    };

    fetchProjectDetail();
    fetchBugReports();
  }, [projectId]);

  const toggleBugDetail = (bugId) => {
    if (expandedBug === bugId) {
      setExpandedBug(null);
    } else {
      setExpandedBug(bugId);
    }
  };

  return (
    <div className="project-detail-page">
      {project ? (
        <div className="project-detail">
          <h2>{project.projectName}</h2>
          <p><strong>Description:</strong> {project.description}</p>
          <p><strong>Goal:</strong> <a href={project.goal} target="_blank" rel="noopener noreferrer">View Goal</a></p>
          <p><strong>Out of Scope:</strong> {project.outScope}</p>
        </div>
      ) : (
        <p>Loading project details...</p>
      )}

      <div className="bug-reports-section">
        <h3>Bug Reports</h3>
        {bugReports.length > 0 ? (
          <div className="bug-report-list">
            {bugReports.map((bug) => (
              <div key={bug.id} className="bug-report-item">
                <div
                  className="bug-report-summary"
                  onClick={() => toggleBugDetail(bug.id)}
                >
                  <h4>{bug.title}</h4>
                </div>
                {expandedBug === bug.id && (
                  <div className="bug-report-detail">
                    <p><strong>Description:</strong> {bug.description}</p>
                    <p><strong>Status:</strong> {bug.status}</p>
                    <p><strong>Assigned To:</strong> {bug.assignedTo}</p>
                    <p><strong>Created At:</strong> {new Date(bug.createdAt).toLocaleString()}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>No bug reports available for this project.</p>
        )}
      </div>
    </div>
  );
};

export default ProjectDetailPage;
