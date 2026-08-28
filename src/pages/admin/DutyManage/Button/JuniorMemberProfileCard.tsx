import React, { useReducer } from 'react';
import { ExecutiveInfo } from '@api/dto';
import { roles } from '@mocks/DutyManageApi';
import ChangeJuniorMemberRoleModal from '../Modal/ChangeJuniorMemberRoleModal';
import DutyProfileButton from './DutyProfileButton';

interface JuniorMemberProfileCardProps {
  assignment?: ExecutiveInfo;
  juniorAssignments: ExecutiveInfo[];
}

const JuniorMemberProfileCard = ({ assignment, juniorAssignments }: JuniorMemberProfileCardProps) => {
  const [modalOpen, toggleModalOpen] = useReducer((prev) => !prev, false);
  const badgeImage = roles.find((role) => role.name === assignment?.jobName)?.img;

  return (
    <div className="relative z-10">
      <DutyProfileButton
        jobName={assignment?.jobName}
        badgeImage={badgeImage}
        setTooltipOpen={() => undefined}
        toggleModalOpen={toggleModalOpen}
        executiveInfo={assignment ?? null}
        emptyRoleName="부원"
      />
      <ChangeJuniorMemberRoleModal
        open={modalOpen}
        toggleOpen={toggleModalOpen}
        currentAssignment={assignment}
        juniorAssignments={juniorAssignments}
      />
    </div>
  );
};

export default JuniorMemberProfileCard;
