import React, { useState, useEffect, useCallback } from 'react';
import { passwordStrength } from 'check-password-strength';
import debounce from 'lodash.debounce';
import { MdOutlineVisibility } from 'react-icons/md';
import PasswordStrengthBar from '../PasswordStrengthBar/PasswordStrengthBar';

import './Input.scss';

const INPUT_STATUS = {
  ACTIVE: 'active',
  FOCUSED: 'focus',
  ERROR: 'error',
};

const Input = ({
  type = 'text',
  label,
  value,
  onChange,
  showStrength,
  error,
  fullWidth,
  ...props
}) => {
  const [inputBoxClass, setInputBoxClass] = useState('');
  const [passwordScore, setPasswordScore] = useState(); // 0 = Too weak || 1 = Weak || 2 = Medium || 3 = Strong

  const handleInputClick = () => {
    if (inputBoxClass !== INPUT_STATUS.ACTIVE && !error) {
      setInputBoxClass(INPUT_STATUS.ACTIVE);
    }
  };
  const handleInputFocus = () => {
    if (inputBoxClass !== INPUT_STATUS.ACTIVE && !error) {
      setInputBoxClass(INPUT_STATUS.ACTIVE);
    }
  };
  const handleInputBlur = () => {
    if (!error) {
      setInputBoxClass(undefined);
    }
  };

  useEffect(() => {
    if (error) {
      setInputBoxClass(INPUT_STATUS.ERROR);
    }
  }, [error]);

  // check password strength with debounced time
  const isInputPassword = type === 'password';
  const checkPassword = (event) => {
    setPasswordScore(passwordStrength(event.target.value).id);
  };
  const debouncedCheckPassword = useCallback(debounce(checkPassword, 300), []);
  const handleOnChange = (ev) => {
    if (isInputPassword) {
      debouncedCheckPassword(ev);
    }
    onChange(ev);
  };

  return (
    <div className={`input-container${error ? ' has-error' : ''}${fullWidth ? ' full-width' : ''}`}>
      <label htmlFor={props.name} className="input-label">
        {label}
      </label>
      <div className={`input-box ${inputBoxClass}`}>
        <input
          className="input"
          id={props.name}
          type={type}
          onClick={handleInputClick}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          value={value}
          onChange={handleOnChange}
          {...props}
        />
        {isInputPassword && (
          <figure className="input-decorator">
            <MdOutlineVisibility size="1.5em" />
          </figure>
        )}
        {value && isInputPassword && showStrength && (
          <PasswordStrengthBar strength={passwordScore} />
        )}
      </div>
      {error ? <small className="input-error-placeholder">{error}</small> : null}
    </div>
  );
};

export default React.memo(Input);
