import React, { useState } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
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

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleButtonClick = (typeId: number) => {
    setSelectedTypeId(typeId);
    if (selectedMemberList.length !== 0) setMemberTypeChangeModalOpenOpen(true);
  };
  return (
    <div className="mt-2 flex w-full flex-wrap justify-end space-x-[2px] sm:mt-1 sm:space-x-2">
      {memberTypes.map((member) => (
        <OutlinedButton small={isMobile} key={member.typeId} onClick={() => handleButtonClick(member.typeId)}>
          {member.color && (
            <div className={`bg-${member.color} ${isMobile ? 'h-2 w-2' : 'h-4 w-4'} mr-2 rounded-full`} />
          )}
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
