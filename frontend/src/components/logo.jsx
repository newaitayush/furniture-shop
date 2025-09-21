import React from 'react';

const Logo = ({ className = "w-8 h-8" }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 75 L35 25 L50 55 L65 25 L80 75 L65 50 L50 75 L35 50 Z"
        fill="#B88E2F"
        stroke="none"
      />
      <path
        d="M40 50 L50 35 L60 50 L50 45 Z"
        fill="#B88E2F"
        stroke="none"
      />
    </svg>
  );
};

export default Logo;
