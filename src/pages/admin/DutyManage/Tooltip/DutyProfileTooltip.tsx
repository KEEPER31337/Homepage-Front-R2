import React, { useState, useReducer, useMemo } from 'react';
import { Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { roleDutyListInfo, roles } from '@mocks/DutyManageApi';
import muiTheme from '@constants/muiTheme';

import DescriptionRoleDutyTooltip from './DescriptionRoleDutyTooltip';
import DutyProfileButton from '../Button/DutyProfileButton';
import ChangeRolePersonModal from '../Modal/ChangeRolePersonModal';

interface DutyProfileTooltipProps {
  roleName: string;
}

const tooltipContent = (roleName: string) =>
  useMemo(
    () => (
      <List sx={{ pl: '20px', pr: '8px', py: '2px' }}>
        {roleDutyListInfo
          .filter((duty) => duty.roleName === roleName)
          .map((data) =>
            data.roleDuty.map((duty) => (
              <ListItem key={duty.key} sx={{ px: '0px', py: '0px' }}>
                {/* fontWeight: 600 = semi-bold */}
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: 'white',
                    alignItems: 'start',
                    listStyleType: 'circle',
                    display: 'list-item',
                    '&::marker': {
                      color: muiTheme.palette.primary.main,
                      fontSize: '20px',
                    },
                  }}
                >
                  {duty.content}
                </Typography>
              </ListItem>
            )),
          )}
      </List>
    ),
    [roleName],
  );

const DutyProfileTooltip = ({ roleName }: DutyProfileTooltipProps) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [modalOpen, toggleModalOpen] = useReducer((prev) => !prev, false);

  let badgeImage;
  if (roleName === 'FRONT' || roleName === 'BACK' || roleName === 'INFRA') {
    badgeImage = roles.find((role) => role.name === '전산관리자')?.img;
  } else {
    badgeImage = roles.find((role) => role.name === roleName)?.img;
  }
  const modalInfo = { name: roleName, badge: badgeImage };

  return (
    <DescriptionRoleDutyTooltip
      title={roleName !== '전산관리자' ? tooltipContent(roleName) : null}
      open={tooltipOpen}
      onMouseEnter={() => setTooltipOpen(true)}
      onMouseLeave={() => setTooltipOpen(false)}
      arrow
    >
      <div>
        <DutyProfileButton
          roleName={roleName}
          badgeImage={badgeImage}
          setTooltipOpen={setTooltipOpen}
          toggleModalOpen={toggleModalOpen}
        />
        <ChangeRolePersonModal open={modalOpen} toggleOpen={toggleModalOpen} modalInfo={modalInfo} />
      </div>
    </DescriptionRoleDutyTooltip>
  );
};

export default DutyProfileTooltip;
