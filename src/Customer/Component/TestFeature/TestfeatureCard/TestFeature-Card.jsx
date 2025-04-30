import React from 'react';
import './TestFeatureCard.css';

const TestFeatureCard = ({ feature }) => {
  return (
    <div className="feature-card">
      <h3 className="feature-title">{feature.name}</h3>
      <p><strong>Input:</strong> {feature.input}</p>
      <p><strong>Output:</strong> {feature.output}</p>
      {feature.bugType && (
        <div className="feature-bugtype">
          <strong>Bug Type:</strong>
          <span className="bugtype-name">{feature.bugType.name}</span>
        </div>
      )}
    </div>
  );
};

export default TestFeatureCard;
