import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useMediaQuery, useTheme } from '@mui/material';
import { BorrowLogListSearch } from '@api/dto';
import { useGetBorrowLogListQuery } from '@api/libraryManageApi';
import usePagination from '@hooks/usePagination';
import OutlinedButton from '@components/Button/OutlinedButton';
import StandardTable from '@components/Table/StandardTable';
import { Column } from '@components/Table/StandardTable.interface';
import OverdueBookModal from '../Modal/OverdueBookModal';
import BorrowingStatusSearchSection from '../SearchSection/BorrowingStatusSearchSection';

interface BorrowLogRow {
  no: number;
  bookTitle: string;
  author: string;
  borrowerRealName: string;
  borrowDateTime: string;
  expireDateTime: string;
  returnDateTime: string | null;
  rejectDateTime: string | null;
  status: string;
}

const BorrowLogColumn: Column<BorrowLogRow>[] = [
  { key: 'no', headerName: '번호', width: '5%' },
  { key: 'bookTitle', headerName: '도서명', width: '30%' },
  { key: 'author', headerName: '저자', width: '25%' },
  { key: 'borrowerRealName', headerName: '대출자', width: '10%' },
  { key: 'borrowDateTime', headerName: '대출 일자', width: '5%' },
  { key: 'expireDateTime', headerName: '반납 예정일', width: '5%' },
  { key: 'returnDateTime', headerName: '반납 일자', width: '5%' },
  { key: 'rejectDateTime', headerName: '대출 반려 일자', width: '5%' },
  { key: 'status', headerName: '유형', width: '10%' },
];

const BorrowingStatusTab = () => {
  const { page, getRowNumber } = usePagination();
  const [overdueBookModalOpen, setOverdueBookModalOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [searchParams] = useSearchParams();

  const searchType = searchParams.get('searchType') as BorrowLogListSearch['searchType'];
  const search = searchParams.get('search') as BorrowLogListSearch['search'];

  const { data: borrowLogListData } = useGetBorrowLogListQuery({ page, searchType, search });

  return (
    <div className="flex flex-col">
      <div className="mb-2 flex w-full flex-col items-start justify-between md:mb-5 md:flex-row md:items-center">
        <BorrowingStatusSearchSection />
        <div className="items-ends mt-2 flex w-full justify-end space-x-4 md:mt-0">
          <OutlinedButton small={isMobile} onClick={() => setOverdueBookModalOpen(true)}>
            연체 도서
          </OutlinedButton>
        </div>
      </div>
      <StandardTable
        columns={BorrowLogColumn}
        rows={
          borrowLogListData?.content.map((book, bookIndex) => ({
            id: bookIndex,
            no: getRowNumber({ size: borrowLogListData.size, index: bookIndex }),
            ...book,
          })) || []
        }
        paginationOption={{ rowsPerPage: borrowLogListData?.size, totalItems: borrowLogListData?.totalElement }}
      />
      {overdueBookModalOpen && (
        <OverdueBookModal open={overdueBookModalOpen} onClose={() => setOverdueBookModalOpen(false)} />
      )}
    </div>
  );
};

export default BorrowingStatusTab;
