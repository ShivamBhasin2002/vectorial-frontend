import React from 'react';

interface SendIconProps {
  className?: string;
  onClick?: () => void;
}

export const SendIcon: React.FC<SendIconProps> = ({ className, onClick }) => {
  return (
    <svg
      width="18"
      height="17"
      viewBox="0 0 18 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
    >
      <path
        fillRule="evenodd"
        clip-rule="evenodd"
        d="M17.5859 14.632L10.082 1.51406C9.86063 1.12048 9.44416 0.876918 8.99258 0.876918C8.541 0.876918 8.12453 1.12048 7.90312 1.51406L0.411719 14.6391C0.15766 15.0925 0.210749 15.6559 0.545047 16.0539C0.879346 16.452 1.42508 16.6016 1.91563 16.4297L8.98359 14.0078H8.99141H8.99844L16.0828 16.4297C16.575 16.6038 17.1235 16.4537 17.4584 16.0533C17.7933 15.6529 17.8442 15.0865 17.5859 14.6328V14.632ZM16.4922 15.2445L9.625 12.8953V8.375C9.625 8.02982 9.34518 7.75 9 7.75C8.65482 7.75 8.375 8.02982 8.375 8.375V12.8891L1.50938 15.2453L1.5 15.25L8.98906 2.125L16.5 15.25L16.4922 15.2445Z"
        fill="white"
      />
    </svg>
  );
};
