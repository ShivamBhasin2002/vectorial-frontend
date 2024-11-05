import React from "react";

interface RightChevronIconProps {
  className?: string;
  onClick?: () => void;
}

export const RightChevronIcon: React.FC<RightChevronIconProps> = ({
  className,
  onClick,
}) => {
  return (
    <svg
      width="24"
      height="28"
      viewBox="0 0 24 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.0306 14.5306L9.53055 22.0306C9.2375 22.3237 8.76236 22.3237 8.4693 22.0306C8.17625 21.7376 8.17625 21.2624 8.4693 20.9694L15.4396 14L8.4693 7.03061C8.17625 6.73756 8.17625 6.26242 8.4693 5.96936C8.76236 5.67631 9.2375 5.67631 9.53055 5.96936L17.0306 13.4694C17.1714 13.61 17.2505 13.8009 17.2505 14C17.2505 14.199 17.1714 14.3899 17.0306 14.5306Z"
        fill="#A1824A"
      />
    </svg>
  );
};
