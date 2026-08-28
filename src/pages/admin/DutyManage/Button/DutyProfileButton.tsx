import React from 'react';
import { Button, Typography } from '@mui/material';
import { useGetExecutiveInfoQuery } from '@api/dutyManageApi';
import { ExecutiveInfo } from '@api/dto';
import { MEMBER_ROLE } from '@constants/member';
import muiTheme from '@constants/muiTheme';
import { convertJobName } from '@mocks/DutyManageApi';

interface DutyProfileButtonProps {
  jobName?: string;
  badgeImage?: string;
  setTooltipOpen: (open: boolean) => void;
  toggleModalOpen: () => void;
  executiveInfo?: ExecutiveInfo | null;
  emptyRoleName?: string;
}

const DutyProfileButton = ({
  jobName,
  badgeImage,
  setTooltipOpen,
  toggleModalOpen,
  executiveInfo: explicitExecutiveInfo,
  emptyRoleName,
}: DutyProfileButtonProps) => {
  const { data: executiveInfos } = useGetExecutiveInfoQuery();
  const roleName = convertJobName.find((data) => data.JobName === jobName)?.roleName ?? emptyRoleName;
  const executiveInfo =
    explicitExecutiveInfo === undefined
      ? executiveInfos?.find((role) => role.jobName === jobName)
      : explicitExecutiveInfo;

  const handleCreateRoleModalButtonClick = () => {
    setTooltipOpen(false);
    toggleModalOpen();
  };

  if (jobName === MEMBER_ROLE.전산관리자) {
    return (
      <div className="flex w-[120px] flex-col items-center">
        <Typography variant="h3" sx={{ fontWeight: 600, color: 'white' }}>
          {roleName}
        </Typography>
        <div className="mt-2 h-[160px] w-[5px] bg-gradient-to-b from-pointBlue from-50% to-subBlack to-0% bg-[length:5px_20px] bg-repeat-space" />
      </div>
    );
  }

  return (
    <Button
      onClick={handleCreateRoleModalButtonClick}
      sx={{
        width: '120px',
        display: 'flex',
        flexFlow: 'column',
        gap: '4px',
        padding: '0px 0px 4px 0px',
        '&:hover': {
          backgroundColor: muiTheme.palette.secondary.main,
        },
      }}
    >
      <Typography variant="h3" sx={{ fontWeight: 600, color: 'white' }}>
        {roleName}
      </Typography>
      {badgeImage ? (
        <img className="h-[100px] w-[100px]" alt={jobName} src={badgeImage} />
      ) : (
        <div className="flex h-[80px] w-[80px] p-4 m-4 items-center justify-center rounded border border-dashed border-subGray text-subGray">
          미배정
        </div>
      )}
      <div className="flex h-12 flex-col justify-center">
        {executiveInfo && (
          <Typography sx={{ fontWeight: 600, color: 'white', display: 'flex', gap: '4px' }}>
            {executiveInfo.generation}기 {executiveInfo.realName}
          </Typography>
        )}
      </div>
    </Button>
  );
};

export default DutyProfileButton;
