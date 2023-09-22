import React, { useState, useEffect } from 'react';
import { SelectChangeEvent } from '@mui/material';
import { useDeleteSeminarMutation, useGetSeminarListQuery } from '@api/seminarApi';
import ActionModal from '@components/Modal/ActionModal';
import Selector from '@components/Selector/Selector';

interface DeleteSeminarModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteSeminarModal = ({ open, setOpen }: DeleteSeminarModalProps) => {
  const { data: seminarList } = useGetSeminarListQuery();
  const { mutate: deleteSeminar, data: aaa } = useDeleteSeminarMutation();
  const [seminarId, setSeminarId] = useState(0);

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteSeminarButtonClick = () => {
    deleteSeminar(seminarId, {
      onSuccess: () => {
        console.log(aaa);
        handleClose();
      },
    });
  };

  const handleSeminarChange = (event: SelectChangeEvent<unknown>) => {
    setSeminarId(Number(event.target.value));
  };

  useEffect(() => {
    setSeminarId(Number(seminarList?.at(-1)?.id));
  }, [seminarList]);

  return (
    <ActionModal
      open={open}
      onClose={handleClose}
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
