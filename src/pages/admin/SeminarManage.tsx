import React, { useState } from 'react';
import StandardTable from '@components/Table/StandardTable';
import ActionModal from '@components/Modal/ActionModal';
import { columns, rows } from '@mocks/SeminarManageApi';
import PageTitle from '@components/Typography/PageTitle';
import OutlinedButton from '@components/Button/OutlinedButton';
import StandardDatePicker from '@components/DatePicker/StandardDatePicker';
import { DateTime } from 'luxon';

const SeminarManage = () => {
  const listColumns = columns;
  const listRows = rows;
  const currentTerm = { year: 2023, season: '1학기' }; // TODO - 임시데이터
  const [date, setDate] = React.useState<DateTime | null>(null);

  const [openSeminarAddModal, setOpenSeminarAddModal] = useState(false);
  const [openSeminarDeleteModal, setOpenSeminarDeleteModal] = useState(false);
  const handleSeminarDeleteButtonClick = () => {
    // TODO
  };
  const handleSeminarAddButtonClick = () => {
    // TODO
  };

  return (
    <div>
      <PageTitle>세미나 관리 {`(${currentTerm.year}년 ${currentTerm.season})`}</PageTitle>
      <StandardTable columns={listColumns} rows={listRows} />
      <div className="mt-4 flex justify-end space-x-2">
        <OutlinedButton onClick={() => setOpenSeminarAddModal(true)}>추가</OutlinedButton>
        <ActionModal
          open={openSeminarAddModal}
          onClose={() => setOpenSeminarAddModal(false)}
          title="세미나 일정 추가"
          actionButtonName="추가"
          onActionButonClick={() => {
            handleSeminarAddButtonClick();
            setOpenSeminarAddModal(false);
          }}
        >
          <div className="flex justify-center">
            <StandardDatePicker date={date} setDate={setDate} label="날짜" />
          </div>
        </ActionModal>
        <OutlinedButton onClick={() => setOpenSeminarDeleteModal(true)}>삭제</OutlinedButton>
        <ActionModal
          open={openSeminarDeleteModal}
          onClose={() => setOpenSeminarDeleteModal(false)}
          title="세미나 일정 삭제"
          actionButtonName="삭제"
          onActionButonClick={() => {
            handleSeminarDeleteButtonClick();
            setOpenSeminarDeleteModal(false);
          }}
        >
          <div className="flex justify-center">
            <StandardDatePicker date={date} setDate={setDate} label="날짜" />
          </div>
        </ActionModal>
      </div>
    </div>
  );
};

export default SeminarManage;
