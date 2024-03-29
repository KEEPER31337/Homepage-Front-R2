import React, { useState } from 'react';
import OutlinedButton from '@components/Button/OutlinedButton';
import { MultiAutoCompleteValue } from '@components/Input/AutoComplete';
import MemberTypeChangeModal from '../Modal/MemberTypeChangeModal';
import memberTypes from '../memberTypes';

interface MemberTypeChangeButtonProps {
  selectedMemberList: MultiAutoCompleteValue;
  setSelectedMemberList: React.Dispatch<React.SetStateAction<MultiAutoCompleteValue>>;
}

const MemberTypeChangeButton = ({ selectedMemberList, setSelectedMemberList }: MemberTypeChangeButtonProps) => {
  const [selectedTypeId, setSelectedTypeId] = useState(1);
  const [memberTypeChangeModalOpen, setMemberTypeChangeModalOpenOpen] = useState(false);

  const handleButtonClick = (typeId: number) => {
    setSelectedTypeId(typeId);
    if (selectedMemberList.length !== 0) setMemberTypeChangeModalOpenOpen(true);
  };
  return (
    <div className="mt-2 flex h-fit w-full flex-wrap items-start justify-end gap-2">
      {memberTypes.map((member) => (
        <OutlinedButton key={member.typeId} onClick={() => handleButtonClick(member.typeId)} className="w-36">
          {member.color && <div className={`bg-${member.color} mr-2 h-4 w-4 rounded-full`} />}
          {member.renderType}
        </OutlinedButton>
      ))}
      {memberTypeChangeModalOpen && (
        <MemberTypeChangeModal
          typeId={selectedTypeId}
          selectedMemberList={selectedMemberList}
          setSelectedMemberList={setSelectedMemberList}
          open={memberTypeChangeModalOpen}
          onClose={() => setMemberTypeChangeModalOpenOpen(false)}
        />
      )}
    </div>
  );
};

export default MemberTypeChangeButton;
