import React, { FormEvent, useState } from 'react';
import { InputLabel, Typography } from '@mui/material';
import { DateTime } from 'luxon';

import { Role } from '@api/dto';
import { useGetMemberInfoQuery } from '@api/dutyManageApi';
import ActionButton from '@components/Button/ActionButton';
import FilledButton from '@components/Button/FilledButton';
import TextButton from '@components/Button/TextButton';
import StandardDateTimePicker from '@components/DatePicker/StandardDateTimePicker';
import AutoComplete, { MultiAutoCompleteValue } from '@components/Input/AutoComplete';
import StandardInput from '@components/Input/StandardInput';
import VoteAgendaInput, { VoteAgendaDraft, VoteAgendaPatch, VoteOptionDraft } from './VoteAgendaInput';

const TITLE_MAX_LENGTH = 500;
const DESCRIPTION_MAX_LENGTH = 16_383;

const roleOptions: { value: Role; label: string }[] = [
  { value: 'ROLE_회장', label: '회장' },
  { value: 'ROLE_부회장', label: '부회장' },
  { value: 'ROLE_대외부장', label: '대외부장' },
  { value: 'ROLE_학술부장', label: '학술부장' },
  { value: 'ROLE_FRONT_전산관리자', label: 'FRONT 전산관리자' },
  { value: 'ROLE_서기', label: '서기' },
  { value: 'ROLE_총무', label: '총무' },
  { value: 'ROLE_사서', label: '사서' },
  { value: 'ROLE_회원', label: '회원' },
  { value: 'ROLE_출제자', label: '출제자' },
  { value: 'ROLE_BACK_전산관리자', label: 'BACK 전산관리자' },
  { value: 'ROLE_INFRA_전산관리자', label: 'INFRA 전산관리자' },
];

let draftId = 0;

const createDraftId = () => {
  draftId += 1;
  return draftId;
};

const createOptionDraft = (): VoteOptionDraft => ({
  id: createDraftId(),
  content: '',
});

const createAgendaDraft = (): VoteAgendaDraft => ({
  id: createDraftId(),
  title: '',
  minSelect: '1',
  maxSelect: '1',
  options: [createOptionDraft(), createOptionDraft()],
});

const preventFormSubmit = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
};

interface VoteCreationProps {
  onCancel: () => void;
}

const VoteCreation = ({ onCancel }: VoteCreationProps) => {
  const { data: members, isPending: isMembersPending, isError: isMembersError } = useGetMemberInfoQuery();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startAt, setStartAt] = useState<DateTime | null>(null);
  const [endAt, setEndAt] = useState<DateTime | null>(null);
  const [permittedRoles, setPermittedRoles] = useState<MultiAutoCompleteValue>([]);
  const [permittedMembers, setPermittedMembers] = useState<MultiAutoCompleteValue>([]);
  const [agendas, setAgendas] = useState<VoteAgendaDraft[]>(() => [createAgendaDraft()]);

  const memberOptions = (members ?? [])
    .map((member) => ({
      value: member.memberId,
      label: `${member.realName} (${member.generation})`,
      group: member.generation,
    }))
    .toSorted(
      (firstMember, secondMember) =>
        Number.parseFloat(firstMember.group) - Number.parseFloat(secondMember.group) ||
        firstMember.label.localeCompare(secondMember.label),
    );

  const hasInvalidPeriod = Boolean(startAt && endAt && endAt.toMillis() <= startAt.toMillis());
  const hasValidPeriod = Boolean(startAt?.isValid && endAt?.isValid && endAt.toMillis() > startAt.toMillis());
  const hasValidAgendas = agendas.every(
    (agenda) => agenda.title.trim() && agenda.options.every((option) => option.content.trim()),
  );
  const canCreateVote = Boolean(title.trim() && hasValidPeriod && hasValidAgendas);

  const handleAgendaChange = (agendaId: number, patch: VoteAgendaPatch) => {
    setAgendas((currentAgendas) =>
      currentAgendas.map((agenda) => (agenda.id === agendaId ? { ...agenda, ...patch } : agenda)),
    );
  };

  const handleAgendaDelete = (agendaId: number) => {
    setAgendas((currentAgendas) =>
      currentAgendas.length === 1 ? currentAgendas : currentAgendas.filter((agenda) => agenda.id !== agendaId),
    );
  };

  const handleOptionAdd = (agendaId: number) => {
    setAgendas((currentAgendas) =>
      currentAgendas.map((agenda) =>
        agenda.id === agendaId ? { ...agenda, options: [...agenda.options, createOptionDraft()] } : agenda,
      ),
    );
  };

  const handleOptionsAdd = (agendaId: number, contents: string[]) => {
    setAgendas((currentAgendas) =>
      currentAgendas.map((agenda) => {
        if (agenda.id !== agendaId) return agenda;

        const addedOptions = contents.map((content) => ({ ...createOptionDraft(), content }));
        const options = agenda.options.every((option) => !option.content.trim())
          ? addedOptions
          : [...agenda.options, ...addedOptions];

        return { ...agenda, options };
      }),
    );
  };

  const handleOptionChange = (agendaId: number, optionId: number, content: string) => {
    setAgendas((currentAgendas) =>
      currentAgendas.map((agenda) =>
        agenda.id === agendaId
          ? {
              ...agenda,
              options: agenda.options.map((option) => (option.id === optionId ? { ...option, content } : option)),
            }
          : agenda,
      ),
    );
  };

  const handleOptionDelete = (agendaId: number, optionId: number) => {
    setAgendas((currentAgendas) =>
      currentAgendas.map((agenda) => {
        if (agenda.id !== agendaId || agenda.options.length === 1) return agenda;

        return {
          ...agenda,
          options: agenda.options.filter((option) => option.id !== optionId),
        };
      }),
    );
  };

  return (
    <div className="mx-auto max-w-4xl">
      <form className="space-y-8" onSubmit={preventFormSubmit}>
        <section className="rounded-sm border border-white/10 bg-middleBlack p-5 sm:p-7">
          <div className="mb-6">
            <Typography variant="h3" className="!font-semibold text-pointBlue">
              기본 정보
            </Typography>
            <Typography className="!mt-1 !text-sm text-white/50">투표 제목과 안내 내용을 입력해 주세요.</Typography>
          </div>

          <div className="space-y-6">
            <div>
              <InputLabel required className="!font-semibold">
                제목
              </InputLabel>
              <StandardInput
                className="w-full"
                hasBackground
                value={title}
                placeholder="투표 제목을 입력해 주세요."
                inputProps={{ maxLength: TITLE_MAX_LENGTH }}
                onChange={(event) => setTitle(event.target.value)}
              />
              <Typography variant="small" className="block !pt-1 text-right text-white/40">
                {title.length} / {TITLE_MAX_LENGTH}
              </Typography>
            </div>

            <div>
              <InputLabel className="!font-semibold">설명</InputLabel>
              <StandardInput
                className="w-full"
                hasBackground
                value={description}
                placeholder="투표 목적이나 참여 시 유의사항을 입력해 주세요."
                inputProps={{ maxLength: DESCRIPTION_MAX_LENGTH }}
                onChange={(event) => setDescription(event.target.value)}
              />
              <Typography variant="small" className="block !pt-1 text-right text-white/40">
                {description.length} / {DESCRIPTION_MAX_LENGTH}
              </Typography>
            </div>
          </div>
        </section>

        <section className="rounded-sm border border-white/10 bg-middleBlack p-5 sm:p-7">
          <div className="mb-6">
            <Typography variant="h3" className="!font-semibold text-pointBlue">
              투표 기간
            </Typography>
            <Typography className="!mt-1 !text-sm text-white/50">종료 일시는 시작 일시보다 늦어야 합니다.</Typography>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <StandardDateTimePicker
              className="w-full"
              hasBackground
              label="시작 일시 *"
              value={startAt}
              onChange={setStartAt}
            />
            <StandardDateTimePicker
              className="w-full"
              hasBackground
              label="종료 일시 *"
              value={endAt}
              minDateTime={startAt ?? undefined}
              error={hasInvalidPeriod}
              helperText={hasInvalidPeriod ? '종료 일시는 시작 일시보다 늦어야 합니다.' : undefined}
              onChange={setEndAt}
            />
          </div>
        </section>

        <section className="rounded-sm border border-white/10 bg-middleBlack p-5 sm:p-7">
          <div className="mb-6">
            <Typography variant="h3" className="!font-semibold text-pointBlue">
              참여 권한
            </Typography>
            <Typography className="!mt-1 !text-sm text-white/50">
              선택한 역할에 속하거나 아래에서 직접 지정된 회원에게 투표 참여 권한이 부여됩니다.
            </Typography>
          </div>

          <div className="space-y-6">
            <div>
              <InputLabel className="!font-semibold">역할로 허용</InputLabel>
              <AutoComplete
                className="w-full"
                multiple
                value={permittedRoles}
                items={roleOptions}
                placeholder="참여를 허용할 역할을 선택해 주세요."
                onChange={setPermittedRoles}
              />
            </div>

            <div>
              <InputLabel className="!font-semibold">회원별 허용</InputLabel>
              <AutoComplete
                className="w-full"
                multiple
                grouped
                value={permittedMembers}
                items={memberOptions}
                placeholder={
                  isMembersPending ? '회원 목록을 불러오는 중입니다.' : '참여를 허용할 회원을 선택해 주세요.'
                }
                onChange={setPermittedMembers}
              />
              {isMembersError && (
                <Typography className="!mt-2 !text-sm text-subRed">회원 목록을 불러오지 못했습니다.</Typography>
              )}
            </div>
          </div>
        </section>

        <section className="rounded-sm border border-white/10 bg-middleBlack p-5 sm:p-7">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <Typography variant="h3" className="!font-semibold text-pointBlue">
                안건 및 선택지
              </Typography>
              <Typography className="!mt-1 !text-sm text-white/50">
                안건별 선택지와 최소·최대 선택 수를 설정해 주세요.
              </Typography>
            </div>
            <ActionButton
              mode="add"
              type="button"
              onClick={() => setAgendas((current) => [...current, createAgendaDraft()])}
            >
              안건 추가
            </ActionButton>
          </div>

          <div className="space-y-5">
            {agendas.map((agenda, agendaIndex) => (
              <VoteAgendaInput
                key={agenda.id}
                agenda={agenda}
                agendaIndex={agendaIndex}
                canDeleteAgenda={agendas.length > 1}
                onAgendaChange={handleAgendaChange}
                onAgendaDelete={handleAgendaDelete}
                onOptionAdd={handleOptionAdd}
                onOptionsAdd={handleOptionsAdd}
                onOptionChange={handleOptionChange}
                onOptionDelete={handleOptionDelete}
              />
            ))}
          </div>
        </section>

        <div className="flex justify-end gap-2">
          <TextButton type="button" onClick={onCancel}>
            취소
          </TextButton>
          <FilledButton type="submit" disabled={!canCreateVote}>
            투표 생성
          </FilledButton>
        </div>
      </form>
    </div>
  );
};

export default VoteCreation;
