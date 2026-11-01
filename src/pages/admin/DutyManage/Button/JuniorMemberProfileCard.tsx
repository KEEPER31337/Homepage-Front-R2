import React from 'react';
import { ExecutiveInfo } from '@api/dto';
import useModal from '@hooks/useModal';
import { roles } from '@mocks/DutyManageApi';
import ChangeJuniorMemberRoleModal from '../Modal/ChangeJuniorMemberRoleModal';
import DutyProfileButton from './DutyProfileButton';

interface JuniorMemberProfileCardProps {
  assignment?: ExecutiveInfo;
  juniorAssignments: ExecutiveInfo[];
}

const JuniorMemberProfileCard = ({ assignment, juniorAssignments }: JuniorMemberProfileCardProps) => {
  const changeRoleModal = useModal();
  const badgeImage = roles.find((role) => role.name === assignment?.jobName)?.img;

  return (
    <div className="relative z-10">
      <DutyProfileButton
        jobName={assignment?.jobName}
        badgeImage={badgeImage}
        setTooltipOpen={() => undefined}
        toggleModalOpen={() => changeRoleModal.open()}
        executiveInfo={assignment ?? null}
        emptyRoleName="부원"
      />
      {changeRoleModal.isMounted && (
        <ChangeJuniorMemberRoleModal
          key={changeRoleModal.key}
          open={changeRoleModal.isOpen}
          onClose={changeRoleModal.close}
          currentAssignment={assignment}
          juniorAssignments={juniorAssignments}
        />
      )}
    </div>
  );
};

export default JuniorMemberProfileCard;
