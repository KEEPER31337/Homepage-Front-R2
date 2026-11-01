import React, { useState } from 'react';
import { SelectChangeEvent } from '@mui/material';
import { useDeleteSeminarMutation, useGetSeminarListQuery } from '@api/seminarApi';
import ActionModal from '@components/Modal/ActionModal';
import Selector from '@components/Selector/Selector';

interface DeleteSeminarModalProps {
  open: boolean;
  onClose: () => void;
}

const DeleteSeminarModal = ({ open, onClose }: DeleteSeminarModalProps) => {
  const { data: seminarList } = useGetSeminarListQuery();
  const { mutate: deleteSeminar } = useDeleteSeminarMutation();
  const [selectedSeminarId, setSelectedSeminarId] = useState<number | null>(null);

  // 사용자가 직접 선택하기 전까지는 목록의 첫 번째 세미나를 기본값으로 사용합니다.
  const seminarId = selectedSeminarId ?? Number(seminarList?.[0]?.id ?? 0);

  const handleDeleteSeminarButtonClick = () => {
    deleteSeminar(seminarId, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const handleSeminarChange = (event: SelectChangeEvent<unknown>) => {
    setSelectedSeminarId(Number(event.target.value));
  };

  return (
    <ActionModal
      open={open}
      onClose={onClose}
      title="세미나 삭제"
      actionButtonName="삭제"
      onActionButonClick={handleDeleteSeminarButtonClick}
    >
      <div className="flex justify-center">
        <Selector
          label="세미나"
          className="w-52"
          value={seminarId}
          options={
            seminarList?.map((seminar) => ({
              id: seminar.id,
              content: seminar.name,
            })) || []
          }
          onChange={handleSeminarChange}
        />
      </div>
    </ActionModal>
  );
};

export default DeleteSeminarModal;
