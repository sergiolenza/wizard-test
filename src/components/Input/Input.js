import React from 'react';
import './Input.scss';

const Input = ({ type = 'text', ...props }) => {
  return (
    <div className="input-container">
      <input type={type} {...props} />
    </div>
  );
};

export default Input;
