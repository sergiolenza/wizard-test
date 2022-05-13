import { useState } from 'react';

const useInput = ({ name, initialValue, beforeChange }) => {
  const [value, setValue] = useState(initialValue);

  return {
    id: name,
    name,
    value,
    onChange: (data) => {
      let fieldName;
      let fieldValue;

      if (data !== null && data !== undefined) {
        const { isLuxonDateTime } = data;
        fieldName = isLuxonDateTime ? name : data.target.name;
        fieldValue = isLuxonDateTime ? data : data.target.value;
      } else {
        fieldName = name;
        fieldValue = '';
      }

      if (typeof beforeChange === 'function') {
        beforeChange(fieldName, fieldValue);
      }

      setValue(fieldValue);
    },
  };
};

export default useInput;
