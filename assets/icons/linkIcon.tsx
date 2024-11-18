import React from "react";

interface LinkIconProps {
  className?: string;
  onClick?: () => void;
}

export const LinkIcon: React.FC<LinkIconProps> = ({ className, onClick }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
    >
      <path
        fillRule="evenodd"
        clip-rule="evenodd"
        d="M8.74531 12.5594C8.9892 12.8034 8.9892 13.1989 8.74531 13.443L7.96875 14.2242C6.25861 15.9333 3.4868 15.9324 1.77773 14.2223C0.0686722 12.5121 0.0695462 9.74031 1.77969 8.03125L3.66406 6.14688C5.30164 4.50799 7.93294 4.42989 9.66484 5.96875C9.92373 6.19829 9.94751 6.59424 9.71797 6.85312C9.48843 7.11201 9.09248 7.13579 8.83359 6.90625C7.59666 5.8078 5.71796 5.86363 4.54844 7.03359L2.66406 8.91562C1.44343 10.1363 1.44343 12.1153 2.66406 13.3359C3.8847 14.5566 5.86374 14.5566 7.08438 13.3359L7.86094 12.5594C7.97817 12.442 8.13724 12.3761 8.30313 12.3761C8.46901 12.3761 8.62808 12.442 8.74531 12.5594ZM14.2203 1.77813C12.5101 0.0717757 9.74144 0.0717757 8.03125 1.77813L7.25469 2.55547C7.01069 2.79968 7.01087 3.19546 7.25508 3.43945C7.49929 3.68345 7.89507 3.68328 8.13906 3.43906L8.91562 2.6625C10.1363 1.44186 12.1153 1.44186 13.3359 2.6625C14.5566 3.88314 14.5566 5.86218 13.3359 7.08281L11.4516 8.96875C10.2814 10.138 8.40273 10.1928 7.16641 9.09375C6.99894 8.94526 6.76497 8.8974 6.55264 8.96818C6.34032 9.03897 6.18188 9.21766 6.13702 9.43693C6.09216 9.65621 6.16769 9.88276 6.33516 10.0312C8.06665 11.5705 10.6979 11.4931 12.3359 9.85469L14.2203 7.97031C15.9277 6.25995 15.9277 3.49005 14.2203 1.77969V1.77813Z"
        fill="#A1824A"
      />
    </svg>
  );
};
