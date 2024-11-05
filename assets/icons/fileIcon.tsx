import React from 'react';

interface FileIconProps {
  className?: string;
}

export const FileIcon: React.FC<FileIconProps> = ({ className }) => {
  return (
    <svg 
      width="18" 
      height="20" 
      viewBox="0 0 18 20" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d="M17.0306 5.71938L11.7806 0.469375C11.6399 0.328758 11.449 0.249844 11.25 0.25H2.25C1.42157 0.25 0.75 0.921573 0.75 1.75V18.25C0.75 19.0784 1.42157 19.75 2.25 19.75H15.75C16.5784 19.75 17.25 19.0784 17.25 18.25V6.25C17.2502 6.05103 17.1712 5.86015 17.0306 5.71938ZM12 2.81031L14.6897 5.5H12V2.81031ZM15.75 18.25H2.25V1.75H10.5V6.25C10.5 6.66421 10.8358 7 11.25 7H15.75V18.25Z" 
        fill="#1C170D"
      />
    </svg>
  );
};
