import React, { useState, useReducer } from 'react';
import { Button, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { roleDutyListInfo, roles, roleInfos } from '@mocks/DutyManageApi';

import DiscriptionRoleDutyTooltip from '../Tooltip/DescriptionRoleDutyTooltip';
import ChangeRolePersonModal from '../Modal/ChangeRolePersonModal';

interface DutyProfileButtonProps {
  roleName: string;
}

const ProfileName = ({ roleName }: { roleName: string }) => {
  const roleInfo = roleInfos.filter((role) => role.roleName === roleName);
  const sortedRoleInfo: { roleName: string; rolePersonName: string; generation: string; front: boolean }[] =
    roleInfo.sort((a, b) => {
      if (a?.front === true) return -1;
      if (b?.front === true) return 1;
      return 0;
    });

  if (roleName === '전산관리자') {
    return (
      <>
        <Typography sx={{ fontWeight: 600, color: 'white', display: 'flex', gap: '4px' }}>
          <p className="text-pointBlue">FRONT</p>
          {sortedRoleInfo[0].generation}기 {sortedRoleInfo[0].rolePersonName}
        </Typography>
        <Typography sx={{ fontWeight: 600, color: 'white', display: 'flex', gap: '4px' }}>
          <p className="text-pointBlue">BACK</p>
          {sortedRoleInfo[1].generation}기 {sortedRoleInfo[1].rolePersonName}
        </Typography>
      </>
    );
  }
  return (
    <Typography sx={{ fontWeight: 600, color: 'white', display: 'flex', gap: '4px' }}>
      {sortedRoleInfo[0].generation}기 {sortedRoleInfo[0].rolePersonName}
    </Typography>
  );
};

const DutyProfileButton = ({ roleName }: DutyProfileButtonProps) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [modalOpen, toggleModalOpen] = useReducer((prev) => !prev, false);

  /* button hover 했을 시 나오는 문장 */
  const tooltipTitle = (
    <List sx={{ px: '8px', py: '16px' }}>
      {roleDutyListInfo
        .filter((duty) => duty.roleName === roleName)
        .map((data) =>
          data.roleDuty.map((duty) => (
            <ListItem sx={{ px: '0px', py: '2px', alignItems: 'start' }}>
              <ListItemIcon
                sx={{
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  minWidth: '0px',
                  paddingRight: '8px',
                  alignContent: 'flex-start',
                }}
              >
                {/* 문장의 제일 앞에 나오는 원 icon */}
                <div className="h-2 w-2 rounded-full border-2 border-pointBlue"> </div>
              </ListItemIcon>
              {/* fontWeight: 600 = semi-bold */}
              <Typography sx={{ fontWeight: 600, color: 'white' }}>{duty}</Typography>
            </ListItem>
          )),
        )}
    </List>
  );

  const badgeImage = roles.filter((role) => role.name === roleName)[0].img;
  const modalInfo = { name: roleName, badge: badgeImage };

  const handleRoleProfileCreateButtonClick = () => {
    setTooltipOpen(false);
    toggleModalOpen();
  };

  return (
    <DiscriptionRoleDutyTooltip
      title={tooltipTitle}
      open={tooltipOpen}
      onMouseEnter={() => setTooltipOpen(true)}
      onMouseLeave={() => setTooltipOpen(false)}
      arrow
    >
      <div>
        <Button
          onClick={handleRoleProfileCreateButtonClick}
          sx={{
            width: 'fit-content',
            display: 'flex',
            flexFlow: 'column',
            gap: '4px',
            padding: '12px 16px',
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
        <ChangeRolePersonModal open={modalOpen} toggleOpen={toggleModalOpen} modalInfo={modalInfo} />
      </div>
    </DiscriptionRoleDutyTooltip>
  );
};

export default DutyProfileButton;
