import React from 'react';
import { Typography } from '@mui/material';
import OutlinedButton from '@components/Button/OutlinedButton';
import { MultiAutoCompleteValue } from '@components/Input/AutoComplete';

interface ChangeMemberTypeButtonProps {
  memberTypeList: Array<{
    type: string;
    renderType: string;
    typeId: number;
    color?: string;
  }>;
  selectedMemberList: MultiAutoCompleteValue;
}

const ChangeMemberTypeButton = ({ memberTypeList, selectedMemberList }: ChangeMemberTypeButtonProps) => {
  return (
    <div className="flex space-x-2">
      {memberTypeList.map((member) => (
        <OutlinedButton
          key={member.typeId}
          onClick={() => {
            console.log(member.typeId, '선택한 인원 : ', selectedMemberList);
          }}
        >
          {member.color && <div className={`bg-${member.color} mr-2 h-4 w-4 rounded-full`} />}
          <Typography>{member.renderType}</Typography>
        </OutlinedButton>
      ))}
    </div>
  );
};

export default ChangeMemberTypeButton;
