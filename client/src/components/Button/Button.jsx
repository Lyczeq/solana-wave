import React from 'react';
import './Button.css';

export const Button = ({ children, onClick, className, ...props }) => {
  return (
    <button className={`cta-button ${className}`} onClick={onClick} {...props}>
      {children}
    </button>
  );
};
