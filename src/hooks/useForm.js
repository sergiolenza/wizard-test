import { useState } from 'react';

const useForm = ({ onFormValid, customValidations } = {}) => {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({});

  return {
    errors,
    onSubmit: (event) => {
      event.preventDefault();
      const elementsWithErrors = [];
      let customErrors = {};

      // check HTML native validation (required, type, etc)
      // https://developer.mozilla.org/en-US/docs/Web/API/ValidityState
      [...event.target.elements].forEach((el) => {
        if (el.validity.valid === false) {
          errors[el.name] = el.validity;
          elementsWithErrors.push(el);
        } else {
          values[el.name] = el.value;
        }
      });

      setValues((prevState) => ({
        ...prevState,
        ...values,
      }));

      if (typeof customValidations === 'function') {
        customErrors = customValidations(values) || {};
      }

      setErrors((prevState) => ({
        ...prevState,
        ...errors,
        ...customErrors,
      }));

      if (Object.keys({ ...errors, ...customErrors }).length === 0) {
        if (typeof onFormValid === 'function') {
          onFormValid(values);
        }
      }
    },
    clearFieldErrors: (fieldName) => {
      setErrors((prevState) => {
        const newState = { ...prevState };
        delete newState[fieldName];
        return newState;
      });
    },
  };
};

export default useForm;
