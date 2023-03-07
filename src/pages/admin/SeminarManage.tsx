import React, { useReducer } from 'react';
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

  const [openSeminarAddModal, setOpenSeminarAddModal] = useReducer((prev) => !prev, false);
  const handleSeminarAddButtonClick = () => {
    // TODO
  };

  return (
    <div>
      <PageTitle>세미나 관리 {`(${currentTerm.year}년 ${currentTerm.season})`}</PageTitle>
      <StandardTable columns={listColumns} rows={listRows} />
      <div className="mt-4 flex justify-end space-x-2">
        <OutlinedButton onClick={setOpenSeminarAddModal}>추가</OutlinedButton>
        <ActionModal
          opened={openSeminarAddModal}
          handleOpen={setOpenSeminarAddModal}
          title="세미나 일정 추가"
          buttonName="추가"
          onActionButonClick={() => {
            handleSeminarAddButtonClick();
            setOpenSeminarAddModal();
          }}
        >
          <div className="flex justify-center">
            <StandardDatePicker date={date} setDate={setDate} label="날짜" />
          </div>
        </ActionModal>
        <OutlinedButton>삭제</OutlinedButton>
      </div>
    </div>
  );
};

export default SeminarManage;
