import React from 'react';

interface BinIconProps {
  className?: string;
  onClick?: () => void;
}

export const BinIcon: React.FC<BinIconProps> = ({ className, onClick }) => {
  return (
    <svg 
      width="28" 
      height="28" 
      viewBox="0 0 28 28" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
    >
      <g clipPath="url(#clip0_515_4846)">
        <path 
          fillRule="evenodd" 
          clipRule="evenodd" 
          d="M22.25 6.5H18.5V5.75C18.5 4.50736 17.4926 3.5 16.25 3.5H11.75C10.5074 3.5 9.5 4.50736 9.5 5.75V6.5H5.75C5.33579 6.5 5 6.83579 5 7.25C5 7.66421 5.33579 8 5.75 8H6.5V21.5C6.5 22.3284 7.17157 23 8 23H20C20.8284 23 21.5 22.3284 21.5 21.5V8H22.25C22.6642 8 23 7.66421 23 7.25C23 6.83579 22.6642 6.5 22.25 6.5ZM11 5.75C11 5.33579 11.3358 5 11.75 5H16.25C16.6642 5 17 5.33579 17 5.75V6.5H11V5.75ZM20 21.5H8V8H20V21.5ZM12.5 11.75V17.75C12.5 18.1642 12.1642 18.5 11.75 18.5C11.3358 18.5 11 18.1642 11 17.75V11.75C11 11.3358 11.3358 11 11.75 11C12.1642 11 12.5 11.3358 12.5 11.75ZM17 11.75V17.75C17 18.1642 16.6642 18.5 16.25 18.5C15.8358 18.5 15.5 18.1642 15.5 17.75V11.75C15.5 11.3358 15.8358 11 16.25 11C16.6642 11 17 11.3358 17 11.75Z" 
          fill="#A1824A"
        />
      </g>
      <defs>
        <clipPath id="clip0_515_4846">
          <rect width="24" height="24" fill="white" transform="translate(2 2)"/>
        </clipPath>
      </defs>
    </svg>
  );
};
