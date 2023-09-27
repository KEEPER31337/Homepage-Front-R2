import React, { useState } from 'react';
import { Typography } from '@mui/material';
import OutlinedButton from '@components/Button/OutlinedButton';
import { MultiAutoCompleteValue } from '@components/Input/AutoComplete';
import ChangeMemberTypeModal from '../Modal/ChangeMemberTypeModal';
import memberTypes from '../memberTypes';

interface ChangeMemberTypeButtonProps {
  selectedMemberList: MultiAutoCompleteValue;
  setSelectedMemberList: React.Dispatch<React.SetStateAction<MultiAutoCompleteValue>>;
}

const ChangeMemberTypeButton = ({ selectedMemberList, setSelectedMemberList }: ChangeMemberTypeButtonProps) => {
  const [selectedTypeId, setSelectedTypeId] = useState(1);
  const [changeMemberTypeModalOpen, setChangeMemberTypeModalOpenOpen] = useState(false);

  const handleButtonClick = (typeId: number) => {
    setSelectedTypeId(typeId);
    if (selectedMemberList.length !== 0) setChangeMemberTypeModalOpenOpen(true);
  };
  return (
    <div className="flex space-x-2">
      {memberTypes.map((member) => (
        <OutlinedButton key={member.typeId} onClick={() => handleButtonClick(member.typeId)}>
          {member.color && <div className={`bg-${member.color} mr-2 h-4 w-4 rounded-full`} />}
          <Typography>{member.renderType}</Typography>
        </OutlinedButton>
      ))}
      {changeMemberTypeModalOpen && (
        <ChangeMemberTypeModal
          typeId={selectedTypeId}
          selectedMemberList={selectedMemberList}
          setSelectedMemberList={setSelectedMemberList}
          open={changeMemberTypeModalOpen}
          onClose={() => setChangeMemberTypeModalOpenOpen(false)}
        />
      )}
    </div>
  );
};

export default ChangeMemberTypeButton;
