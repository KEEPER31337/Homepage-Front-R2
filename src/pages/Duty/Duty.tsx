import React, { useMemo } from 'react';
import { useGetExecutiveInfoQuery } from '@api/dutyManageApi';
import PageTitle from '@components/Typography/PageTitle';
import { isJuniorExecutiveRole, MEMBER_ROLE } from '@constants/member';
import DutyProfile from './DutyProfile';

const jobNameArray = [
  { key: 1, jobName: MEMBER_ROLE.학술부장 },
  { key: 2, jobName: MEMBER_ROLE.대외부장 },
  { key: 3, jobName: MEMBER_ROLE.전산관리자 },
  { key: 4, jobName: MEMBER_ROLE.서기 },
  { key: 5, jobName: MEMBER_ROLE.사서 },
  { key: 6, jobName: MEMBER_ROLE.총무 },
];

const ITjobNameArray = [
  { key: 1, jobName: MEMBER_ROLE.FRONT_전산관리자 },
  { key: 2, jobName: MEMBER_ROLE.BACK_전산관리자 },
  { key: 3, jobName: MEMBER_ROLE.INFRA_전산관리자 },
];

const MiddleBar = () => (
  <div className="relative w-full">
    <div className="h-14 w-0" />
    <div className="absolute bottom-[66.5px] right-1/2 h-4 w-4 translate-x-1/2 rounded-full bg-pointBlue" />
    <div className="absolute bottom-[14.5px] right-1/2 h-16 w-0 translate-x-1/2 border-2 border-pointBlue" />
    <div className="absolute bottom-[14.5px] right-[8.8%] h-0 w-[83%] border-2 border-pointBlue" />
    <div className="flex w-full flex-row justify-around">
      {jobNameArray.map((content) => (
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

const ItBar = () => (
  <div className="relative flex h-fit w-full">
    <div className="h-0 w-[24.6%]" />
    <div className="flex w-[34%] flex-row justify-between">
      {ITjobNameArray.map((data) => (
        <div key={data.key} className="h-4 w-4 rounded-full bg-pointBlue" />
      ))}
    </div>
    <div className="absolute bottom-1/2 left-1/4 h-1 w-[33%] translate-y-1/2 bg-pointBlue" />
  </div>
);

const JuniorMemberBar = () => {
  const { data: executiveInfos } = useGetExecutiveInfoQuery();
  const juniorAssignments = useMemo(
    () =>
      (executiveInfos ?? [])
        .filter((info) => isJuniorExecutiveRole(info.jobName))
        .toSorted((a, b) => a.jobId - b.jobId || a.memberId - b.memberId)
        .slice(0, jobNameArray.length),
    [executiveInfos],
  );

  return (
    <div className="mt-16 w-full">
      <div className="mb-4 text-center text-xl font-semibold text-white">부원</div>
      <div className="relative w-full">
        <div className="absolute bottom-1/2 right-[8.8%] h-0 w-[83%] translate-y-1/2 border-2 border-pointBlue" />
        <div className="flex w-full flex-row justify-around">
          {jobNameArray.map((content) => (
            <div
              key={content.key}
              className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-pointBlue bg-subBlack"
            >
              <div className="h-4 w-4 rounded-full bg-pointBlue" />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-2 flex w-full flex-row items-start justify-around">
        {jobNameArray.map((content, index) => (
          <div key={content.key} className="w-[120px]">
            {juniorAssignments[index] && (
              <DutyProfile
                jobName={juniorAssignments[index].jobName}
                executiveInfo={juniorAssignments[index]}
                showDescription={false}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const ViceChairman = () => (
  <div className="relative w-full">
    <div className="absolute bottom-0 left-[50%] h-48 w-1/2">
      <div className="absolute bottom-1/2 right-[84%] h-4 w-4 translate-x-1/2 translate-y-1/2 rounded-full bg-pointBlue" />
      <div className="absolute bottom-1/2 left-[16%] h-0 w-[20%] translate-y-1/2 border-2 border-pointBlue" />
      <div className="absolute bottom-1/2 right-[64%] h-8 w-8 translate-x-1/2 translate-y-1/2">
        <div className="absolute bottom-1/2 right-1/2 h-8 w-8 translate-x-1/2 translate-y-1/2 rounded-full border-2 border-pointBlue">
          <div className="absolute bottom-1/2 right-1/2 h-4 w-4 translate-x-1/2 translate-y-1/2 rounded-full bg-pointBlue" />
        </div>
      </div>
      <div className="absolute left-[40%] translate-y-2">
        <DutyProfile jobName={MEMBER_ROLE.부회장} />
      </div>
    </div>
  </div>
);

const Duty = () => (
  <div>
    <PageTitle>운영진</PageTitle>
    <div className="flex flex-col items-center">
      <DutyProfile jobName={MEMBER_ROLE.회장} />
      <ViceChairman />
      <MiddleBar />
      <div className="mt-2 flex w-full flex-row items-start justify-around">
        {jobNameArray.map((content) => (
          <DutyProfile key={content.key} jobName={content.jobName} />
        ))}
      </div>
      <ItBar />
      <div className="flex h-fit w-full">
        <div className="h-0 w-[17%]" />
        <div className="flex w-[49%] flex-row items-start justify-around">
          {ITjobNameArray.map((content) => (
            <DutyProfile key={content.key} jobName={content.jobName} />
          ))}
        </div>
      </div>
      <JuniorMemberBar />
    </div>
  </div>
);

export default Duty;
