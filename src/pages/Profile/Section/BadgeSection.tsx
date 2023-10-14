import React, { useEffect, useState } from 'react';
import { Tooltip } from '@mui/material';
import { Role, RoleInfo } from '@api/dto';
import { roles, types } from '@constants/badge';

interface FollowListProps {
  memberType: string;
  memberJobs: Role[];
}

const BadgeSection = ({ memberType, memberJobs }: FollowListProps) => {
  const [MemberJobInfo, setMemberJobInfo] = useState<RoleInfo[]>([]);

  useEffect(() => {
    const updatedMemberJobInfo = memberJobs
      .filter((job) => job !== 'ROLE_회원' && job !== 'ROLE_출제자')
      .map((job) => {
        const filteredRole = roles.find((role) => role.name === job);
        return {
          name: filteredRole?.name,
          img: filteredRole?.img,
        };
      });
    setMemberJobInfo(updatedMemberJobInfo as RoleInfo[]);
  }, [memberType, memberJobs]);

  return (
    <div className="flex h-8 flex-wrap items-center space-x-2 overflow-y-auto md:h-10">
      {MemberJobInfo.map((job: RoleInfo) => (
        <Tooltip key={job.name} title={job.name.replace('ROLE_', '')} placement="top">
          <img src={job.img} alt="" className="h-8 w-8 md:h-10 md:w-10" />
        </Tooltip>
      ))}
      {memberType !== '비회원' && (
        <Tooltip title={memberType} placement="top">
          <img src={types[memberType]} alt="" className="h-8 w-8 md:h-10 md:w-10" />
        </Tooltip>
      )}
    </div>
  );
};

export default BadgeSection;
