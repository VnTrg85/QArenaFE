import React from "react";
import "./ProjectCard.scss";

const ProjectCard = ({ project }) => {
	return (
		<div className="project-card">
			<h3>{project.projectName}</h3>
			<p>{project.description}</p>
			<p>
				<strong>status:</strong> {project.status}
			</p>
			<p>
				<strong>platform:</strong> {project.platform?.join(", ")}
			</p>
			<p>
				<strong>lang:</strong> {project.language?.join(", ")}
			</p>
			<a href={project.link} target="_blank" rel="noopener noreferrer">
				Link
			</a>
		</div>
	);
};

export default ProjectCard;
