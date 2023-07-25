import React from 'react';
import { Button, Typography } from '@mui/material';
import { roles, roleInfos } from '@mocks/DutyManageApi';
import muiTheme from '@constants/muiTheme';

interface DutyProfileButtonProps {
  roleName: string;
  badgeImage: string;
  setTooltipOpen: (arg0: boolean) => void;
  toggleModalOpen: () => void;
}

const ProfileName = ({ roleName }: { roleName: string }) => {
  const roleInfo = roleInfos.filter((role) => role.roleName === roleName);

  return (
    <Typography sx={{ fontWeight: 600, color: 'white', display: 'flex', gap: '4px' }}>
      {roleInfo[0].generation}기 {roleInfo[0].rolePersonName}
    </Typography>
  );
};

const DutyProfileButton = ({ roleName, badgeImage, setTooltipOpen, toggleModalOpen }: DutyProfileButtonProps) => {
  const handleRoleProfileCreateButtonClick = () => {
    setTooltipOpen(false);
    toggleModalOpen();
  };

  return (
    <Button
      onClick={handleRoleProfileCreateButtonClick}
      sx={{
        width: '120px',
        display: 'flex',
        flexFlow: 'column',
        gap: '4px',
        padding: '12px 0px 4px 0px',
        '&:hover': {
          backgroundColor: muiTheme.palette.secondary.main,
        },
      }}
      disabled={roleName === '전산관리자'}
    >
      <Typography variant="h3" sx={{ fontWeight: 600, color: 'white' }}>
        {roleName}
      </Typography>
      {roleName !== '전산관리자' ? (
        <>
          <img className="h-[100px] w-[100px]" alt={roleName} src={badgeImage} />
          <div className="flex h-12 flex-col justify-center">
            <ProfileName roleName={roleName} />
          </div>
        </>
      ) : (
        <div className="mt-2 h-[160px] w-[5px] bg-gradient-to-b from-pointBlue from-50% to-subBlack to-0% bg-[length:5px_20px] bg-repeat-space" />
      )}
    </Button>
  );
};

export default DutyProfileButton;
