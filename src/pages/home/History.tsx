import { Typography } from '@mui/material';
import React from 'react';

const dummyList = new Array(10).fill(0);

const History = () => {
  return (
    <div className="w-full">
      <div className="w-full pl-40">
        {dummyList.map((v, index) => (
          <div>
            <div className="flex place-items-center">
              <div className="h-7 w-7 rounded-full border-2 border-pointBlue" />
              <Typography variant="h3" className="ml-10 font-bold text-pointBlue">
                2022
              </Typography>
            </div>
            <ul
              className={`ml-3 list-disc border-pointBlue pb-16 pl-16${
                index !== dummyList.length - 1 ? ' border-l-2' : ''
              }`}
            >
              <li>
                <Typography variant="h3">코드게이트 본선 진출</Typography>
              </li>
              <li>
                <Typography variant="h3">코드게이트 본선 진출</Typography>
              </li>
              <li>
                <Typography variant="h3">코드게이트 본선 진출</Typography>
              </li>
            </ul>
          </div>
        ))}
      </div>
      <img alt="firework" src="/img/firework.png" className="w-full object-fill" />
    </div>
  );
};

export default History;
