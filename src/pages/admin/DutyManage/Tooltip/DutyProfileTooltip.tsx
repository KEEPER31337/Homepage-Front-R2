import React, { useState } from 'react';
import { Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { VscSearch } from 'react-icons/vsc';
import { MEMBER_ROLE } from '@constants/member';
import muiTheme from '@constants/muiTheme';
import useModal from '@hooks/useModal';
import { roleDutyListInfo, roles } from '@mocks/DutyManageApi';

import DescriptionRoleDutyTooltip from './DescriptionRoleDutyTooltip';
import DutyProfileButton from '../Button/DutyProfileButton';
import ChangeRolePersonModal from '../Modal/ChangeRolePersonModal';

interface DutyProfileTooltipProps {
  jobName: string;
}

const tooltipContent = (jobName?: string) => (
  <List sx={{ pl: '20px', pr: '8px', py: '2px' }}>
    {roleDutyListInfo
      .filter((duty) => duty.jobName === jobName)
      .map((data) =>
        data.roleDuty.map((duty) => (
          <ListItem key={duty.key} sx={{ px: '0px', py: '0px' }}>
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
);

const DutyProfileTooltip = ({ jobName }: DutyProfileTooltipProps) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const changeRoleModal = useModal();

  const badgeImage = roles.find((role) => role.name === jobName)?.img;
  // NOTE jobName으로는 "ROLE_전산관리자" 내려오지만, roles에는 존재하지 않습니다! 세부적인 전산관리자(프론트, 백, 인프라)만 존재합니다
  return (
    <div className="relative z-10">
      <DutyProfileButton
        jobName={jobName}
        badgeImage={badgeImage}
        setTooltipOpen={setTooltipOpen}
        toggleModalOpen={() => changeRoleModal.open()}
      />
      {jobName !== MEMBER_ROLE.전산관리자 && (
        <>
          <DescriptionRoleDutyTooltip
            title={tooltipContent(jobName)}
            open={tooltipOpen}
            onMouseEnter={() => setTooltipOpen(true)}
            onMouseLeave={() => setTooltipOpen(false)}
            arrow
          >
            <div className="absolute -right-2 top-0.5 rounded-full border border-white p-1">
              <VscSearch size={12} className="w-full" />
            </div>
          </DescriptionRoleDutyTooltip>
          {changeRoleModal.isMounted && (
            <ChangeRolePersonModal
              key={changeRoleModal.key}
              open={changeRoleModal.isOpen}
              onClose={changeRoleModal.close}
              jobName={jobName}
              badgeImage={badgeImage}
            />
          )}
        </>
      )}
    </div>
  );
};

export default DutyProfileTooltip;
