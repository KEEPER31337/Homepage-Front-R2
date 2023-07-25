import React from 'react';

interface CustomBadgeProps {
  children: React.ReactNode;
}

const CustomBadge = ({ children }: CustomBadgeProps) => {
  return (
    <span className="rounded bg-mainBlack px-1.5 py-0.5 text-center text-small font-semibold text-pointBlue">
      {children}
    </span>
  );
};

export default CustomBadge;
