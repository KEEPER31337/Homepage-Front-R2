import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { VscChevronDown } from 'react-icons/vsc';

import { useGetVoteResultQuery } from '@api/voteApi';
import { VoteAgendaInfo, VoteResultReceiptTokenChoice } from '@api/voteDto';
import OutlinedButton from '@components/Button/OutlinedButton';
import StandardTable from '@components/Table/StandardTable';
import { Column } from '@components/Table/StandardTable.interface';
import PageTitle from '@components/Typography/PageTitle';
import { formatVoteDateTime } from '@utils/date';
import { createCsvFileName, downloadCsv } from './csvDownload';

interface VoteResultErrorResponse {
  response?: {
    data?: {
      message?: unknown;
    };
  };
}

interface AgendaResultRow {
  option: string;
  voteCount: string;
  voteRate: string;
}

const agendaResultColumns: Column<AgendaResultRow>[] = [
  { key: 'option', headerName: '선택지', width: '60%' },
  { key: 'voteCount', headerName: '득표수', width: '20%' },
  { key: 'voteRate', headerName: '득표율', width: '20%' },
];

const getVoteResultErrorMessage = (error: unknown) => {
  const message = (error as VoteResultErrorResponse)?.response?.data?.message;

  return typeof message === 'string' && message.trim() ? message : '투표 결과를 불러오지 못했습니다.';
};

const lookUpReceiptLabels = (receipt: VoteResultReceiptTokenChoice, agendas: VoteAgendaInfo[]) =>
  agendas.map((agenda) => {
    const choice = receipt.choices.find(({ agendaId }) => agendaId === agenda.id);
    const optionIds = choice?.optionIds ?? [];
    const optionById = new Map(agenda.options.map((option) => [option.id, option.content]));

    return (
      optionIds.map((optionId) => `${optionById.get(optionId) ?? '알 수 없는 선택지'} (#${optionId})`).join(', ') || '-'
    );
  });

const createAgendaOptionCounts = (receipts: VoteResultReceiptTokenChoice[]) => {
  const agendaOptionCount: Record<number, Record<number, number>> = {};

  for (const { choices } of receipts) {
    for (const { agendaId, optionIds } of choices) {
      agendaOptionCount[agendaId] ??= {};

      for (const optionId of optionIds) {
        agendaOptionCount[agendaId][optionId] = (agendaOptionCount[agendaId][optionId] ?? 0) + 1;
      }
    }
  }

  return agendaOptionCount;
};

const VoteResult = () => {
  const navigate = useNavigate();
  const { voteId } = useParams();
  const parsedVoteId = Number(voteId);
  const {
    data: result,
    error,
    isError,
    isPending,
  } = useGetVoteResultQuery({
    voteId: parsedVoteId,
  });

  if (isError) {
    return (
      <div>
        <PageTitle>투표 결과</PageTitle>
        <div className="space-y-6 border-y border-pointBlue/70 py-16 text-center">
          <Typography>{getVoteResultErrorMessage(error)}</Typography>
          <OutlinedButton onClick={() => navigate('/vote')}>투표 목록으로</OutlinedButton>
        </div>
      </div>
    );
  }

  if (isPending || !result) {
    return (
      <div>
        <PageTitle>투표 결과</PageTitle>
        <div className="flex justify-center py-24">
          <CircularProgress />
        </div>
      </div>
    );
  }

  const { participations, receiptTokenChoices, vote } = result;
  const agendaOptionCounts = createAgendaOptionCounts(receiptTokenChoices);
  const receiptCount = receiptTokenChoices.length;
  const agendaResults = vote.agendas.map((agenda) => ({
    id: agenda.id,
    title: agenda.title,
    rows: agenda.options.map((option) => {
      const count = agendaOptionCounts[agenda.id]?.[option.id] ?? 0;
      const percentage = receiptCount === 0 ? 0 : (count / receiptCount) * 100;

      return {
        id: option.id,
        option: option.content,
        voteCount: `${count}표`,
        voteRate: `${percentage.toFixed(1)}%`,
      };
    }),
  }));

  const handleParticipantCsvDownload = () => {
    downloadCsv(
      createCsvFileName(vote.title, '참여자_목록'),
      ['이름', '기수'],
      participations.map(({ realName, generation }) => [realName, generation]),
    );
  };

  const handleReceiptCsvDownload = () => {
    downloadCsv(
      createCsvFileName(vote.title, '영수증별_선택_결과'),
      ['영수증 토큰', ...vote.agendas.map(({ id, title }) => `${title} (#${id})`)],
      receiptTokenChoices.map((receipt) => [receipt.receiptToken, ...lookUpReceiptLabels(receipt, vote.agendas)]),
    );
  };

  return (
    <div className="px-2 md:px-0">
      <PageTitle>투표 결과</PageTitle>

      <div className="overflow-hidden rounded-sm border border-white/20 bg-middleBlack">
        <div className="border-b border-white/10 bg-subBlack px-5 py-5 sm:px-8">
          <Typography variant="h3" className="!font-semibold">
            {vote.title}
          </Typography>
          <Typography className="!mt-2 text-white/70">{vote.description ?? '등록된 투표 안내가 없습니다.'}</Typography>
          <Typography className="!mt-2 !text-sm text-white/50">
            {formatVoteDateTime(vote.startAt)} ~ {formatVoteDateTime(vote.endAt)}
          </Typography>
        </div>

        <div className="px-5 py-6 sm:px-8 sm:py-8">
          <section>
            <div className="flex flex-wrap items-end justify-between gap-2">
              <Typography component="h2" className="!font-semibold text-pointBlue">
                안건별 결과
              </Typography>
              <Typography className="!text-xs text-white/50">득표율은 집계 영수증 수를 기준으로 합니다. (중복 선택 허용 시 100%를 초과할 수 있음)</Typography>
            </div>

            <div className="mt-3 max-h-[65vh] space-y-6 overflow-y-auto pr-1">
              {agendaResults.map((agenda, agendaIndex) => (
                <div key={agenda.id} className="rounded-sm border border-white/10 bg-subBlack p-4">
                  <div className="mb-3">
                    <Typography className="!text-xs text-white/50">안건 {agendaIndex + 1}</Typography>
                    <Typography component="h3" className="!font-semibold">
                      {agenda.title}
                    </Typography>
                  </div>
                  <StandardTable<AgendaResultRow> columns={agendaResultColumns} rows={agenda.rows} />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <Accordion TransitionProps={{ mountOnEnter: true }} className="!shadow-none">
          <AccordionSummary
            id="receipt-results-header"
            aria-controls="receipt-results-content"
            expandIcon={<VscChevronDown />}
            className="!border-b !border-white/20 !bg-subBlack !px-5 !py-2 !text-white hover:!bg-subGray focus:!outline-0"
          >
            <div className="flex w-full items-center justify-between gap-4 pr-3">
              <Typography className="!font-semibold">영수증별 선택 결과</Typography>
              <Typography className="!text-sm text-white/50">{receiptCount}건</Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails
            id="receipt-results-content"
            aria-labelledby="receipt-results-header"
            className="!bg-middleBlack !px-5 !py-5 !text-white"
          >
            <div className="mb-4 flex justify-end">
              <OutlinedButton small disabled={receiptCount === 0} onClick={handleReceiptCsvDownload}>
                CSV 다운로드
              </OutlinedButton>
            </div>
            <div className="overflow-x-auto rounded-sm border border-white/10">
              <Table size="small" aria-label="영수증별 선택 결과">
                <TableHead className="bg-subBlack">
                  <TableRow>
                    <TableCell className="!min-w-80 !border-white/10 !font-semibold !text-white">영수증 토큰</TableCell>
                    {vote.agendas.map((agenda) => (
                      <TableCell key={agenda.id} className="!min-w-52 !border-white/10 !font-semibold !text-white">
                        {agenda.title}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {receiptTokenChoices.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={vote.agendas.length + 1}
                        align="center"
                        className="!border-0 !py-8 !text-white/60"
                      >
                        집계된 영수증이 없습니다.
                      </TableCell>
                    </TableRow>
                  ) : (
                    receiptTokenChoices.map((receipt) => (
                      <TableRow key={receipt.receiptToken}>
                        <TableCell className="!border-white/10 !text-white/80">
                          <code className="whitespace-nowrap text-xs">{receipt.receiptToken}</code>
                        </TableCell>
                        {lookUpReceiptLabels(receipt, vote.agendas).map((selection, agendaIndex) => (
                          <TableCell key={vote.agendas[agendaIndex].id} className="!border-white/10 !text-white/80">
                            {selection}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </AccordionDetails>
        </Accordion>

        <Accordion TransitionProps={{ mountOnEnter: true }} className="!shadow-none">
          <AccordionSummary
            id="participants-header"
            aria-controls="participants-content"
            expandIcon={<VscChevronDown />}
            className="!border-b !border-white/20 !bg-subBlack !px-5 !py-2 !text-white hover:!bg-subGray focus:!outline-0"
          >
            <div className="flex w-full items-center justify-between gap-4 pr-3">
              <Typography className="!font-semibold">참여자</Typography>
              <Typography className="!text-sm text-white/50">{participations.length}명</Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails
            id="participants-content"
            aria-labelledby="participants-header"
            className="!bg-middleBlack !px-5 !py-5 !text-white"
          >
            <div className="mb-4 flex justify-end">
              <OutlinedButton small disabled={participations.length === 0} onClick={handleParticipantCsvDownload}>
                CSV 다운로드
              </OutlinedButton>
            </div>
            <div className="overflow-x-auto rounded-sm border border-white/10">
              <Table size="small" aria-label="투표 참여자">
                <TableHead className="bg-subBlack">
                  <TableRow>
                    <TableCell className="!border-white/10 !font-semibold !text-white">이름</TableCell>
                    <TableCell className="!border-white/10 !font-semibold !text-white">기수</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {participations.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={2} align="center" className="!border-0 !py-8 !text-white/60">
                        참여자가 없습니다.
                      </TableCell>
                    </TableRow>
                  ) : (
                    participations.map(({ realName, generation }, index) => (
                      <TableRow key={`${realName}-${generation}-${index}`}>
                        <TableCell className="!border-white/10 !text-white/80">{realName}</TableCell>
                        <TableCell className="!border-white/10 !text-white/80">{generation}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>

      <div className="mt-8 flex justify-end">
        <OutlinedButton onClick={() => navigate('/vote')}>투표 목록으로</OutlinedButton>
      </div>
    </div>
  );
};

export default VoteResult;
