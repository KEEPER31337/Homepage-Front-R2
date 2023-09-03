import React, { useState } from 'react';
import { Typography } from '@mui/material';
import { useAddMeritTypeMutation } from '@api/meritApi';
import StandardInput from '@components/Input/StandardInput';
import ActionModal from '@components/Modal/ActionModal';
import Selector from '@components/Selector/Selector';
import RadioButton from '../Input/RadioButton';

interface AddMeritTypeModalProps {
  open: boolean;
  onClose: () => void;
}

type RewordOrPenalty = 'reword' | 'penalty';

type MeritTypeInfo = {
  type: RewordOrPenalty;
  score: number;
  reason: string;
};

const AddMeritTypeModal = ({ open, onClose }: AddMeritTypeModalProps) => {
  const [meritTypeInfo, setMeritTypeInfo] = useState<MeritTypeInfo>({
    type: 'reword',
    score: 0,
    reason: '',
  });

  const { mutate: addMeritTypeMutation } = useAddMeritTypeMutation();

  const reset = () => {
    setMeritTypeInfo({
      type: 'reword',
      score: 0,
      reason: '',
    });
  };

  const validate = () => {
    return meritTypeInfo.score !== 0 && meritTypeInfo.reason !== '';
  };

  const handleAddMeritTypeButtonClick = () => {
    const isValid = validate();
    if (isValid) {
      addMeritTypeMutation(
        {
          score: meritTypeInfo.score,
          reason: meritTypeInfo.reason,
        },
        {
          onSuccess: () => {
            onClose();
            reset();
          },
        },
      );
    }
  };

  return (
    <ActionModal
      open={open}
      onClose={onClose}
      title="사유 추가"
      modalWidth="xs"
      actionButtonName="추가"
      onActionButonClick={handleAddMeritTypeButtonClick}
    >
      <div className="flex space-x-6">
        <div className="relative grow space-y-5">
          <RadioButton
            value={meritTypeInfo.type}
            horizontal
            onChange={(e) =>
              setMeritTypeInfo((prev) => ({ ...prev, type: e.target.value as RewordOrPenalty, score: 0 }))
            }
            options={[
              { id: 'reword', content: '상점' },
              { id: 'penalty', content: '벌점' },
            ]}
          />
          <div>
            <Typography>점수</Typography>
            <Selector
              className="w-full"
              value={meritTypeInfo.score}
              onChange={(e) => {
                setMeritTypeInfo((prev) => ({ ...prev, score: e.target.value as number }));
              }}
              options={Array.from({ length: 10 }, (v, i) => ({
                id: (i + 1) * (meritTypeInfo.type === 'reword' ? 1 : -1),
                content: (i + 1) * (meritTypeInfo.type === 'reword' ? 1 : -1),
              }))}
            />
          </div>
          <div>
            <Typography>사유</Typography>
            <StandardInput
              className="w-full"
              value={meritTypeInfo.reason}
              onChange={(e) => setMeritTypeInfo((prev) => ({ ...prev, reason: e.target.value }))}
            />
          </div>
        </div>
      </div>
    </ActionModal>
  );
};

export default AddMeritTypeModal;
