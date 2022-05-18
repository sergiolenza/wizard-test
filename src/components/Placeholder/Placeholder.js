import React from 'react';
import './Placeholder.scss';

const Placeholder = ({ error, icon, primaryText, secondaryText }) => {
  return (
    <div className={`placeholder${error ? ' error' : ''}`} role="banner" aria-label="placeholder">
      <div className="placeholder--icon">{icon}</div>
      <div className="placeholder--text">
        <h2>{primaryText}</h2>
        <p>{secondaryText}</p>
      </div>
    </div>
  );
};

export default Placeholder;
