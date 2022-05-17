import React from 'react';
import './Placeholder.scss';

const Placeholder = ({ icon, primaryText, secondaryText }) => {
  return (
    <div className="placeholder">
      <div className="placeholder--icon">{icon}</div>
      <div className="placeholder--text">
        <h2>{primaryText}</h2>
        <p>{secondaryText}</p>
      </div>
    </div>
  );
};

export default Placeholder;
