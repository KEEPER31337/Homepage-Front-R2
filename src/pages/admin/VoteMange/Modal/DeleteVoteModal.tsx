import React from 'react';
import { toast } from 'react-hot-toast';

import { useDeleteVoteMutation } from '@api/voteApi';
import { AdminVoteListItem } from '@api/voteDto';
import ActionModal from '@components/Modal/ActionModal';

interface DeleteVoteModalProps {
  vote: Pick<AdminVoteListItem, 'id' | 'title'> | null;
  onClose: () => void;
}

interface VoteDeletionErrorResponse {
  response?: {
    data?: {
      message?: unknown;
    };
  };
}

const getVoteDeletionErrorMessage = (error: unknown) => {
  const message = (error as VoteDeletionErrorResponse)?.response?.data?.message;

  return typeof message === 'string' && message.trim() ? message : '투표 삭제에 실패했습니다.';
};

const DeleteVoteModal = ({ vote, onClose }: DeleteVoteModalProps) => {
  const { mutate: deleteVote, isPending: isVoteDeletionPending } = useDeleteVoteMutation();

  const handleDelete = () => {
    if (!vote || isVoteDeletionPending) return;

    deleteVote(vote.id, {
      onSuccess: () => {
        toast.success('투표를 삭제했습니다.');
        onClose();
      },
      onError: (error) => {
        toast.error(getVoteDeletionErrorMessage(error));
      },
    });
  };

  return (
    <ActionModal
      open={Boolean(vote)}
      onClose={onClose}
      modalWidth="xs"
      title="투표 삭제"
      cancelButtonDisabled={isVoteDeletionPending}
      actionButtonDisabled={!vote || isVoteDeletionPending}
      actionButtonName={isVoteDeletionPending ? '삭제 중...' : '삭제'}
      onActionButonClick={handleDelete}
    >
      <span className="text-pointBlue">{vote?.title}</span> 투표를 삭제하시겠습니까?
      <p className="mt-2 text-sm text-white/60">안건, 참여 기록 및 투표 결과도 함께 삭제됩니다.</p>
    </ActionModal>
  );
};

export default DeleteVoteModal;
