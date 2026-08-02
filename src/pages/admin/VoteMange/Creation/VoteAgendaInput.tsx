import React, { useState } from 'react';
import { IconButton, InputLabel, Typography } from '@mui/material';
import { VscTrash } from 'react-icons/vsc';

import ActionButton from '@components/Button/ActionButton';
import FilledButton from '@components/Button/FilledButton';
import OutlinedButton from '@components/Button/OutlinedButton';
import TextButton from '@components/Button/TextButton';
import StandardInput from '@components/Input/StandardInput';

const OPTION_MAX_LENGTH = 500;

interface VoteOptionDraft {
  id: number;
  content: string;
}

interface VoteAgendaDraft {
  id: number;
  title: string;
  minSelect: string;
  maxSelect: string;
  options: VoteOptionDraft[];
}

type VoteAgendaPatch = Partial<Pick<VoteAgendaDraft, 'title' | 'minSelect' | 'maxSelect'>>;

interface VoteAgendaInputProps {
  agenda: VoteAgendaDraft;
  agendaIndex: number;
  canDeleteAgenda: boolean;
  onAgendaChange: (agendaId: number, patch: VoteAgendaPatch) => void;
  onAgendaDelete: (agendaId: number) => void;
  onOptionAdd: (agendaId: number) => void;
  onOptionsAdd: (agendaId: number, contents: string[]) => void;
  onOptionChange: (agendaId: number, optionId: number, content: string) => void;
  onOptionDelete: (agendaId: number, optionId: number) => void;
}

const VoteAgendaInput = ({
  agenda,
  agendaIndex,
  canDeleteAgenda,
  onAgendaChange,
  onAgendaDelete,
  onOptionAdd,
  onOptionsAdd,
  onOptionChange,
  onOptionDelete,
}: VoteAgendaInputProps) => {
  const [isBulkInputOpen, setIsBulkInputOpen] = useState(false);
  const [bulkOptionText, setBulkOptionText] = useState('');

  const bulkOptionContents = bulkOptionText
    .split(/\r?\n/)
    .map((content) => content.trim())
    .filter(Boolean);
  const hasOverlongBulkOption = bulkOptionContents.some((content) => content.length > OPTION_MAX_LENGTH);
  const canAddBulkOptions = bulkOptionContents.length > 0 && !hasOverlongBulkOption;

  const closeBulkInput = () => {
    setIsBulkInputOpen(false);
    setBulkOptionText('');
  };

  const handleBulkOptionsAdd = () => {
    if (!canAddBulkOptions) return;

    onOptionsAdd(agenda.id, bulkOptionContents);
    closeBulkInput();
  };

  return (
    <div className="rounded-sm border border-white/10 bg-subBlack/60 p-4 sm:p-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <Typography variant="h3" className="!font-semibold text-pointBlue">
          안건 {agendaIndex + 1}
        </Typography>
        <ActionButton
          mode="delete"
          type="button"
          small
          disabled={!canDeleteAgenda}
          onClick={() => onAgendaDelete(agenda.id)}
        >
          안건 삭제
        </ActionButton>
      </div>

      <div className="space-y-6">
        <div>
          <InputLabel required className="!font-semibold">
            안건 제목
          </InputLabel>
          <StandardInput
            className="w-full"
            value={agenda.title}
            placeholder="안건 제목을 입력해 주세요."
            inputProps={{ maxLength: 500 }}
            onChange={(event) => onAgendaChange(agenda.id, { title: event.target.value })}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <InputLabel required className="!font-semibold">
              최소 선택 수
            </InputLabel>
            <StandardInput
              className="w-full"
              hasBackground
              type="number"
              value={agenda.minSelect}
              onChange={(event) => onAgendaChange(agenda.id, { minSelect: event.target.value })}
            />
          </div>
          <div>
            <InputLabel required className="!font-semibold">
              최대 선택 수
            </InputLabel>
            <StandardInput
              className="w-full"
              hasBackground
              type="number"
              value={agenda.maxSelect}
              onChange={(event) => onAgendaChange(agenda.id, { maxSelect: event.target.value })}
            />
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between gap-4">
            <InputLabel required className="!font-semibold">
              선택지
            </InputLabel>
            <div className="flex flex-wrap justify-end gap-2">
              <ActionButton mode="add" type="button" small onClick={() => onOptionAdd(agenda.id)}>
                선택지 추가
              </ActionButton>
              <OutlinedButton type="button" small onClick={() => setIsBulkInputOpen((current) => !current)}>
                {isBulkInputOpen ? '일괄 입력 닫기' : '한 번에 추가'}
              </OutlinedButton>
            </div>
          </div>

          {isBulkInputOpen && (
            <div className="mb-5 rounded-sm border border-pointBlue/30 bg-middleBlack p-4">
              <StandardInput
                className="w-full"
                value={bulkOptionText}
                multiline
                minRows={4}
                placeholder={'후보 A\n후보 B\n후보 C'}
                error={hasOverlongBulkOption}
                helperText={hasOverlongBulkOption ? `각 선택지는 ${OPTION_MAX_LENGTH}자 이하여야 합니다.` : undefined}
                onChange={(event) => setBulkOptionText(event.target.value)}
              />
              <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <Typography className="!text-sm text-white/50">
                  한 줄에 선택지 하나씩 입력해 주세요. 빈 줄은 제외됩니다.
                </Typography>
                <div className="flex shrink-0 justify-end gap-1">
                  <TextButton type="button" small onClick={closeBulkInput}>
                    취소
                  </TextButton>
                  <FilledButton type="button" small disabled={!canAddBulkOptions} onClick={handleBulkOptionsAdd}>
                    목록에 추가
                  </FilledButton>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {agenda.options.map((option, optionIndex) => (
              <div key={option.id} className="flex items-start gap-2 sm:gap-3">
                <Typography className="w-6 shrink-0 !pt-3 text-center text-white/50">{optionIndex + 1}</Typography>
                <StandardInput
                  className="min-w-0 flex-1"
                  hasBackground
                  value={option.content}
                  placeholder={`선택지 ${optionIndex + 1}`}
                  inputProps={{ maxLength: 500 }}
                  onChange={(event) => onOptionChange(agenda.id, option.id, event.target.value)}
                />
                <IconButton
                  aria-label={`선택지 ${optionIndex + 1} 삭제`}
                  className="!mt-1"
                  type="button"
                  disabled={agenda.options.length === 1}
                  onClick={() => onOptionDelete(agenda.id, option.id)}
                >
                  <VscTrash className={agenda.options.length === 1 ? 'fill-subGray' : 'fill-subRed'} size={20} />
                </IconButton>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export type { VoteAgendaDraft, VoteAgendaPatch, VoteOptionDraft };
export default VoteAgendaInput;
