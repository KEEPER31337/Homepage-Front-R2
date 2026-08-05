import React, { useMemo, useState } from 'react';
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

import { useGetMemberInfoQuery } from '@api/dutyManageApi';
import { useGetAdminVoteListQuery } from '@api/voteApi';
import { AdminVoteListItem } from '@api/voteDto';
import ActionButton from '@components/Button/ActionButton';
import MemberChip from '@components/Chip/MemberChip';
import Selector from '@components/Selector/Selector';
import { formatVoteDateTime } from '@utils/date';
import DeleteVoteModal from '../Modal/DeleteVoteModal';

const CURRENT_YEAR = DateTime.now().year;

const yearList = Array.from({ length: 5 }, (_, index) => ({
  id: CURRENT_YEAR - index,
  content: `${CURRENT_YEAR - index}년`,
}));

const VoteListTab = () => {
  const [selectedYear, setSelectedYear] = useState(CURRENT_YEAR);
  const [voteToDelete, setVoteToDelete] = useState<AdminVoteListItem | null>(null);
  const { data: votes = [], isPending, isError } = useGetAdminVoteListQuery(selectedYear);
  const { data: members, isPending: isMembersPending, isError: isMembersError } = useGetMemberInfoQuery();
  const membersById = useMemo(() => new Map((members ?? []).map((member) => [member.memberId, member])), [members]);

  const handleYearChange = (event: SelectChangeEvent<unknown>) => {
    setSelectedYear(Number(event.target.value));
  };

  const renderPermittedMembers = (voteId: number, memberIds: number[]) => {
    if (memberIds.length === 0) return <Typography>참여가 허용된 회원이 없습니다.</Typography>;
    if (isMembersPending) return <Typography>회원 정보를 불러오는 중입니다.</Typography>;
    if (isMembersError) return <Typography>회원 정보를 불러오지 못했습니다.</Typography>;

    return (
      <div className="flex flex-wrap gap-2">
        {memberIds.map((memberId, memberIndex) => {
          const member = membersById.get(memberId);
          const label = member
            ? `${member.generation}기_${member.realName} (ID_${memberId})`
            : `조회 없음 (ID_${memberId})`;

          return <MemberChip className="!rounded" key={`${voteId}-${memberId}-${memberIndex}`} label={label} />;
        })}
      </div>
    );
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
          <div className="space-y-6">
            <div className="space-y-2">
              <Typography className="font-semibold">투표 안내</Typography>
              <Typography className="border-l-2 border-pointBlue px-2">
                {vote.description ?? '등록된 투표 안내가 없습니다.'}
              </Typography>
            </div>

            <div className="space-y-2">
              <Typography className="font-semibold">참여자 수</Typography>
              <Typography className="border-l-2 border-pointBlue px-2">{vote.participantCount}명</Typography>
            </div>

            <div className="space-y-2">
              <Typography className="font-semibold">참여 허용 회원</Typography>
              <div className="border-l-2 border-pointBlue px-2">
                <Typography>{vote.permitByUserIds.length}명</Typography>
                <div className="mt-2">{renderPermittedMembers(vote.id, vote.permitByUserIds)}</div>
              </div>
            </div>

            <div className="flex justify-end border-t border-white/10 pt-6">
              <ActionButton mode="delete" type="button" onClick={() => setVoteToDelete(vote)}>
                삭제하기
              </ActionButton>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    ));
  }

  return (
    <div>
      <div className="mb-8 flex items-center">
        <Selector className="w-28" name="year" options={yearList} value={selectedYear} onChange={handleYearChange} />
      </div>

      {content}

      <DeleteVoteModal vote={voteToDelete} onClose={() => setVoteToDelete(null)} />
    </div>
  );
};

export default VoteListTab;
