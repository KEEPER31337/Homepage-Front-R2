import { Typography } from '@material-tailwind/react';
import React from 'react';

const Trendings = () => {
  return (
    <div className="flex w-full flex-col bg-mainBlack px-20">
      <div className="my-10 flex w-full flex-col">
        <Typography variant="h3" className="mb-3 px-2">
          트렌딩
        </Typography>
        <div className="grid w-full grid-flow-col justify-start gap-20 overflow-x-scroll px-2 pb-5">
          {new Array(10).fill(0).map(() => (
            <div className="h-[350px] w-[300px] border-t-[1px] border-t-pointBlue shadow-md shadow-subGray hover:shadow-pointBlue">
              <img alt="thumbnail" className="h-1/2 w-full" src="/img/sample.png" />
              <div className="px-5">
                <Typography variant="h7" className="py-2 text-yellow-700">
                  기술문서
                </Typography>
                <Typography variant="h5" className="mb-2">
                  [2022년도 기술문서]기술문...
                </Typography>
                <div className="mt-5 flex flex-row">
                  <img alt="profile" src="/img/profile.png" className="mx-3 w-10 object-cover" />
                  <div className="flex flex-col">
                    <Typography variant="h6">송세연</Typography>
                    <Typography variant="h7">1년전 . 58 watch</Typography>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="my-10 w-full">
        <Typography variant="h3" className="mb-3 px-2">
          최신글
        </Typography>
      </div>
    </div>
  );
};

export default Trendings;
