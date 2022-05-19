import React, { useState, useEffect, useCallback } from 'react';
import { passwordStrength } from 'check-password-strength';
import debounce from 'lodash.debounce';
import { MdOutlineVisibility } from 'react-icons/md';
import PasswordStrengthBar from '../PasswordStrengthBar/PasswordStrengthBar';
import './Input.scss';

const INPUT_STATUS = {
  ACTIVE: 'active',
  ERROR: 'error',
};

const Input = ({
  type = 'text',
  label,
  value,
  maxLength,
  onChange,
  showStrength,
  showCharCounter,
  error,
  fullWidth,
  ...props
}) => {
  const [inputType, setInputType] = useState(type);
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

  const isInputPassword = type === 'password';
  const checkPassword = (event) => {
    setPasswordScore(passwordStrength(event.target.value).id);
  };
  // check password strength with debounced time
  const debouncedCheckPassword = useCallback(debounce(checkPassword, 300), []);
  const handleOnChange = (ev) => {
    if (isInputPassword) {
      debouncedCheckPassword(ev);
    }
    onChange(ev);
  };

  const handleOnClickPasswordDecorator = () => {
    setInputType(inputType === 'text' ? 'password' : 'text');
  };

  return (
    <div className={`input-container${error ? ' has-error' : ''}${fullWidth ? ' full-width' : ''}`}>
      <label className="input--label" htmlFor={props.name} aria-label="input-label">
        {label}
      </label>
      <div className={`input--box ${inputBoxClass ?? ''}`}>
        <input
          className="input--field"
          id={props.name}
          aria-labelledby={props.name}
          type={inputType}
          onClick={handleInputClick}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          value={value}
          onChange={handleOnChange}
          maxLength={maxLength}
          {...props}
        />
        {isInputPassword && (
          <figure
            aria-label="input-box-decorator"
            className={`input--box--decorator ${inputType}`}
            onClick={handleOnClickPasswordDecorator}
          >
            <MdOutlineVisibility size="1.5em" />
          </figure>
        )}
        {value && isInputPassword && showStrength && (
          <PasswordStrengthBar strength={passwordScore} />
        )}
        {showCharCounter && (
          <div
            role="status"
            className="input--box--char-counter"
            aria-label="input-box-char-counter"
          >
            {value.length}
            {maxLength ? `/${maxLength}` : null}
          </div>
        )}
      </div>
      {error ? <small className="input--error-placeholder">{error}</small> : null}
    </div>
  );
};

export default React.memo(Input);
