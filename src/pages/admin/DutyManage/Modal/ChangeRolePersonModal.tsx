import React, { useState } from 'react';
import { SelectChangeEvent } from '@mui/material';
import ActionModal from '@components/Modal/ActionModal';
import Selector from '@components/Selector/Selector';

interface ChangeRolePersonModalProps {
  open: boolean;
  toggleOpen: () => void;
  modalInfo: {
    name: string;
    badge: string;
  };
}

const ChangeRolePersonModal = ({ open, toggleOpen, modalInfo }: ChangeRolePersonModalProps) => {
  const roleName = modalInfo.name;
  const restOfTitle = ' 담당자 변경';
  const badgeImage = modalInfo.badge;

  // 후보자 사람 목록 불러오기

  const memberList = [
    { id: 1, content: '김은지' },
    { id: 2, content: '장서윤' },
    { id: 3, content: '송세연' },
    { id: 4, content: '임연후' },
    { id: 5, content: '김명서' },
    { id: 6, content: '박소현' },
    { id: 7, content: '손현경' },
    { id: 8, content: '정윤서' },
    { id: 9, content: '신채원' },
    { id: 10, content: '박혜경' },
  ];

  const [value, setValue] = useState<number>(1);

  const handleTotalBookNumberChange = (event: SelectChangeEvent<unknown>) => {
    setValue(Number(event.target.value as string));
  };

  const content =
    roleName === '전산관리자' ? (
      <div className="!mx-12 flex w-60 flex-col !space-y-4">
        <div className="grid grid-cols-4 items-center gap-2">
          FRONT
          <Selector className="col-span-3" value={value} onChange={handleTotalBookNumberChange} options={memberList} />
        </div>
        <div className="grid grid-cols-4 items-center gap-2">
          BACK
          <Selector className="col-span-3" value={value} onChange={handleTotalBookNumberChange} options={memberList} />
        </div>
      </div>
    ) : (
      <Selector className="!mx-12 w-60" value={value} onChange={handleTotalBookNumberChange} options={memberList} />
    );

  return (
    <ActionModal
      modalWidth="sm"
      open={open}
      onClose={toggleOpen}
      title={roleName + restOfTitle}
      actionButtonName="변경"
      onActionButonClick={toggleOpen}
    >
      <div className="flex items-center">
        <img className="w-[150px]" alt={roleName} src={badgeImage} />
        {content}
      </div>
    </ActionModal>
  );
};

export default ChangeRolePersonModal;
