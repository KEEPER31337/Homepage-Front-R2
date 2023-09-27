import React from 'react';
import { List, ListItemIcon, ListItem, ListItemButton, Typography } from '@mui/material';
import { useEditMemberTypeMutation } from '@api/memberApi';
import { MultiAutoCompleteValue } from '@components/Input/AutoComplete';
import ActionModal from '@components/Modal/ActionModal';
import memberTypes from '../memberTypes';

interface ChangeMemberTypeButtonProps {
  open: boolean;
  onClose: () => void;
  typeId: number;
  selectedMemberList: MultiAutoCompleteValue;
  setSelectedMemberList: React.Dispatch<React.SetStateAction<MultiAutoCompleteValue>>;
}

const ChangeMemberTypeModal = ({
  open,
  onClose,
  typeId,
  selectedMemberList,
  setSelectedMemberList,
}: ChangeMemberTypeButtonProps) => {
  const { mutate: editMemberTypeMutation } = useEditMemberTypeMutation();

  const handleButtonClick = () => {
    const memberIds = selectedMemberList.map((item) => item.value as number);
    editMemberTypeMutation(
      {
        memberIds,
        typeId,
      },
      {
        onSuccess: () => {
          onClose();
          setSelectedMemberList([]);
        },
      },
    );
  };

  const renderTypeName = () => {
    return memberTypes.find((memberType) => memberType.typeId === typeId)?.renderType;
  };

  return (
    <ActionModal
      open={open}
      onClose={onClose}
      title="회원 타입 변경"
      actionButtonName="변경"
      onActionButonClick={() => {
        handleButtonClick();
      }}
    >
      <div className="space-y-5">
        <Typography>
          총{' '}
          <span className={`${renderTypeName() === '탈퇴' ? 'text-subRed' : 'text-pointBlue'}`}>
            {selectedMemberList.length}
          </span>
          명을{' '}
          <span className={`${renderTypeName() === '탈퇴' ? 'text-subRed' : 'text-pointBlue'}`}>
            {renderTypeName()}
          </span>{' '}
          타입으로 변경하시겠습니까?
        </Typography>
        <List className={`${selectedMemberList.length > 3 ? 'h-[185px]' : 'h-fit'} flex flex-col !overflow-auto !p-0`}>
          <ListItem className="flex flex-col" disablePadding>
            {selectedMemberList.map((member) => (
              <ListItemButton key={member.value as number} className="w-full">
                <ListItemIcon className="items-center">
                  <Typography className="!text-small sm:!text-paragraph">{member.label}</Typography>
                </ListItemIcon>
              </ListItemButton>
            ))}
          </ListItem>
        </List>
      </div>
    </ActionModal>
  );
};

export default ChangeMemberTypeModal;
