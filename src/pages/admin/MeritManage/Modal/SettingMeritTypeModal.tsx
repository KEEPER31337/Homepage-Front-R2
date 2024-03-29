import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { useAddMeritTypeMutation, useEditMeritTypeMutation } from '@api/meritApi';
import RadioButton from '@components/Input/RadioButton';
import StandardInput from '@components/Input/StandardInput';
import ActionModal from '@components/Modal/ActionModal';
import Selector from '@components/Selector/Selector';

// -10 ~ 10
const SCORE_MIN = -10;
const SCORE_RANGE = 21;

const SCORE_LIST = Array.from({ length: SCORE_RANGE }, (_, i) => i + SCORE_MIN).filter((i) => i !== 0);

export type MeritTypeModalInfo = {
  id: number;
  score: number;
  reason: string;
  isMerit: boolean;
};

const baseMeritTypeInfo: MeritTypeModalInfo = {
  id: 0,
  score: 1,
  reason: '',
  isMerit: true,
};

export const meritTypeChangeEnable = (meritTypeId: number) => {
  const disabledMeritTypeId = [0, 2, 3];
  return !disabledMeritTypeId.includes(meritTypeId);
};

interface SettingMeritTypeModalProps<Edit> {
  open: boolean;
  edit?: Edit;
  status?: Edit extends true ? MeritTypeModalInfo : null;
  onClose: () => void;
}

const SettingMeritTypeModal = <Edit extends boolean | undefined = false>({
  open,
  edit,
  status,
  onClose,
}: SettingMeritTypeModalProps<Edit>) => {
  const [meritTypeInfo, setMeritTypeInfo] = useState<MeritTypeModalInfo>({ ...baseMeritTypeInfo });

  const { mutate: addMeritTypeMutation } = useAddMeritTypeMutation();
  const { mutate: editMeritTypeMutation } = useEditMeritTypeMutation();

  const reset = () => {
    setMeritTypeInfo({ ...baseMeritTypeInfo });
  };

  const validate = () => {
    if (meritTypeInfo.score === 0 || meritTypeInfo.reason === '') return false;
    if (!edit) {
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

      if (!edit) {
        addMeritTypeMutation(
          {
            score: meritTypeInfo.score,
            reason: meritTypeInfo.reason,
            isMerit: meritTypeInfo.isMerit,
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
            isMerit: meritTypeInfo.isMerit,
          },
          {
            onSuccess,
          },
        );
      }
    }
  };

  useEffect(() => {
    if (edit && status) {
      setMeritTypeInfo(status);
    }
  }, [status]);

  return (
    <ActionModal
      open={open}
      onClose={onClose}
      title={!edit ? '사유 추가' : '사유 수정'}
      modalWidth="xs"
      actionButtonName={!edit ? '추가' : '수정'}
      onActionButonClick={handleSetMeritTypeButtonClick}
      actionButtonDisabled={!validate()}
    >
      <div className="grow space-y-5">
        <RadioButton
          value={meritTypeInfo.isMerit ? 'reword' : 'penalty'}
          horizontal
          onChange={(e) => {
            setMeritTypeInfo((prev) => ({ ...prev, isMerit: e.target.value === 'reword' }));
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
            options={SCORE_LIST.map((i) => ({
              id: i,
              content: i,
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
