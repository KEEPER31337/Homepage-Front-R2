import React, { useState, useReducer } from 'react';
import { Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { roleDutyListInfo, roles } from '@mocks/DutyManageApi';

import DescriptionRoleDutyTooltip from './DescriptionRoleDutyTooltip';
import DutyProfileButton from '../Button/DutyProfileButton';
import ChangeRolePersonModal from '../Modal/ChangeRolePersonModal';

interface DutyProfileTooltipProps {
  roleName: string;
}

const DutyProfileTooltip = ({ roleName }: DutyProfileTooltipProps) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [modalOpen, toggleModalOpen] = useReducer((prev) => !prev, false);

  let badgeImage;
  if (roleName === 'FRONT' || roleName === 'BACK' || roleName === 'INFRA') {
    badgeImage = roles.filter((role) => role.name === '전산관리자')[0].img;
  } else {
    badgeImage = roles.filter((role) => role.name === roleName)[0].img;
  }
  const modalInfo = { name: roleName, badge: badgeImage };

  /* button hover 했을 시 나오는 문장 */
  const tooltipContent = (
    <List sx={{ px: '8px', py: '16px' }}>
      {roleDutyListInfo
        .filter((duty) => duty.roleName === roleName)
        .map((data) =>
          data.roleDuty.map((duty) => (
            <ListItem key={duty.key} sx={{ px: '0px', py: '2px', alignItems: 'start' }}>
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
                <div className="h-2 w-2 rounded-full border-2 border-pointBlue" />
              </ListItemIcon>
              {/* fontWeight: 600 = semi-bold */}
              <Typography sx={{ fontWeight: 600, color: 'white' }}>{duty.content}</Typography>
            </ListItem>
          )),
        )}
    </List>
  );

  return (
    <DescriptionRoleDutyTooltip
      title={roleName !== '전산관리자' ? tooltipContent : null}
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
