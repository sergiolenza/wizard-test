import React from 'react';
import './PasswordStrengthBar.scss';

// 0 = Too weak || 1 = Weak || 2 = Medium || 3 = Strong
const STRENGTH_CLASS = {
  0: 'too-weak',
  1: 'weak',
  2: 'medium',
  3: 'strong',
};

const PasswordStrengthBar = ({ strength = 0 }) => (
  <figure
    className={`password-strength-bar ${STRENGTH_CLASS[strength]}`}
    aria-label="password-strength-bar"
  />
);

export default PasswordStrengthBar;
