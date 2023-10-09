import React from "react";

interface ArrowProps {
  color: string;
}
const Arrow: React.FC<ArrowProps> = ({ color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M4 11l8 3l8 -3"></path>
    </svg>
  );
};

export default Arrow;
