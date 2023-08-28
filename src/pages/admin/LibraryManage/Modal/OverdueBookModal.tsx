import React from 'react';
import ConfirmModal from '@components/Modal/ConfirmModal';
import { useGetOverdueInfoListQuery } from '@api/libraryManageApi';
import StandardTable from '@components/Table/StandardTable';
import usePagination from '@hooks/usePagination';
import { Column } from '@components/Table/StandardTable.interface';

interface OverdueBookModalProps {
  open: boolean;
  onClose: () => void;
}

interface requestManageRow {
  no: number;
  bookTitle: string;
  author: string;
  borrowerRealName: string;
  requestDatetime: string | null;
  expiredDateTime: string | null;
  status: string;
}

const requestManageColumn: Column<requestManageRow>[] = [
  { key: 'no', headerName: '번호' },
  { key: 'bookTitle', headerName: '도서명' },
  { key: 'author', headerName: '저자' },
  { key: 'borrowerRealName', headerName: '대출자' },
  { key: 'requestDatetime', headerName: '대출 일자' },
  { key: 'expiredDateTime', headerName: '반납 예정일' },
  { key: 'status', headerName: '유형' },
];

const OverdueBookModal = ({ open, onClose }: OverdueBookModalProps) => {
  const { page, getRowNumber } = usePagination();
  const { data: overdueInfoListData } = useGetOverdueInfoListQuery({ page });

  if (!overdueInfoListData) return null;

  return (
    <ConfirmModal open={open} onClose={onClose} title="연체도서" modalWidth="md">
      <StandardTable
        columns={requestManageColumn}
        rows={overdueInfoListData?.content.map((overdueInfo, bookIndex) => ({
          no: getRowNumber({ size: overdueInfoListData.size, index: bookIndex }),
          id: overdueInfo?.borrowInfoId,
          ...overdueInfo,
        }))}
        paginationOption={{ rowsPerPage: overdueInfoListData.size, totalItems: overdueInfoListData?.totalElement }}
      />
    </ConfirmModal>
  );
};

export default OverdueBookModal;
