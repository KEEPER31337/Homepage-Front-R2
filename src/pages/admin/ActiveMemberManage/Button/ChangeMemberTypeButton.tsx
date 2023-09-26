import React from 'react';
import { Typography } from '@mui/material';
import { useEditMemberTypeMutation } from '@api/memberApi';
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
  setSelectedMemberList: React.Dispatch<React.SetStateAction<MultiAutoCompleteValue>>;
}

const ChangeMemberTypeButton = ({
  memberTypeList,
  selectedMemberList,
  setSelectedMemberList,
}: ChangeMemberTypeButtonProps) => {
  const { mutate: editMemberTypeMutation } = useEditMemberTypeMutation();

  const handleButtonClick = (typeId: number) => {
    const memberIds = selectedMemberList.map((item) => item.value as number);
    editMemberTypeMutation(
      {
        memberIds,
        typeId,
      },
      {
        onSuccess: () => {
          setSelectedMemberList([]);
        },
      },
    );
  };
  return (
    <div className="flex space-x-2">
      {memberTypeList.map((member) => (
        <OutlinedButton key={member.typeId} onClick={() => handleButtonClick(member.typeId)}>
          {member.color && <div className={`bg-${member.color} mr-2 h-4 w-4 rounded-full`} />}
          <Typography>{member.renderType}</Typography>
        </OutlinedButton>
      ))}
    </div>
  );
};

export default ChangeMemberTypeButton;
