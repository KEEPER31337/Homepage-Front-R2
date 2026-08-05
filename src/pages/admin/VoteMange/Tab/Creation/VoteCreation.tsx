import React, { FormEvent, useMemo, useState } from 'react';
import { InputLabel, Typography } from '@mui/material';
import { DateTime } from 'luxon';
import { toast } from 'react-hot-toast';

import { useGetMemberInfoQuery } from '@api/dutyManageApi';
import { useCreateVoteMutation } from '@api/voteApi';
import { VoteCreationRequest } from '@api/voteDto';
import ActionButton from '@components/Button/ActionButton';
import FilledButton from '@components/Button/FilledButton';
import OutlinedButton from '@components/Button/OutlinedButton';
import TextButton from '@components/Button/TextButton';
import StandardDateTimePicker from '@components/DatePicker/StandardDateTimePicker';
import AutoComplete, { MultiAutoCompleteValue } from '@components/Input/AutoComplete';
import StandardInput from '@components/Input/StandardInput';
import VoteAgendaInput, { VoteAgendaDraft, VoteAgendaPatch, VoteOptionDraft } from './VoteAgendaInput';

const TITLE_MAX_LENGTH = 500;
const DESCRIPTION_MAX_LENGTH = 16_383;
const BULK_MEMBER_ENTRY_PATTERN = /^(\d+(?:\.\d+)?)기_(.+)$/;

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

interface VoteCreationProps {
  onCancel: () => void;
}

interface VoteCreationErrorResponse {
  response?: {
    data?: {
      message?: unknown;
    };
  };
}

interface MemberOption {
  value: number;
  label: string;
  group: string;
}

interface BulkMemberIssue {
  entry: string;
  message: string;
}

interface BulkMemberResult {
  addedCount: number;
  issues: BulkMemberIssue[];
}

const normalizeGeneration = (generation: string) => {
  const parsedGeneration = Number(generation.trim());

  return Number.isFinite(parsedGeneration) ? parsedGeneration.toString() : generation.trim();
};

const normalizeMemberName = (name: string) => name.trim().normalize('NFC');

const createMemberLookupKey = (generation: string, name: string) =>
  `${normalizeGeneration(generation)}\u0000${normalizeMemberName(name)}`;

const parseBulkMemberEntry = (entry: string) => {
  const match = BULK_MEMBER_ENTRY_PATTERN.exec(entry);

  if (!match) return null;

  return {
    generation: normalizeGeneration(match[1]),
    name: normalizeMemberName(match[2]),
  };
};

const formatVoteRequestDateTime = (dateTime: DateTime) => dateTime.toFormat("yyyy-MM-dd'T'HH:mm:ss");

const getVoteCreationErrorMessage = (error: unknown) => {
  const message = (error as VoteCreationErrorResponse)?.response?.data?.message;

  return typeof message === 'string' && message.trim() ? message : '투표 생성에 실패했습니다.';
};

const VoteCreation = ({ onCancel }: VoteCreationProps) => {
  const { data: members, isPending: isMembersPending, isError: isMembersError } = useGetMemberInfoQuery();
  const { mutate: createVote, isPending: isVoteCreationPending } = useCreateVoteMutation();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startAt, setStartAt] = useState<DateTime | null>(null);
  const [endAt, setEndAt] = useState<DateTime | null>(null);
  const [permittedMembers, setPermittedMembers] = useState<MultiAutoCompleteValue>([]);
  const [isBulkMemberInputOpen, setIsBulkMemberInputOpen] = useState(false);
  const [bulkMemberText, setBulkMemberText] = useState('');
  const [bulkMemberResult, setBulkMemberResult] = useState<BulkMemberResult | null>(null);
  const [agendas, setAgendas] = useState<VoteAgendaDraft[]>(() => [createAgendaDraft()]);

  const { memberOptions, memberLookup } = useMemo(() => {
    const options: MemberOption[] = [];
    const lookup = new Map<string, MemberOption[]>();

    (members ?? []).forEach((member) => {
      const option = {
        value: member.memberId,
        label: `${member.realName} (${member.generation})`,
        group: member.generation,
      };
      const lookupKey = createMemberLookupKey(member.generation, member.realName);
      const matchingOptions = lookup.get(lookupKey);

      options.push(option);

      if (matchingOptions) {
        matchingOptions.push(option);
      } else {
        lookup.set(lookupKey, [option]);
      }
    });

    return {
      memberOptions: options.toSorted(
        (firstMember, secondMember) =>
          Number.parseFloat(firstMember.group) - Number.parseFloat(secondMember.group) ||
          firstMember.label.localeCompare(secondMember.label),
      ),
      memberLookup: lookup,
    };
  }, [members]);

  const bulkMemberEntries = [
    ...new Set(
      bulkMemberText
        .split(/\r?\n/)
        .map((entry) => entry.trim())
        .filter(Boolean),
    ),
  ];
  const canAddBulkMembers = Boolean(members && bulkMemberEntries.length > 0);

  const hasInvalidPeriod = Boolean(startAt && endAt && endAt.toMillis() <= startAt.toMillis());
  const hasValidPeriod = Boolean(startAt?.isValid && endAt?.isValid && endAt.toMillis() > startAt.toMillis());
  const hasValidAgendas = agendas.every((agenda) => {
    const minSelect = Number(agenda.minSelect);
    const maxSelect = Number(agenda.maxSelect);
    const hasValidSelectionRange =
      Number.isInteger(minSelect) &&
      Number.isInteger(maxSelect) &&
      minSelect >= 1 &&
      minSelect <= maxSelect &&
      maxSelect <= agenda.options.length;

    return Boolean(
      agenda.title.trim() && agenda.options.every((option) => option.content.trim()) && hasValidSelectionRange,
    );
  });
  const canCreateVote = Boolean(title.trim() && hasValidPeriod && hasValidAgendas && !isVoteCreationPending);

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

  const closeBulkMemberInput = () => {
    setIsBulkMemberInputOpen(false);
    setBulkMemberText('');
    setBulkMemberResult(null);
  };

  const handleBulkMembersAdd = () => {
    if (!canAddBulkMembers) return;

    const selectedMemberIds = new Set(permittedMembers.map(({ value }) => value));
    const memberIdsToAdd = new Set<number>();
    const membersToAdd: MemberOption[] = [];
    const issues: BulkMemberIssue[] = [];

    bulkMemberEntries.forEach((entry) => {
      const parsedEntry = parseBulkMemberEntry(entry);

      if (!parsedEntry) {
        issues.push({ entry, message: '16기_이름 형식으로 입력해 주세요.' });
        return;
      }

      const matchingMembers = memberLookup.get(createMemberLookupKey(parsedEntry.generation, parsedEntry.name)) ?? [];

      if (matchingMembers.length === 0) {
        issues.push({ entry, message: '일치하는 회원을 찾지 못했습니다.' });
        return;
      }

      if (matchingMembers.length > 1) {
        issues.push({ entry, message: '같은 기수와 이름의 회원이 여러 명입니다. 직접 선택해 주세요.' });
        return;
      }

      const [matchingMember] = matchingMembers;

      if (selectedMemberIds.has(matchingMember.value) || memberIdsToAdd.has(matchingMember.value)) return;

      memberIdsToAdd.add(matchingMember.value);
      membersToAdd.push(matchingMember);
    });

    if (membersToAdd.length > 0) {
      setPermittedMembers((currentMembers) => [...currentMembers, ...membersToAdd]);
    }

    if (issues.length === 0) {
      closeBulkMemberInput();
      return;
    }

    setBulkMemberText(issues.map(({ entry }) => entry).join('\n'));
    setBulkMemberResult({ addedCount: membersToAdd.length, issues });
  };

  const handleVoteCreate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!canCreateVote || !startAt || !endAt) return;

    const request: VoteCreationRequest = {
      title: title.trim(),
      description: description.trim() || null,
      permitByUserIds: permittedMembers
        .map(({ value }) => value)
        .filter((memberId): memberId is number => typeof memberId === 'number'),
      startAt: formatVoteRequestDateTime(startAt),
      endAt: formatVoteRequestDateTime(endAt),
      agendas: agendas.map((agenda) => ({
        title: agenda.title.trim(),
        minSelect: Number(agenda.minSelect),
        maxSelect: Number(agenda.maxSelect),
        options: agenda.options.map((option) => ({ content: option.content.trim() })),
      })),
    };

    createVote(request, {
      onSuccess: () => {
        toast.success('투표를 생성했습니다.');
        onCancel();
      },
      onError: (error) => {
        toast.error(getVoteCreationErrorMessage(error));
      },
    });
  };

  return (
    <div className="mx-auto max-w-4xl">
      <form className="space-y-8" onSubmit={handleVoteCreate}>
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
              직접 지정된 회원에게 투표 참여 권한이 부여됩니다.
            </Typography>
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between gap-4">
              <InputLabel className="!font-semibold">회원별 허용</InputLabel>
              <OutlinedButton
                type="button"
                small
                onClick={() => (isBulkMemberInputOpen ? closeBulkMemberInput() : setIsBulkMemberInputOpen(true))}
              >
                {isBulkMemberInputOpen ? '일괄 입력 닫기' : '한 번에 추가'}
              </OutlinedButton>
            </div>

            {isBulkMemberInputOpen && (
              <div className="mb-5 rounded-sm border border-pointBlue/30 bg-subBlack/60 p-4">
                <StandardInput
                  className="w-full"
                  value={bulkMemberText}
                  multiline
                  minRows={4}
                  placeholder={'16기_최재원\n16기_최재투'}
                  onChange={(event) => {
                    setBulkMemberText(event.target.value);
                    setBulkMemberResult(null);
                  }}
                />

                {bulkMemberResult && (
                  <div className="mt-3 space-y-1 text-sm">
                    {bulkMemberResult.addedCount > 0 && (
                      <Typography className="!text-sm text-pointBlue">
                        {bulkMemberResult.addedCount}명을 회원별 허용에 추가했습니다.
                      </Typography>
                    )}
                    <ul className="list-disc space-y-1 pl-5 text-subRed">
                      {bulkMemberResult.issues.map(({ entry, message }) => (
                        <li key={entry}>
                          {entry}: {message}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <Typography className="!text-sm text-white/50">
                    한 줄에 한 명씩 16기_이름 형식으로 입력해 주세요.
                  </Typography>
                  <div className="flex shrink-0 justify-end gap-1">
                    <TextButton type="button" small onClick={closeBulkMemberInput}>
                      취소
                    </TextButton>
                    <FilledButton type="button" small disabled={!canAddBulkMembers} onClick={handleBulkMembersAdd}>
                      목록에 추가
                    </FilledButton>
                  </div>
                </div>
              </div>
            )}

            <AutoComplete
              className="w-full"
              multiple
              grouped
              value={permittedMembers}
              items={memberOptions}
              placeholder={isMembersPending ? '회원 목록을 불러오는 중입니다.' : '참여를 허용할 회원을 선택해 주세요.'}
              onChange={setPermittedMembers}
            />
            {isMembersError && (
              <Typography className="!mt-2 !text-sm text-subRed">회원 목록을 불러오지 못했습니다.</Typography>
            )}
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
          <TextButton type="button" disabled={isVoteCreationPending} onClick={onCancel}>
            취소
          </TextButton>
          <FilledButton type="submit" disabled={!canCreateVote}>
            {isVoteCreationPending ? '생성 중...' : '투표 생성'}
          </FilledButton>
        </div>
      </form>
    </div>
  );
};

export default VoteCreation;
