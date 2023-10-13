import React, { useState } from 'react';
import { Typography } from '@mui/material';
import { useGetMemberInfoQuery } from '@api/dutyManageApi';
import { useAddMeritLogMutation, useGetMeritTypeQuery } from '@api/meritApi';
import AutoComplete, { MultiAutoCompleteValue } from '@components/Input/AutoComplete';
import ActionModal from '@components/Modal/ActionModal';
import Selector from '@components/Selector/Selector';

interface AddMeritModalProps {
  open: boolean;
  onClose: () => void;
}

type MeritInfo = {
  awarders: MultiAutoCompleteValue;
  meritTypeId: number;
};

const AddMeritModal = ({ open, onClose }: AddMeritModalProps) => {
  const [meritInfo, setMeritInfo] = useState<MeritInfo>({
    awarders: [],
    meritTypeId: 0,
  });

  const { data: members } = useGetMemberInfoQuery();
  const { data: meritTypes } = useGetMeritTypeQuery({ page: 0 });
  const { mutate: addMeritMutation } = useAddMeritLogMutation();

  const reset = () => {
    setMeritInfo({
      awarders: [],
      meritTypeId: 0,
    });
  };

  const validate = () => {
    return meritInfo.awarders.length > 0 && meritInfo.meritTypeId !== 0;
  };

  const handleAddMeritButtonClick = () => {
    const isValid = validate();
    if (isValid) {
      Promise.all(
        meritInfo.awarders.map((awarder) =>
          addMeritMutation({
            awarderId: awarder.value as number,
            meritTypeId: meritInfo.meritTypeId,
          }),
        ),
      ).then(() => {
        onClose();
        reset();
      });
    }
  };

  if (!members || !meritTypes) return null;

  return (
    <ActionModal
      open={open}
      onClose={onClose}
      title="상벌점 부여"
      modalWidth="xs"
      actionButtonName="추가"
      onActionButonClick={handleAddMeritButtonClick}
      actionButtonDisabled={!validate()}
    >
      <div className="grow space-y-5">
        <div>
          <Typography>회원</Typography>
          <AutoComplete
            className="!-z-10 w-full"
            value={meritInfo.awarders}
            multiple
            onChange={(v) => {
              setMeritInfo((prev) => ({ ...prev, awarders: v }));
            }}
            items={members?.map((member) => ({
              value: member.memberId,
              label: `${member.realName} (${member.generation})`,
              group: member.generation,
            }))}
          />
        </div>
        <div>
          <Typography>사유</Typography>
          <Selector
            className="w-full"
            value={meritInfo.meritTypeId}
            onChange={(e) => {
              setMeritInfo((prev) => ({ ...prev, meritTypeId: e.target.value as number }));
            }}
            options={meritTypes.content.map((type) => ({
              id: type.id,
              content: type.detail,
            }))}
          />
        </div>
      </div>
    </ActionModal>
  );
};

export default AddMeritModal;
