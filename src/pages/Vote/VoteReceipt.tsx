import React from 'react';
import { Typography } from '@mui/material';

import { VoteParticipationResponse } from '@api/voteDto';
import FilledButton from '@components/Button/FilledButton';
import PageTitle from '@components/Typography/PageTitle';

interface VoteReceiptProps {
  voteTitle: string;
  receipt: VoteParticipationResponse;
  onBackToList: () => void;
}

const VoteReceipt = ({ voteTitle, receipt, onBackToList }: VoteReceiptProps) => {
  return (
    <div className="px-2 md:px-0">
      <PageTitle>투표 영수증</PageTitle>

      <div className="overflow-hidden rounded-sm border border-white/20 bg-middleBlack">
        <div className="border-b border-white/10 bg-subBlack px-5 py-5 sm:px-8">
          <Typography variant="h3" className="!font-semibold">
            {voteTitle}
          </Typography>
          <Typography className="!mt-2 !text-sm text-white/60">
            서버가 발급한 영수증과 저장된 선택 정보입니다.
          </Typography>
        </div>

        <div className="space-y-8 px-5 py-6 sm:px-8 sm:py-8">
          <section>
            <Typography component="h2" className="!font-semibold text-pointBlue">
              영수증 토큰
            </Typography>
            <div className="mt-3 rounded-sm border border-white/10 bg-subBlack px-4 py-3">
              <code className="break-all text-sm text-white/80">{receipt.receiptToken}</code>
            </div>
            <Typography className="!mt-2 !text-xs text-white/50">
              이 화면을 벗어나기 전에 이 영수증을 캡쳐해두세요.
            </Typography>
          </section>

          <section>
            <Typography component="h2" className="!font-semibold text-pointBlue">
              선택 정보
            </Typography>

            <div className="mt-3 max-h-[50vh] space-y-3 overflow-y-auto pr-1">
              {receipt.selections.map((selection) => (
                <div key={selection.agendaId} className="rounded-sm border border-white/10 bg-subBlack px-4 py-3">
                  <Typography component="h3" className="!text-sm !font-semibold text-white/60">
                    {selection.agendaTitle}
                  </Typography>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selection.options.map((option) => (
                      <span key={option.optionId} className="rounded-sm bg-pointBlue/20 px-2.5 py-1 text-sm text-white">
                        {option.content}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="flex justify-end">
            <FilledButton onClick={onBackToList}>투표 목록으로</FilledButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoteReceipt;
