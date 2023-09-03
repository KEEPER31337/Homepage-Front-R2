import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { useEditMeritTypeMutation } from '@api/meritApi';
import StandardInput from '@components/Input/StandardInput';
import ActionModal from '@components/Modal/ActionModal';
import Selector from '@components/Selector/Selector';
import RadioButton from '../Input/RadioButton';

type RewordOrPenalty = 'reword' | 'penalty';

export type EditMeritTypeInfo = {
  id: number;
  type: RewordOrPenalty;
  score: number;
  reason: string;
};

export const meritTypeChangeEnable = (meritTypeId: number) => {
  const disabledMeritTypeId = [0, 2, 3];
  return !disabledMeritTypeId.includes(meritTypeId);
};

interface EditMeritTypeModalProps {
  meritType: EditMeritTypeInfo | null;
  onClose: () => void;
}

const EditMeritTypeModal = ({ meritType, onClose }: EditMeritTypeModalProps) => {
  const [meritTypeInfo, setMeritTypeInfo] = useState<EditMeritTypeInfo>({
    id: 0,
    type: 'reword',
    score: 0,
    reason: '',
  });

  const { mutate: editMeritTypeMutation } = useEditMeritTypeMutation();

  const reset = () => {
    setMeritTypeInfo({
      id: 0,
      type: 'reword',
      score: 0,
      reason: '',
    });
  };

  const validate = () => {
    return meritTypeInfo.score !== 0 && meritTypeInfo.reason !== '' && meritTypeChangeEnable(meritTypeInfo.id);
  };

  const handleEditMeritTypeButtonClick = () => {
    const isValid = validate();
    if (isValid) {
      editMeritTypeMutation(
        {
          meritTypeId: meritTypeInfo.id,
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

  useEffect(() => {
    if (meritType) {
      setMeritTypeInfo(meritType);
    }
  }, [meritType]);

  return (
    <ActionModal
      open={meritType !== null}
      onClose={onClose}
      title="사유 수정"
      modalWidth="xs"
      actionButtonName="추가"
      onActionButonClick={handleEditMeritTypeButtonClick}
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

export default EditMeritTypeModal;
