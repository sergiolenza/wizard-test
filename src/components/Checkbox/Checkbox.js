import React from 'react';
import './Checkbox.scss';

const Checkbox = ({ label, checked, error, ...props }) => {
  return (
    <div className="checkbox">
      <input className="checkbox--field" type="checkbox" checked={checked} {...props} />
      <label className="checkbox--label" htmlFor={props.name} aria-label="checkbox-label">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
