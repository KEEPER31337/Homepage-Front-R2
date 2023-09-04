import React, { useState } from 'react';
import { IconButton, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';
import ServerImg from '@components/Image/ServerImg';
import { Row } from '@components/Table/StandardTable.interface';
import { CardDetailInfo, CardMainInfo, InteractionScore, PostingCardProps } from './PostingCard';

const NOTICE_VIEW_NUMBER = 3;

const FixedPostingCard = <T,>({
  fixedRows,
  onClick,
}: {
  fixedRows: (PostingCardProps & Row<T>)[];
  onClick?: ({ rowData }: { rowData: Row<T> }) => void;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevButtonClick = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const handleNextButtonClick = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <div className="mb-8 flex justify-center bg-gradient-to-r from-transparent via-middleBlack pb-4 pt-1">
      <fieldset className="w-fit border-y border-pointBlue">
        <legend className="mx-auto px-4 font-semibold text-pointBlue">공지</legend>
        <div className="relative flex items-center justify-center pb-4 pt-1">
          <ImageList cols={NOTICE_VIEW_NUMBER} gap={30} rowHeight={160}>
            {fixedRows
              .slice(currentIndex * NOTICE_VIEW_NUMBER, currentIndex * NOTICE_VIEW_NUMBER + NOTICE_VIEW_NUMBER)
              .map((row) => (
                <ImageListItem
                  key={row.id}
                  className={`${
                    onClick ? 'hover:cursor-pointer hover:brightness-[.8] hover:drop-shadow-none' : ''
                  } w-72 bg-middleBlack`}
                  onClick={onClick ? () => onClick({ rowData: row }) : undefined}
                >
                  <ServerImg errorClassName="m-auto h-[118px] w-28" src={row.thumbnailPath ?? ''} alt="게시글 썸네일" />
                  <ImageListItemBar
                    className="h-2/5 !bg-transparent !bg-gradient-to-t !from-mainBlack"
                    title={<CardMainInfo isSecret={row.isSecret} type={row.type} title={row.title} />}
                    subtitle={
                      <div className="relative flex h-full items-end justify-between">
                        <CardDetailInfo
                          writerThumbnailPath={row.writerThumbnailPath}
                          writerName={row.writerName}
                          registerTime={row.registerTime}
                        />
                        <InteractionScore
                          visitCount={row.visitCount}
                          commentCount={row.commentCount}
                          likeCount={row.likeCount}
                        />
                      </div>
                    }
                  />
                </ImageListItem>
              ))}
          </ImageList>
          {currentIndex !== 0 && (
            <IconButton
              onClick={handlePrevButtonClick}
              color="primary"
              className="!absolute -left-5 !bg-mainBlack shadow-sm shadow-subBlack"
            >
              <VscChevronLeft />
            </IconButton>
          )}
          {fixedRows.length - 1 - NOTICE_VIEW_NUMBER > currentIndex && (
            <IconButton
              onClick={handleNextButtonClick}
              color="primary"
              className="!absolute -right-5 !bg-mainBlack shadow-sm shadow-subBlack"
            >
              <VscChevronRight />
            </IconButton>
          )}
        </div>
      </fieldset>
    </div>
  );
};

export default FixedPostingCard;
