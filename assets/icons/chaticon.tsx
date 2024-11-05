import React from 'react';

interface ChatIconProps {
  className?: string;
}

export const ChatIcon: React.FC<ChatIconProps> = ({ className }) => {
  return (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_515_4876)">
        <path 
          fillRule="evenodd" 
          clipRule="evenodd" 
          d="M12 2.25C8.57597 2.24925 5.40249 4.04466 3.63954 6.97997C1.87659 9.91527 1.78258 13.5602 3.39188 16.5825L2.32781 19.7747C2.14805 20.3137 2.28831 20.9081 2.69011 21.3099C3.09191 21.7117 3.68626 21.852 4.22531 21.6722L7.4175 20.6081C10.9994 22.5133 15.3867 22.0013 18.4336 19.3225C21.4806 16.6438 22.5503 12.3582 21.1197 8.56183C19.689 4.76543 16.057 2.25166 12 2.25ZM12 20.25C10.5497 20.251 9.12478 19.8691 7.86938 19.1428C7.68344 19.035 7.46018 19.0121 7.25625 19.08L3.75 20.25L4.91906 16.7437C4.98723 16.5399 4.9647 16.3167 4.85719 16.1306C2.9874 12.8979 3.52233 8.8124 6.16133 6.17005C8.80034 3.52772 12.8852 2.98763 16.1202 4.85333C19.3553 6.71903 20.9336 10.5252 19.9682 14.1327C19.0028 17.7402 15.7345 20.2494 12 20.25Z" 
          fill="#1C170D"
        />
      </g>
      <defs>
        <clipPath id="clip0_515_4876">
          <rect width="24" height="24" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  );
};