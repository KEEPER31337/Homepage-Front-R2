import React from 'react';

interface PointInfoProps {
  earnablePoint: number;
}

const PointInfo = ({ earnablePoint }: PointInfoProps) => {
  return (
    <div className="mb-1 grid place-items-center">
      <p className="text-3xl">POINT {earnablePoint}</p>
    </div>
  );
};

export default PointInfo;
