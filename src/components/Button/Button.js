import React from 'react';
import './Button.scss';

const BUTTON_VARIANTS = {
  CONTAINED: 'contained',
  TEXT: 'text',
};

const Button = ({ children, variant = BUTTON_VARIANTS.CONTAINED, ...props }) => {
  return (
    <button className={`button ${variant}`} type="button" {...props}>
      {children}
    </button>
  );
};

export default Button;
