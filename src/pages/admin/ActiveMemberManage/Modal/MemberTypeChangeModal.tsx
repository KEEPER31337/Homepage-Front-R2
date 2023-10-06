import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import { useEditMemberTypeMutation, useDeleteMemberMutation } from '@api/memberApi';
import { MultiAutoCompleteValue } from '@components/Input/AutoComplete';
import ActionModal from '@components/Modal/ActionModal';
import memberTypes from '../memberTypes';

interface MemberTypeChangeModalProps {
  open: boolean;
  onClose: () => void;
  typeId: number;
  selectedMemberList: MultiAutoCompleteValue;
  setSelectedMemberList: React.Dispatch<React.SetStateAction<MultiAutoCompleteValue>>;
}

const MemberTypeChangeModal = ({
  open,
  onClose,
  typeId,
  selectedMemberList,
  setSelectedMemberList,
}: MemberTypeChangeModalProps) => {
  const { mutate: editMemberTypeMutation } = useEditMemberTypeMutation();
  const { mutate: deleteMemberMutation } = useDeleteMemberMutation();

  const renderTypeName = () => {
    return memberTypes.find((memberType) => memberType.typeId === typeId)?.renderType;
  };

  const isQuitType = () => {
    if (renderTypeName() === '탈퇴') return true;
    return false;
  };

  const handleMutationSuccess = () => {
    onClose();
    setSelectedMemberList([]);
  };
  const handleButtonClick = () => {
    const memberIds = selectedMemberList.map((item) => item.value as number);

    if (isQuitType()) {
      deleteMemberMutation(
        {
          memberIds,
        },
        {
          onSuccess: handleMutationSuccess,
        },
      );
    } else {
      editMemberTypeMutation(
        {
          memberIds,
          typeId,
        },
        {
          onSuccess: handleMutationSuccess,
        },
      );
    }
  };

  return (
    <ActionModal
      open={open}
      onClose={onClose}
      title={`${isQuitType() ? '회원 탈퇴' : '회원 타입 변경'} `}
      actionButtonName={`${isQuitType() ? '탈퇴' : '변경'} `}
      onActionButonClick={handleButtonClick}
    >
      <div className="space-y-5">
        <Typography>
          총 <span className={`${isQuitType() ? 'text-subRed' : 'text-pointBlue'}`}>{selectedMemberList.length}</span>
          명을{' '}
          {isQuitType() ? (
            <>
              <span className="text-subRed">탈퇴(삭제)</span> 처리 하시겠습니까?
            </>
          ) : (
            <>
              <span className="text-pointBlue">{renderTypeName()}</span> 타입으로 변경하시겠습니까?
            </>
          )}
        </Typography>
        <List className={`${selectedMemberList.length > 3 ? 'h-[185px]' : 'h-fit'} flex flex-col !overflow-auto !p-0`}>
          {selectedMemberList.map((member) => (
            <ListItem key={member.value as number}>
              <ListItemText primary={member.label} />
            </ListItem>
          ))}
        </List>
      </div>
    </ActionModal>
  );
};

export default MemberTypeChangeModal;
