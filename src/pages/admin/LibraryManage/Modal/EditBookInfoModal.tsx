import React, { useState, useEffect } from 'react';
import OutlinedButton from '@components/Button/OutlinedButton';
import ActionModal from '@components/Modal/ActionModal';
import { Row } from '@components/Table/StandardTable.interface';
import { BookListInfo, BorrowBookInfo } from '@api/dto';
import StandardTable from '@components/Table/StandardTable';
import { borrowBookInfoColumns, borrowBookInfoRows } from '@mocks/LibraryManageApi';

import StandardInput from '@components/Input/StandardInput';
import TotalBookNumberSelector from '../components/TotalBookNumberSelector';

type AddBookInfo = Pick<BookListInfo, 'title' | 'author'>;

interface SelectorProps {
  openEditModal: boolean;
  toggleOpenEditModal: () => void;
  EditModalRowData: Row<BookListInfo>;
}

const EditBookInfoModal = ({ openEditModal, toggleOpenEditModal, EditModalRowData }: SelectorProps) => {
  const [form, setForm] = React.useState<AddBookInfo>({
    title: '',
    author: '',
  });
  const [totalBookNumber, setTotalBookNumber] = useState<number | undefined>();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  useEffect(() => {
    setForm({
      title: EditModalRowData.title,
      author: EditModalRowData.author,
    });

    setTotalBookNumber(Number(EditModalRowData?.borrowState?.split('/')[1]));
  }, [EditModalRowData]);

  return (
    <div className="flex">
      <ActionModal
        open={openEditModal}
        onClose={toggleOpenEditModal}
        title="도서수정"
        actionButtonName="수정"
        onActionButonClick={() => {
          console.log('도서 삭제 api', form.title, form.author);
        }}
      >
        <div className="flex h-full w-full flex-col space-y-2 ">
          <StandardInput name="title" value={form.title || ''} onChange={onChange} label="도서명" />
          <StandardInput name="author" value={form.author || ''} onChange={onChange} label="저자명" />
          <TotalBookNumberSelector value={totalBookNumber || 1} setValue={setTotalBookNumber} />
          <div className="flex flex-row">
            대출현황 {EditModalRowData.borrowState}
            {EditModalRowData.enable ? (
              <div className="text-pointBlue">대출가능</div>
            ) : (
              <div className="text-subGray">대출불가</div>
            )}
          </div>
          <div>
            대출정보
            <StandardTable<BorrowBookInfo> columns={borrowBookInfoColumns} rows={borrowBookInfoRows} />
          </div>
        </div>
      </ActionModal>
    </div>
  );
};

export default EditBookInfoModal;
