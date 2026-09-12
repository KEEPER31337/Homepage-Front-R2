import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import { useEditMemberTypeMutation, useDeleteMemberMutation } from '@api/memberApi';
import { MultiAutoCompleteValue } from '@components/Input/AutoComplete';
import ActionModal from '@components/Modal/ActionModal';
import type { MemberManagementAction } from '../memberTypes';

interface MemberTypeChangeModalProps {
  open: boolean;
  onClose: () => void;
  action: MemberManagementAction;
  selectedMemberList: MultiAutoCompleteValue;
  setSelectedMemberList: React.Dispatch<React.SetStateAction<MultiAutoCompleteValue>>;
}

const MemberTypeChangeModal = ({
  open,
  onClose,
  action,
  selectedMemberList,
  setSelectedMemberList,
}: MemberTypeChangeModalProps) => {
  const { mutate: editMemberTypeMutation, isPending: isTypeChangePending } = useEditMemberTypeMutation();
  const { mutate: deleteMemberMutation, isPending: isDeletePending } = useDeleteMemberMutation();
  const isDeleting = action.kind === 'delete';
  const isPending = isTypeChangePending || isDeletePending;

  const handleMutationSuccess = () => {
    onClose();
    setSelectedMemberList([]);
  };
  const handleButtonClick = () => {
    if (isPending || selectedMemberList.length === 0) return;
    const memberIds = selectedMemberList.map((item) => item.value as number);

    if (action.kind === 'delete') {
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
          typeId: action.memberType.typeId,
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
      title={isDeleting ? '회원 탈퇴' : '회원 타입 변경'}
      actionButtonName={isDeleting ? '탈퇴' : '변경'}
      cancelButtonDisabled={isPending}
      actionButtonDisabled={isPending || selectedMemberList.length === 0}
      onActionButonClick={handleButtonClick}
    >
      <div className="space-y-5">
        <Typography>
          총 <span className={isDeleting ? 'text-subRed' : 'text-pointBlue'}>{selectedMemberList.length}</span>
          명을{' '}
          {action.kind === 'delete' ? (
            <>
              <span className="text-subRed">탈퇴(삭제)</span> 처리 하시겠습니까?
            </>
          ) : (
            <>
              <span className="text-pointBlue">{action.memberType.renderType}</span> 타입으로 변경하시겠습니까?
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
