import React from "react";
import "./ProjectCard.scss";

const ProjectCard = ({ project, onViewDetail }) => {
	const formatDate = (isoString) => {
		const date = new Date(isoString);
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const year = date.getFullYear();
		return `${day}.${month}.${year}`;
	  };
	
	const formatPlatform = (platformArray) => {
		if (!platformArray || platformArray.length === 0) return "";
		return platformArray.join(", ");
	  };
	return (
	  <div className="project-card">
		<div className="project-card-header">
			<h3>{project.projectName}</h3>
			<div className="project-date">
				<div className="date-text">{formatDate(project.end_At)}</div>
				<div className="calendar-icon">📅</div> 
			</div>
		</div>
		<p style={{marginLeft: 5 + 'px'}}>{project.description}</p>
		<p><strong><span>Platform</span></strong>: {formatPlatform(project.platform)}</p>
		<p><strong>Status:</strong> {project.status}</p>
		<p><strong>Language:</strong> {project.language}</p>
		<div className="project-footer">
		<button className="btn-view" onClick={() => onViewDetail(project.id)}>
          View Details
        </button>
		</div>
	  </div>
	);
  };

export default ProjectCard;
