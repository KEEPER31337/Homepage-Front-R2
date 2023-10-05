import React from 'react';
import { Typography } from '@mui/material';
import { StudyInfo } from '@api/dto';
import { useDeleteStudyMutation } from '@api/studyApi';
import ActionModal from '@components/Modal/ActionModal';

interface StudyDeleteModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  study: StudyInfo;
}

const StudyDeleteModal = ({ study, open, setOpen }: StudyDeleteModalProps) => {
  const { mutate: deleteStudy } = useDeleteStudyMutation();

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteStudy = () => {
    deleteStudy(
      { studyId: study.studyId },
      {
        onSuccess: () => {
          handleClose();
        },
      },
    );
  };

  return (
    <ActionModal
      open={open}
      onClose={handleClose}
      title="스터디 삭제"
      modalWidth="xs"
      actionButtonName="삭제"
      onActionButonClick={handleDeleteStudy}
    >
      <Typography>{study?.title} 스터디를 삭제하시겠습니까?</Typography>
    </ActionModal>
  );
};

export default StudyDeleteModal;
