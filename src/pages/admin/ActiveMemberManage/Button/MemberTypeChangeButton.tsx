import React, { useState } from 'react';
import OutlinedButton from '@components/Button/OutlinedButton';
import { MultiAutoCompleteValue } from '@components/Input/AutoComplete';
import MemberTypeChangeModal from '../Modal/MemberTypeChangeModal';
import memberTypes, { type MemberManagementAction } from '../memberTypes';

interface MemberTypeChangeButtonProps {
  selectedMemberList: MultiAutoCompleteValue;
  setSelectedMemberList: React.Dispatch<React.SetStateAction<MultiAutoCompleteValue>>;
}

const MemberTypeChangeButton = ({ selectedMemberList, setSelectedMemberList }: MemberTypeChangeButtonProps) => {
  const [selectedAction, setSelectedAction] = useState<MemberManagementAction | null>(null);

  const handleButtonClick = (action: MemberManagementAction) => {
    if (selectedMemberList.length !== 0) setSelectedAction(action);
  };
  return (
    <div className="mt-2 flex h-fit w-full flex-wrap items-start justify-end gap-2">
      {memberTypes.map((member) => (
        <OutlinedButton
          key={member.typeId}
          onClick={() => handleButtonClick({ kind: 'changeType', memberType: member })}
          className="w-36"
        >
          <div className={`${member.colorClassName} mr-2 h-4 w-4 rounded-full`} />
          {member.renderType}
        </OutlinedButton>
      ))}
      <OutlinedButton onClick={() => handleButtonClick({ kind: 'delete' })} className="w-36">
        탈퇴
      </OutlinedButton>
      {selectedAction && (
        <MemberTypeChangeModal
          action={selectedAction}
          selectedMemberList={selectedMemberList}
          setSelectedMemberList={setSelectedMemberList}
          open
          onClose={() => setSelectedAction(null)}
        />
      )}
    </div>
  );
};

export default MemberTypeChangeButton;
