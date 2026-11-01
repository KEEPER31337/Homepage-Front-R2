import React from 'react';
import { Typography } from '@mui/material';
import { StudyInfo } from '@api/dto';
import { useDeleteStudyMutation } from '@api/studyApi';
import ActionModal from '@components/Modal/ActionModal';

interface StudyDeleteModalProps {
  open: boolean;
  onClose: () => void;
  study: StudyInfo;
}

const StudyDeleteModal = ({ study, open, onClose }: StudyDeleteModalProps) => {
  const { mutate: deleteStudy } = useDeleteStudyMutation();

  const handleDeleteStudy = () => {
    deleteStudy(
      { studyId: study.studyId },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };

  return (
    <ActionModal
      open={open}
      onClose={onClose}
      title="스터디 삭제"
      modalWidth="xs"
      actionButtonName="삭제"
      onActionButonClick={handleDeleteStudy}
    >
      <Typography>{study.title} 스터디를 삭제하시겠습니까?</Typography>
    </ActionModal>
  );
};

export default StudyDeleteModal;
