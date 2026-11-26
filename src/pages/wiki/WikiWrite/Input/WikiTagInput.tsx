import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Autocomplete, AutocompleteChangeDetails, AutocompleteChangeReason, TextField } from '@mui/material';
import { createFilterOptions } from '@mui/material/Autocomplete';
import { useQueryClient } from '@tanstack/react-query';
import { VscAdd } from 'react-icons/vsc';
import {
  getWikiErrorStatus,
  getWikiTags,
  useCreateWikiTagMutation,
  useGetWikiTagListQuery,
  wikiKeys,
} from '@api/wikiApi';
import { WikiTag } from '@api/wikiDto';
import { WIKI_LIMITS } from '@constants/wiki';
import Chip from '@components/Chip/Chip';

/** 자동완성 후보. isNew이면 아직 없는 이름이고, 고르면 그 이름으로 태그를 새로 만듭니다. */
interface WikiTagOption extends WikiTag {
  documentCount?: number;
  isNew?: boolean;
}

const NEW_TAG_OPTION_ID = -1;

const WIKI_TAG_MSG = {
  duplicated: '같은 이름의 태그가 이미 있습니다. 목록에서 골라주세요.',
  createFail: '태그를 만들지 못했습니다. 잠시 후 다시 시도해주세요.',
  loadFail: '태그 목록을 불러오지 못했습니다.',
} as const;

const filterTagOptions = createFilterOptions<WikiTagOption>({ stringify: ({ name }) => name });

/* NOTE 서버는 태그 이름 중복을 대소문자와 악센트를 무시하고 판정하므로 같은 기준으로 비교합니다. */
const isSameTagName = (a: string, b: string) => a.localeCompare(b, undefined, { sensitivity: 'base' }) === 0;

interface WikiTagInputProps {
  value: WikiTag[];
  onChange: (tags: WikiTag[]) => void;
  disabled?: boolean;
}

/* NOTE 기존 태그를 고르거나, 목록에 없는 이름을 입력해 새 태그를 만들 수 있습니다.
  여기서는 선택만 바꾸고, 문서에 붙이는 저장(PUT /wiki/docs/{docId}/tags)은 부모가 합니다.
  단, 새 태그는 고르는 즉시 서버에 만들어지고 지울 수 없으므로 "새 태그 만들기" 항목을 직접 골라야만 만들어집니다. */
const WikiTagInput = ({ value, onChange, disabled = false }: WikiTagInputProps) => {
  const queryClient = useQueryClient();
  const { data: tags = [], isLoading, isError } = useGetWikiTagListQuery();
  const { mutate: createWikiTag, isPending: isCreating } = useCreateWikiTagMutation();
  const [inputValue, setInputValue] = useState('');

  const isFull = value.length >= WIKI_LIMITS.TAGS_PER_DOCUMENT_MAX;

  const selectTag = ({ tagId, name }: WikiTag) => {
    if (value.some((tag) => tag.tagId === tagId)) return;
    onChange([...value, { tagId, name }]);
  };

  /* NOTE 409 응답에는 이미 있는 태그의 tagId가 없으므로 태그 목록을 다시 조회해 같은 이름의 태그를 고릅니다. */
  const selectExistingTag = (name: string) => {
    queryClient
      .fetchQuery({ queryKey: wikiKeys.tagList(), queryFn: getWikiTags, staleTime: 0 })
      .then((latestTags) => {
        const existingTag = latestTags.find((tag) => isSameTagName(tag.name, name));

        if (existingTag) selectTag(existingTag);
        else toast.error(WIKI_TAG_MSG.duplicated);
      })
      .catch(() => {
        toast.error(WIKI_TAG_MSG.duplicated);
      });
  };

  const handleChange = (
    _event: React.SyntheticEvent,
    newValue: WikiTagOption[],
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<WikiTagOption>,
  ) => {
    // 태그를 만드는 동안 선택이 바뀌면 만든 태그를 붙일 때 그 변경이 사라지므로 막습니다.
    if (isCreating) return;

    const option = details?.option;

    if (reason === 'selectOption' && option?.isNew) {
      const { name } = option;

      createWikiTag(
        { name },
        {
          onSuccess: selectTag,
          onError: (error) => {
            const status = getWikiErrorStatus(error);

            // 401은 전역 에러 핸들러가 로그인 페이지로 보냅니다.
            if (status === 401) return;
            if (status === 409) {
              selectExistingTag(name);
              return;
            }
            toast.error(WIKI_TAG_MSG.createFail);
          },
        },
      );
      return;
    }

    onChange(newValue.filter(({ isNew }) => !isNew).map(({ tagId, name }) => ({ tagId, name })));
  };

  const getHelperText = () => {
    if (isError) return WIKI_TAG_MSG.loadFail;
    if (isFull) return `태그는 문서당 ${WIKI_LIMITS.TAGS_PER_DOCUMENT_MAX}개까지 지정할 수 있습니다.`;
    return '';
  };

  return (
    <Autocomplete<WikiTagOption, true, true>
      multiple
      autoHighlight
      filterSelectedOptions
      // 한 번에 모든 태그를 지우는 버튼은 실수로 누르기 쉬워 숨깁니다.
      disableClearable
      inputValue={inputValue}
      onInputChange={(event, newInputValue, reason) => {
        /* NOTE 선택(value)이 바뀔 때마다 MUI가 event 없이 입력값을 비웁니다.
          새 태그를 만드는 동안 이어서 입력한 글자까지 지워지므로 이 경우는 무시합니다. */
        if (reason === 'reset' && !event) return;
        setInputValue(newInputValue);
      }}
      disabled={disabled}
      options={tags}
      value={value}
      onChange={handleChange}
      loading={isLoading}
      loadingText="태그 목록을 불러오는 중입니다."
      noOptionsText="선택할 수 있는 태그가 없습니다."
      getOptionKey={({ tagId }) => tagId}
      getOptionLabel={({ name }) => name}
      getOptionDisabled={() => isFull}
      isOptionEqualToValue={(option, tag) => option.tagId === tag.tagId}
      filterOptions={(options, state) => {
        const filtered = filterTagOptions(options, state);
        const name = state.inputValue.trim();
        const canCreate =
          name !== '' &&
          name.length <= WIKI_LIMITS.TAG_NAME_MAX &&
          !tags.some((tag) => isSameTagName(tag.name, name)) &&
          !value.some((tag) => isSameTagName(tag.name, name));

        if (canCreate) filtered.push({ tagId: NEW_TAG_OPTION_ID, name, isNew: true });

        return filtered;
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          InputProps={{
            ...params.InputProps,
            className: `before:!border-pointBlue pr-1 ${params.InputProps.className}`,
          }}
          inputProps={{
            ...params.inputProps,
            // 선택한 태그 옆 자리가 좁으면 입력창이 다음 줄로 내려가도록 최소 너비를 둡니다.
            className: `${params.inputProps.className} !min-w-32`,
            maxLength: WIKI_LIMITS.TAG_NAME_MAX,
            'aria-label': '태그',
          }}
          placeholder={value.length === 0 ? '태그를 검색하거나 새로 만들어 보세요 (선택)' : ''}
          error={isError}
          helperText={getHelperText()}
        />
      )}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((tag, index) => {
          const { key, ...tagProps } = getTagProps({ index });
          return <Chip key={key} label={tag.name} {...tagProps} />;
        })
      }
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;

        return (
          <li key={key} {...optionProps}>
            {option.isNew ? (
              <span className="flex min-w-0 items-center gap-1 text-pointBlue">
                <VscAdd className="shrink-0" aria-hidden />
                <span className="min-w-0 break-all">
                  새 태그 <b>{option.name}</b> 만들기
                </span>
              </span>
            ) : (
              <>
                <span className="min-w-0 break-all">{option.name}</span>
                <span className="ml-auto shrink-0 pl-3 text-xs text-gray-400">문서 {option.documentCount ?? 0}</span>
              </>
            )}
          </li>
        );
      }}
    />
  );
};

export default WikiTagInput;
