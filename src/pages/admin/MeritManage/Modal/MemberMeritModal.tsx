import React, { ReactElement, useState } from 'react';
import { IconButton, Typography } from '@mui/material';
import { DateTime } from 'luxon';
import { VscTrash } from 'react-icons/vsc';
import { useGetMemberMeritQuery } from '@api/meritApi';
import usePagination from '@hooks/usePagination';
import ConfirmModal from '@components/Modal/ConfirmModal';
import StandardTable from '@components/Table/StandardTable';
import { ChildComponent, Column } from '@components/Table/StandardTable.interface';
import DeleteMeritLogModal from './DeleteMeritLogModal';

interface MeritLogRow {
  id: number;
  num: number;
  giveTime: string;
  score: number;
  reason: string;
  isMerit: boolean;
  delete: ReactElement;
}

const MeritLogColumn: Column<MeritLogRow>[] = [
  { key: 'num', headerName: '번호', width: 100 },
  { key: 'giveTime', headerName: '일시', width: 200 },
  { key: 'score', headerName: '점수', width: 100 },
  { key: 'reason', headerName: '사유', width: 300 },
  { key: 'delete', headerName: '삭제', width: 100 },
];

const MeritLogChildComponent = ({ key, value, rowData }: ChildComponent<MeritLogRow>) => {
  let color = 'white';
  if (rowData.isMerit) color = 'pointBlue';
  else color = 'subRed';

  switch (key) {
    case 'giveTime':
      return (
        <Typography className={`text-${color}`}>{DateTime.fromSQL(value as string).toFormat('yyyy.MM.dd')}</Typography>
      );
    case 'delete':
      return value;
    default:
      return <Typography className={`text-${color}`}>{value}</Typography>;
  }
};

export type MemberMeritModalState = {
  memberId: number;
  title: string;
};

type MemberMeritModalProps = {
  title: string;
  memberId: number;
  setMemberId: (memberState: MemberMeritModalState) => void;
};

const MemberMeritModal = ({ title, memberId, setMemberId }: MemberMeritModalProps) => {
  const { page, getRowNumber } = usePagination();

  const { data: meritLog, refetch: meritLogRefetch } = useGetMemberMeritQuery({ page, memberId });

  const [deleteModalOpen, setDeleteModalOpen] = useState({ open: false, meritLogId: 0 });

  if (!meritLog) return null;

  return (
    <>
      <ConfirmModal
        open={memberId !== 0}
        onClose={() => {
          setMemberId({
            memberId: 0,
            title: '',
          });
        }}
        title={title}
        modalWidth="lg"
      >
        <StandardTable<MeritLogRow>
          columns={MeritLogColumn}
          rows={meritLog.content.map((item, index) => ({
            num: getRowNumber({ size: meritLog.size, index }),
            delete: (
              <IconButton
                onClick={(event) => {
                  event.stopPropagation();
                  setDeleteModalOpen({ open: true, meritLogId: item.id });
                }}
                className="!p-0"
              >
                <VscTrash size={20} className="fill-subRed" />
              </IconButton>
            ),
            ...item,
          }))}
          childComponent={MeritLogChildComponent}
          paginationOption={{ rowsPerPage: meritLog.size, totalItems: meritLog.totalElements }}
        />
      </ConfirmModal>
      <DeleteMeritLogModal
        open={deleteModalOpen.open}
        onClose={() => {
          setDeleteModalOpen({ open: false, meritLogId: 0 });
          meritLogRefetch();
        }}
        meritLogId={deleteModalOpen.meritLogId}
      />
    </>
  );
};

export default MemberMeritModal;
