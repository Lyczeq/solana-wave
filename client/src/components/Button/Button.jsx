import React from 'react';
import './Button.css';

export const Button = ({ children, onClick, className }) => {
  return (
    <button className={`cta-button ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};
