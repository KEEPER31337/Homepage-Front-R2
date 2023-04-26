import { Typography } from '@material-tailwind/react';
import React from 'react';

const Trendings = () => {
  return (
    <div className="w-full bg-mainBlack px-20">
      <div className="my-10 w-full">
        <Typography variant="h3" className="mb-3 px-2">
          트렌딩
        </Typography>
        <div className="grid w-full grid-flow-col justify-start gap-20 overflow-x-scroll px-2 pb-5">
          {new Array(10).fill(0).map(() => (
            <div className="h-[350px] w-[300px] border-t-[1px] border-t-pointBlue shadow-md shadow-subGray" />
          ))}
        </div>
      </div>
      <div className="my-10 w-full">
        <Typography variant="h3" className="mb-3 px-2">
          최신글
        </Typography>
        <div className="grid w-full grid-flow-col justify-start gap-20 overflow-x-scroll px-2 pb-5">
          {new Array(10).fill(0).map(() => (
            <div className="h-[350px] w-[300px] border-t-[1px] border-t-pointBlue shadow-md shadow-subGray" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trendings;
