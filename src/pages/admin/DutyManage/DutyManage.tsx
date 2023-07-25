import React from 'react';
import PageTitle from '@components/Typography/PageTitle';

import DutyProfileTooltip from './Tooltip/DutyProfileTooltip';

const roleNameArray = [
  { key: 1, roleName: '학술부장' },
  { key: 2, roleName: '대외부장' },
  { key: 3, roleName: '전산관리자' },
  { key: 4, roleName: '서기' },
  { key: 5, roleName: '사서' },
  { key: 6, roleName: '총무' },
];

const ITRoleNameArray = [
  { key: 1, roleName: 'FRONT' },
  { key: 2, roleName: 'BACK' },
  { key: 3, roleName: 'INFRA' },
];

const CreateMiddleBar = () => {
  return (
    <div className="relative w-full">
      <div className="h-14 w-0" />
      <div className="absolute bottom-[66.5px] right-1/2 h-4 w-4 translate-x-1/2 rounded-full bg-pointBlue"> </div>
      <div className="absolute bottom-[14.5px] right-1/2 h-16 w-0 translate-x-1/2 border-2 border-pointBlue"> </div>
      <div className="absolute bottom-[14.5px] right-[8.8%] h-0 w-[83%] border-2 border-pointBlue"> </div>
      <div className="flex w-full flex-row justify-around">
        {roleNameArray.map((content) => (
          <div
            key={content.key}
            className="flex h-8 w-8 place-items-center justify-center rounded-full border-2 border-pointBlue"
          >
            <div className="h-4 w-4 rounded-full bg-pointBlue" />
          </div>
        ))}
      </div>
    </div>
  );
};

const CreateItBar = () => {
  return (
    <div className="relative flex h-fit w-full">
      <div className="h-0 w-[24.6%]" />
      <div className="flex w-[34%] flex-row justify-between">
        {ITRoleNameArray.map((data) => (
          <div key={data.key} className="h-4 w-4 rounded-full bg-pointBlue" />
        ))}
      </div>

      <div className="absolute bottom-1/2 left-1/4 h-1 w-[33%] translate-y-1/2 bg-pointBlue" />
    </div>
  );
};

const CreateViceChairman = () => {
  return (
    <div className="relative w-full">
      <div className="absolute bottom-0 left-[50%] h-48 w-1/2">
        <div className="absolute bottom-1/2 right-[84%] h-4 w-4 translate-x-1/2 translate-y-1/2 rounded-full bg-pointBlue" />
        <div className="absolute bottom-1/2 left-[16%] h-0 w-[20%] translate-y-1/2 border-2 border-pointBlue" />
        <div className="absolute bottom-1/2 right-[64%] h-8 w-8 translate-x-1/2 translate-y-1/2">
          <div className="absolute bottom-1/2 right-1/2 h-8 w-8 translate-x-1/2 translate-y-1/2 rounded-full border-2 border-pointBlue">
            <div className="absolute bottom-1/2 right-1/2 h-4 w-4 translate-x-1/2 translate-y-1/2 rounded-full bg-pointBlue" />
          </div>
        </div>
        <div className="absolute left-[40%]">
          <DutyProfileTooltip roleName="부회장" />
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
        <DutyProfileTooltip roleName="회장" />
        <CreateViceChairman />

        <CreateMiddleBar />
        <div className="mt-10 flex w-full flex-row items-start justify-around">
          {roleNameArray.map((content) => (
            <DutyProfileTooltip key={content.key} roleName={content.roleName} />
          ))}
        </div>

        <CreateItBar />
        <div className="flex h-fit w-full">
          <div className="h-0 w-[17%]" />
          <div className="flex w-[49%] flex-row items-start justify-around">
            {ITRoleNameArray.map((content) => (
              <DutyProfileTooltip key={content.key} roleName={content.roleName} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DutyManage;
