import React from 'react';
import usePagination from '@hooks/usePagination';
import { useSearchParams } from 'react-router-dom';
import { BorrowInfoListSearch } from '@api/dto';
import { useGetBorrowInfoListQuery } from '@api/libraryManageApi';
import StandardTable from '@components/Table/StandardTable';
import { Column } from '@components/Table/StandardTable.interface';
import { IconButton } from '@mui/material';
import { VscCircleLarge, VscChromeClose } from 'react-icons/vsc';
import RequestManageSearchSection from '../SearchSection/RequestManageSearchSection';

interface requestManageRow {
  no: number;
  status: string;
  requestDatetime: string | null;
  bookTitle: string;
  author: string;
  bookQuantity: string;
  borrowerRealName: string;
  requestManageButton: React.ReactNode;
}

const requestManageColumn: Column<requestManageRow>[] = [
  { key: 'no', headerName: '번호' },
  { key: 'status', headerName: '유형' },
  { key: 'requestDatetime', headerName: '신청일자' },
  { key: 'bookTitle', headerName: '도서명' },
  { key: 'author', headerName: '저자' },
  { key: 'bookQuantity', headerName: '대출현황' },
  { key: 'borrowerRealName', headerName: '신청자' },
  {
    key: 'requestManageButton',
    headerName: '승인',
  },
];

const RequestManageTab = () => {
  const { page, getRowNumber } = usePagination();
  const [searchParams] = useSearchParams();
  const status = searchParams.get('status') as BorrowInfoListSearch['status'];
  const search = searchParams.get('search') as BorrowInfoListSearch['search'];

  const { data: borrowInfoListData } = useGetBorrowInfoListQuery({ page, status, search });

  if (!borrowInfoListData) return null;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleApproveButtonClick = (borrowInfoStatus: string, borrowInfoId: number) => {
    // TODO 승인 API 호출
    // console.log(borrowInfoStatus, borrowInfoId);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleDenyButtonClick = (borrowInfoStatus: string, borrowInfoId: number) => {
    // TODO 거부 API 호출
    // console.log(borrowInfoStatus, borrowInfoId);
  };

  return (
    <>
      <div className="mb-5">
        <RequestManageSearchSection />
      </div>
      <StandardTable
        columns={requestManageColumn}
        rows={borrowInfoListData?.content.map((borrowInfo, bookIndex) => ({
          no: getRowNumber({ size: borrowInfoListData.size, index: bookIndex }),
          id: borrowInfo.borrowInfoId,
          requestManageButton: (
            <>
              <IconButton
                onClick={() => {
                  handleApproveButtonClick(borrowInfo.status, borrowInfo.borrowInfoId);
                }}
                className="!mr-2 !p-0"
              >
                <VscCircleLarge size={16} className="fill-pointBlue" />
              </IconButton>
              <IconButton
                onClick={() => {
                  handleDenyButtonClick(borrowInfo.status, borrowInfo.borrowInfoId);
                }}
                className="!p-0"
              >
                <VscChromeClose size={16} className="fill-subRed" />
              </IconButton>
            </>
          ),
          ...borrowInfo,
        }))}
        paginationOption={{ rowsPerPage: borrowInfoListData?.size, totalItems: borrowInfoListData?.totalElement }}
      />
    </>
  );
};

export default RequestManageTab;
