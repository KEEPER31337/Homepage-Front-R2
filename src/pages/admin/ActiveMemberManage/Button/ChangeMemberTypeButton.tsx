import React, { useState } from 'react';
import { Typography, useMediaQuery, useTheme } from '@mui/material';
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

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleButtonClick = (typeId: number) => {
    setSelectedTypeId(typeId);
    if (selectedMemberList.length !== 0) setChangeMemberTypeModalOpenOpen(true);
  };
  return (
    <div className="mt-2 flex w-full flex-wrap justify-end space-x-1 sm:mt-0 sm:space-x-2">
      {memberTypes.map((member) => (
        <OutlinedButton small={isMobile} key={member.typeId} onClick={() => handleButtonClick(member.typeId)}>
          {member.color && (
            <div className={`bg-${member.color} ${isMobile ? 'h-2 w-2' : 'h-4 w-4'} mr-2 rounded-full`} />
          )}
          {member.renderType}
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
