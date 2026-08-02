import React, { useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { DateTime } from 'luxon';
import { VscChevronDown } from 'react-icons/vsc';

import { useGetVoteListQuery } from '@api/voteApi';
import Selector from '@components/Selector/Selector';

const CURRENT_YEAR = DateTime.now().year;

const yearList = Array.from({ length: 5 }, (_, index) => ({
  id: CURRENT_YEAR - index,
  content: `${CURRENT_YEAR - index}년`,
}));

const formatVoteDateTime = (dateTime: string) => {
  const parsedDateTime = DateTime.fromISO(dateTime);

  return parsedDateTime.isValid ? parsedDateTime.toFormat('yyyy.MM.dd HH:mm') : dateTime;
};

const VoteListTab = () => {
  const [currentYear, setCurrentYear] = useState(CURRENT_YEAR);
  const { data: votes = [], isPending, isError } = useGetVoteListQuery(currentYear);

  const handleYearChange = (event: SelectChangeEvent<unknown>) => {
    setCurrentYear(Number(event.target.value));
  };

  let content: React.ReactNode;

  if (isPending) {
    content = (
      <div className="flex justify-center py-24">
        <CircularProgress />
      </div>
    );
  } else if (isError) {
    content = (
      <Typography marginY={15} paddingY={8} textAlign="center" className="border-y border-pointBlue/70">
        투표 목록을 불러오지 못했습니다.
      </Typography>
    );
  } else if (votes.length === 0) {
    content = (
      <Typography marginY={15} paddingY={8} textAlign="center" className="border-y border-pointBlue/70">
        현재 등록된 투표가 없습니다.
      </Typography>
    );
  } else {
    content = votes.map((vote) => (
      <Accordion key={vote.id} TransitionProps={{ mountOnEnter: true }} className="!shadow-none">
        <AccordionSummary
          className="!border-b !border-white/[20%] !bg-subBlack !px-4 !py-2 !text-white hover:!bg-subGray hover:!text-white focus:!outline-0"
          expandIcon={<VscChevronDown />}
        >
          <div className="flex min-h-20 w-full items-center px-2 py-2">
            <div className="min-w-0 space-y-2">
              <Typography variant="h3" fontWeight="semiBold">
                {vote.title}
              </Typography>
              <Typography className="!text-sm text-white/60">
                {formatVoteDateTime(vote.startAt)} ~ {formatVoteDateTime(vote.endAt)}
              </Typography>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails className="!bg-middleBlack !px-[41px] !py-[30px] !text-white">
          <div className="space-y-2">
            <Typography className="font-semibold">투표 안내</Typography>
            <Typography className="border-l-2 border-pointBlue px-2">
              {vote.description ?? '등록된 투표 안내가 없습니다.'}
            </Typography>
          </div>
        </AccordionDetails>
      </Accordion>
    ));
  }

  return (
    <div>
      <div className="mb-8 flex items-center">
        <Selector className="w-28" name="year" options={yearList} value={currentYear} onChange={handleYearChange} />
      </div>

      {content}
    </div>
  );
};

export default VoteListTab;
