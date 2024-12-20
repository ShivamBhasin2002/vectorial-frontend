import React from 'react'

interface VectorialLogoProps {
  className?: string;
  width?: number;
  height?: number;
}

const VectorialLogo = ({ className = "", width = 24, height = 24 }: VectorialLogoProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M7.84853 5L12 0.848528L16.1515 5L12 9.15147L7.84853 5Z"
        fill="#7ADEA0"
        stroke="#36434D"
        strokeWidth="1.2"
      />
      <path
        d="M7.84853 19L12 14.8485L16.1515 19L12 23.1515L7.84853 19Z"
        fill="#7ADEA0"
        stroke="#36434D"
        strokeWidth="1.2"
      />
      <path
        d="M14.8485 12L19 7.84853L23.1515 12L19 16.1515L14.8485 12Z"
        fill="#7ADEA0"
        stroke="#36434D"
        strokeWidth="1.2"
      />
      <path
        d="M0.848528 12L5 7.84853L9.15147 12L5 16.1515L0.848528 12Z"
        fill="#7ADEA0"
        stroke="#36434D"
        strokeWidth="1.2"
      />
    </svg>
  );
};

export default VectorialLogo