import React from 'react';
import PageTitle from '@components/Typography/PageTitle';

import DutyProfileButton from './Button/DutyProfileButton';

const roleNameArray = ['학술부장', '대외부장', '전산관리자', '서기', '사서', '총무'];

const CreateMiddleBar = () => {
  return (
    <div className="relative w-full">
      <div className="h-14 w-0"> </div>
      <div className="absolute right-1/2 bottom-[66.5px] h-4 w-4 translate-x-1/2 rounded-full bg-pointBlue"> </div>
      <div className="absolute bottom-[14.5px] right-1/2 h-16 w-0 translate-x-1/2 border-2 border-pointBlue"> </div>
      <div className="absolute right-[8.8%] bottom-[14.5px] h-0 w-[83%] border-2 border-pointBlue"> </div>
      <div className="flex w-full flex-row justify-around">
        {roleNameArray.map(() => (
          <div className="flex h-8 w-8 place-items-center justify-center rounded-full border-2 border-pointBlue">
            <div className="h-4 w-4 rounded-full bg-pointBlue"> </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CreateViceChairman = () => {
  return (
    <div className="relative w-full">
      <div className="absolute bottom-0 left-[50%] h-48 w-1/2">
        <div className="absolute right-[84%] bottom-1/2 h-4 w-4 translate-x-1/2 translate-y-1/2 rounded-full bg-pointBlue">
          {' '}
        </div>
        <div className="absolute bottom-1/2 left-[16%] h-0 w-[20%] translate-y-1/2 border-2 border-pointBlue"> </div>
        <div className="absolute right-[64%] bottom-1/2 h-8 w-8 translate-x-1/2 translate-y-1/2">
          <div className="absolute right-1/2 bottom-1/2 h-8 w-8 translate-x-1/2 translate-y-1/2 rounded-full border-2 border-pointBlue">
            <div className="absolute right-1/2 bottom-1/2 h-4 w-4 translate-x-1/2 translate-y-1/2 rounded-full bg-pointBlue">
              {' '}
            </div>
          </div>
        </div>
        <div className="absolute left-[40%]">
          <DutyProfileButton roleName="부회장" />
        </div>
      </div>
    </div>
  );
};

const DutyManage = () => {
  return (
    <div>
      <PageTitle>직책관리</PageTitle>
      <div className="flex flex-col items-center">
        <DutyProfileButton roleName="회장" />
        <CreateViceChairman />
        <CreateMiddleBar />
        <div className="mt-10 flex w-full flex-row items-start justify-around">
          {roleNameArray.map((roleName) => (
            <DutyProfileButton roleName={roleName} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DutyManage;
