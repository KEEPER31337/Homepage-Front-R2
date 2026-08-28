import React, { useMemo, useState } from 'react';
import { List, ListItem, Typography } from '@mui/material';
import { VscSearch } from 'react-icons/vsc';
import { useGetExecutiveInfoQuery } from '@api/dutyManageApi';
import { ExecutiveInfo } from '@api/dto';
import { MEMBER_ROLE } from '@constants/member';
import muiTheme from '@constants/muiTheme';
import { convertJobName, roleDutyListInfo, roles } from '@mocks/DutyManageApi';
import DescriptionRoleDutyTooltip from '@pages/admin/DutyManage/Tooltip/DescriptionRoleDutyTooltip';

interface DutyProfileProps {
  jobName?: string;
  executiveInfo?: ExecutiveInfo | null;
  showDescription?: boolean;
}

const DutyProfile = ({ jobName, executiveInfo: explicitExecutiveInfo, showDescription = true }: DutyProfileProps) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const { data: executiveInfos } = useGetExecutiveInfoQuery();
  const roleName = convertJobName.find((data) => data.JobName === jobName)?.roleName;
  const executiveInfo =
    explicitExecutiveInfo === undefined
      ? executiveInfos?.find((role) => role.jobName === jobName)
      : explicitExecutiveInfo;
  const badgeImage = roles.find((role) => role.name === jobName)?.img;
  const tooltipContent = useMemo(
    () => (
      <List sx={{ pl: '20px', pr: '8px', py: '2px' }}>
        {roleDutyListInfo
          .filter((duty) => duty.jobName === jobName)
          .flatMap((data) => data.roleDuty)
          .map((duty) => (
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
          ))}
      </List>
    ),
    [jobName],
  );

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
    <div className="relative z-10 flex w-[120px] flex-col items-center gap-1 pb-1">
      <Typography variant="h3" sx={{ fontWeight: 600, color: 'white' }}>
        {roleName}
      </Typography>
      {badgeImage && <img className="h-[100px] w-[100px]" alt={jobName} src={badgeImage} />}
      <div className="flex h-12 flex-col justify-center">
        {executiveInfo && (
          <Typography sx={{ fontWeight: 600, color: 'white', display: 'flex', gap: '4px' }}>
            {executiveInfo.generation}기 {executiveInfo.realName}
          </Typography>
        )}
      </div>

      {showDescription && (
        <DescriptionRoleDutyTooltip
          title={tooltipContent}
          open={tooltipOpen}
          onMouseEnter={() => setTooltipOpen(true)}
          onMouseLeave={() => setTooltipOpen(false)}
          arrow
        >
          <div className="absolute -right-2 top-0.5 rounded-full border border-white p-1">
            <VscSearch size={12} className="w-full" />
          </div>
        </DescriptionRoleDutyTooltip>
      )}
    </div>
  );
};

export default DutyProfile;
