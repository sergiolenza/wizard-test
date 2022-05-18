import { useState } from 'react';

const useInput = ({ name, initialValue, beforeChange }) => {
  const [value, setValue] = useState(initialValue);
  const isCheckbox = typeof value === 'boolean';

  return {
    id: name,
    name,
    ...(isCheckbox ? { checked: value } : { value }),
    onChange: (data) => {
      let fieldName;
      let fieldValue;

      if (data !== null && data !== undefined) {
        fieldName = data.target.name;
        fieldValue = data.target.value;
      } else {
        fieldName = name;
        fieldValue = '';
      }

      if (isCheckbox) {
        fieldValue = data.target.checked;
      }

      if (typeof beforeChange === 'function') {
        beforeChange(fieldName, fieldValue);
      }

      setValue(fieldValue);
    },
  };
};

export default useInput;
