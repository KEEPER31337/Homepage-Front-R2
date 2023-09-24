import React from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Typography, useMediaQuery, useTheme } from '@mui/material';
import { DateTime } from 'luxon';
import { AiFillLock } from 'react-icons/ai';
import { VscEye, VscThumbsup } from 'react-icons/vsc';
import { useRecoilValue } from 'recoil';
import { BoardSearch } from '@api/dto';
import { useGetNoticePostListQuery, useGetPostListQuery } from '@api/postApi';
import usePagination from '@hooks/usePagination';
import tableViewState from '@recoil/view.recoil';
import { categoryNameToId } from '@utils/converter';
import OutlinedButton from '@components/Button/OutlinedButton';
import TableViewSwitchButton from '@components/Table/Button/TableViewSwitchButton';
import GridTable from '@components/Table/GridTable';
import StandardTable from '@components/Table/StandardTable';

import { ChildComponent, Column, Row } from '@components/Table/StandardTable.interface';
import PageTitle from '@components/Typography/PageTitle';
import BoardSearchSection from './SearchSection/BoardSearchSection';

interface BoardRow {
  no: number | string;
  title: string;
  writerName: string;
  registerTime: string;
  visitCount: number;
  likeCount: number;
  commentCount: number;
  isSecret: boolean;
}

const boardColumn: Column<BoardRow>[] = [
  { key: 'no', headerName: '번호', width: '10%' },
  { key: 'title', headerName: '제목', width: '45%' },
  { key: 'writerName', headerName: '작성자', width: '10%' },
  { key: 'registerTime', headerName: '작성일', width: '15%' },
  { key: 'visitCount', headerName: '조회수', width: '10%' },
  { key: 'likeCount', headerName: '추천수', width: '10%' },
];

const BoardList = () => {
  const { categoryName } = useParams();
  const [searchParams] = useSearchParams();
  const searchType = searchParams.get('searchType') as BoardSearch['searchType'];
  const search = searchParams.get('search');

  const { page, getRowNumber } = usePagination();
  const categoryId = categoryName ? categoryNameToId(categoryName) : null;

  if (!categoryId) {
    return null;
  }

  const navigate = useNavigate();
  const { data: noticePosts } = useGetNoticePostListQuery({ categoryId });
  const { data: posts } = useGetPostListQuery({ categoryId, page, searchType, search });
  const tableView = useRecoilValue(tableViewState);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (!posts || !noticePosts) {
    return null;
  }

  const handleWriteButtonClick = () => {
    navigate(`/board/write/${categoryName}`);
  };

  const handlePostRowClick = ({ rowData }: { rowData: Row<BoardRow> }) => {
    if (!rowData.id) return;

    navigate(`/board/view/${rowData.id}`, { state: rowData.isSecret });
  };

  const childComponent = ({ key, value, rowData }: ChildComponent<BoardRow>) => {
    switch (key) {
      case 'no':
        return value === '공지' ? (
          <Typography color="primary" fontWeight="semiBold">
            {value}
          </Typography>
        ) : (
          value
        );
      case 'title':
        return (
          <>
            <div className="flex items-center">
              {rowData.isSecret ? (
                <>
                  <AiFillLock className="mr-1 fill-pointBlue" />
                  <span>비밀글입니다.</span>
                </>
              ) : (
                <span>{value}</span>
              )}
              {rowData.commentCount > 0 && <span className="ml-1 text-pointBlue">[{rowData.commentCount}]</span>}
              {DateTime.fromISO(rowData.registerTime) >= DateTime.now().plus({ days: -1 }).startOf('day') && (
                <span className="ml-1 rounded-sm bg-pointBlue px-1 text-center text-small text-mainBlack">N</span>
              )}
            </div>
            {isMobile && (
              <div className="flex items-end justify-between">
                <Typography variant="small">
                  {rowData.writerName} | {rowData.registerTime}
                </Typography>
                <div className="flex items-end">
                  <VscEye className="mr-0.5 fill-pointBlue" size={12} />
                  <Typography variant="small">{rowData.visitCount}</Typography>
                  &nbsp;
                  <VscThumbsup className="mr-0.5 fill-pointBlue" size={12} />
                  <Typography variant="small">{rowData.likeCount}</Typography>
                </div>
              </div>
            )}
          </>
        );
      default:
        return value;
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <PageTitle>{categoryName}</PageTitle>
        <OutlinedButton onClick={handleWriteButtonClick}>글쓰기</OutlinedButton>
      </div>
      <div className="flex items-center justify-between pb-5">
        <BoardSearchSection />
        <TableViewSwitchButton />
      </div>
      {tableView === 'List' && (
        <StandardTable
          columns={
            isMobile
              ? boardColumn.reduce((acc, cur) => {
                  if (cur.key === 'no' || cur.key === 'title') return [...acc, cur];
                  return acc;
                }, [] as Column<BoardRow>[])
              : boardColumn
          }
          childComponent={childComponent}
          fixedRows={noticePosts.map((noticePost) => ({
            no: '공지',
            ...noticePost,
          }))}
          rows={posts.content.map((post, postIndex) => ({
            no: getRowNumber({ size: posts.size, index: postIndex }),
            ...post,
          }))}
          onRowClick={handlePostRowClick}
          paginationOption={{ rowsPerPage: posts.size, totalItems: posts.totalElements }}
        />
      )}
      {tableView === 'Grid' && (
        <GridTable<BoardRow>
          fixedRows={noticePosts.map((noticePost) => ({
            no: '공지',
            ...noticePost,
          }))}
          rows={posts.content.map((post, postIndex) => ({
            no: getRowNumber({ size: posts.size, index: postIndex }),
            ...post,
          }))}
          onRowClick={handlePostRowClick}
          paginationOption={{ rowsPerPage: posts.size, totalItems: posts.totalElements }}
        />
      )}
    </div>
  );
};

export default BoardList;
