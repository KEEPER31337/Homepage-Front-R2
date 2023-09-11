import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { useAddMeritTypeMutation, useEditMeritTypeMutation } from '@api/meritApi';
import StandardInput from '@components/Input/StandardInput';
import ActionModal from '@components/Modal/ActionModal';
import Selector from '@components/Selector/Selector';
import RadioButton from '../Input/RadioButton';

type RewordOrPenalty = 'reword' | 'penalty';

export type MeritTypeModalInfo = {
  id: number;
  type: RewordOrPenalty;
  score: number;
  reason: string;
};

const baseMeritTypeInfo: MeritTypeModalInfo = {
  id: 0,
  type: 'reword',
  score: 0,
  reason: '',
};

export const meritTypeChangeEnable = (meritTypeId: number) => {
  const disabledMeritTypeId = [0, 2, 3];
  return !disabledMeritTypeId.includes(meritTypeId);
};

interface EditMeritTypeModalProps {
  status: MeritTypeModalInfo | null;
  onClose: () => void;
}

interface AddMeritTypeModalProps {
  status: boolean;
  onClose: () => void;
}

const SettingMeritTypeModal = <T extends 'add' | 'edit'>({
  status,
  onClose,
}: T extends 'add' ? AddMeritTypeModalProps : EditMeritTypeModalProps) => {
  const isAdd = typeof status === 'boolean';

  const [meritTypeInfo, setMeritTypeInfo] = useState<MeritTypeModalInfo>({ ...baseMeritTypeInfo });

  const { mutate: addMeritTypeMutation } = useAddMeritTypeMutation();
  const { mutate: editMeritTypeMutation } = useEditMeritTypeMutation();

  const reset = () => {
    setMeritTypeInfo({ ...baseMeritTypeInfo });
  };

  const validate = () => {
    if (meritTypeInfo.score === 0 || meritTypeInfo.reason === '') return false;
    if (isAdd) {
      return meritTypeInfo.id === 0;
    }
    return meritTypeChangeEnable(meritTypeInfo.id);
  };

  const handleSetMeritTypeButtonClick = () => {
    const isValid = validate();
    if (isValid) {
      const onSuccess = () => {
        onClose();
        reset();
      };

      if (isAdd) {
        addMeritTypeMutation(
          {
            score: meritTypeInfo.score,
            reason: meritTypeInfo.reason,
          },
          {
            onSuccess,
          },
        );
      } else {
        editMeritTypeMutation(
          {
            meritTypeId: meritTypeInfo.id,
            score: meritTypeInfo.score,
            reason: meritTypeInfo.reason,
          },
          {
            onSuccess,
          },
        );
      }
    }
  };

  useEffect(() => {
    if (!isAdd && status) {
      setMeritTypeInfo(status);
    }
  }, [status]);

  return (
    <ActionModal
      open={isAdd ? status : status !== null}
      onClose={onClose}
      title={isAdd ? '사유 추가' : '사유 수정'}
      modalWidth="xs"
      actionButtonName={isAdd ? '추가' : '수정'}
      onActionButonClick={handleSetMeritTypeButtonClick}
      actionButtonDisabled={!validate()}
    >
      <div className="grow space-y-5">
        <RadioButton
          value={meritTypeInfo.type}
          horizontal
          onChange={(e) => {
            setMeritTypeInfo((prev) => ({ ...prev, type: e.target.value as RewordOrPenalty, score: 0 }));
          }}
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
              setMeritTypeInfo((prev) => ({ ...prev, score: Number(e.target.value) }));
            }}
            options={Array.from(Array(11).keys()).map((i) => ({
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
    </ActionModal>
  );
};

export default SettingMeritTypeModal;
