import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { VscCircleLarge, VscChromeClose } from 'react-icons/vsc';
import { BorrowInfoListSearch } from '@api/dto';
import {
  useGetBorrowInfoListQuery,
  useApproveRequestMutation,
  useApproveReturnMutation,
  useDenyRequestMutation,
  useDenyReturnMutation,
} from '@api/libraryManageApi';
import usePagination from '@hooks/usePagination';
import StandardTable from '@components/Table/StandardTable';
import { Column } from '@components/Table/StandardTable.interface';
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
  { key: 'no', headerName: '번호', width: '5%' },
  { key: 'status', headerName: '유형', width: '10%' },
  { key: 'requestDatetime', headerName: '신청일자', width: '10%' },
  { key: 'bookTitle', headerName: '도서명', width: '30%' },
  { key: 'author', headerName: '저자', width: '20%' },
  { key: 'bookQuantity', headerName: '대출현황', width: '5%' },
  { key: 'borrowerRealName', headerName: '신청자', width: '10%' },
  {
    key: 'requestManageButton',
    headerName: '승인',
    width: '10%',
  },
];

const RequestManageTab = () => {
  const { page, getRowNumber } = usePagination();
  const [searchParams] = useSearchParams();
  const status = (searchParams.get('status') as BorrowInfoListSearch['status']) || 'requests_or_willreturn';
  const search = searchParams.get('search') as BorrowInfoListSearch['search'];

  const { data: borrowInfoListData } = useGetBorrowInfoListQuery({ page, status, search });

  const { mutate: ApproveRequest } = useApproveRequestMutation();
  const { mutate: ApproveReturn } = useApproveReturnMutation();
  const { mutate: DenyRequest } = useDenyRequestMutation();
  const { mutate: DenyReturn } = useDenyReturnMutation();

  const handleActionButtonClick = (action: 'approve' | 'deny', borrowInfoStatus: string, borrowInfoId: number) => {
    let mutateFunction;

    if (action === 'approve') {
      mutateFunction = borrowInfoStatus === '대출 신청' ? ApproveRequest : ApproveReturn;
    } else if (action === 'deny') {
      mutateFunction = borrowInfoStatus === '대출 신청' ? DenyRequest : DenyReturn;
    }

    if (mutateFunction) {
      mutateFunction(borrowInfoId);
    }
  };

  return (
    <>
      <div className="mb-5">
        <RequestManageSearchSection />
      </div>
      <StandardTable
        columns={requestManageColumn}
        rows={
          borrowInfoListData?.content.map((borrowInfo, bookIndex) => ({
            no: getRowNumber({ size: borrowInfoListData.size, index: bookIndex }),
            id: borrowInfo.borrowInfoId,
            requestManageButton: (
              <>
                <IconButton
                  onClick={() => {
                    handleActionButtonClick('approve', borrowInfo.status, borrowInfo.borrowInfoId);
                  }}
                  className="!mr-2 !p-0"
                >
                  <VscCircleLarge size={16} className="fill-pointBlue" />
                </IconButton>
                <IconButton
                  onClick={() => {
                    handleActionButtonClick('deny', borrowInfo.status, borrowInfo.borrowInfoId);
                  }}
                  className="!p-0"
                >
                  <VscChromeClose size={16} className="fill-subRed" />
                </IconButton>
              </>
            ),
            ...borrowInfo,
          })) || []
        }
        paginationOption={{ rowsPerPage: borrowInfoListData?.size, totalItems: borrowInfoListData?.totalElement }}
      />
    </>
  );
};

export default RequestManageTab;
