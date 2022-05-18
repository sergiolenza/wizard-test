import React from 'react';
import './TextTitle.scss';

const TextTitle = ({ children }) => {
  return (
    <>
      <h1 className="text-title">{children}</h1>
      <figure className="text-title--figure" aria-label="text-title-underline" />
    </>
  );
};

export default TextTitle;
