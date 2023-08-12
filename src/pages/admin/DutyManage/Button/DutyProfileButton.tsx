import React from 'react';
import { Button, Typography } from '@mui/material';
import { roleInfos } from '@mocks/DutyManageApi';
import muiTheme from '@constants/muiTheme';

interface DutyProfileButtonProps {
  roleName: string;
  badgeImage: string | undefined;
  setTooltipOpen: (open: boolean) => void;
  toggleModalOpen: () => void;
}

const ProfileName = ({ roleName }: { roleName: string }) => {
  const roleInfo = roleInfos.find((role) => role.roleName === roleName);

  return (
    <Typography sx={{ fontWeight: 600, color: 'white', display: 'flex', gap: '4px' }}>
      {roleInfo?.generation}기 {roleInfo?.rolePersonName}
    </Typography>
  );
};

const DutyProfileButton = ({ roleName, badgeImage, setTooltipOpen, toggleModalOpen }: DutyProfileButtonProps) => {
  const handleCreateRoleModalButtonClick = () => {
    setTooltipOpen(false);
    toggleModalOpen();
  };

  if (roleName === '전산관리자') {
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
      <img className="h-[100px] w-[100px]" alt={roleName} src={badgeImage} />
      <div className="flex h-12 flex-col justify-center">
        <ProfileName roleName={roleName} />
      </div>
    </Button>
  );
};

export default DutyProfileButton;
