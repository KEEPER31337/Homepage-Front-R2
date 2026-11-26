import React from 'react';
import { Typography } from '@mui/material';
import { WikiTag } from '@api/wikiDto';
import { COMMON } from '@constants/helperText';
import { WIKI_LIMITS } from '@constants/wiki';
import StandardInput from '@components/Input/StandardInput';
import ActionModal from '@components/Modal/ActionModal';
import WikiTagInput from '../Input/WikiTagInput';

interface WikiWriteSummaryModalProps {
  open: boolean;
  onClose: () => void;
  isEditMode: boolean;
  isSaving: boolean;
  /** 제목이나 본문이 바뀌었는지. 바뀌지 않았으면 새 리비전을 만들지 않으므로 편집 요약을 받지 않습니다. */
  isDocChanged: boolean;
  isTagsChanged: boolean;
  editSummary: string;
  setEditSummary: React.Dispatch<React.SetStateAction<string>>;
  tags: WikiTag[];
  setTags: (tags: WikiTag[]) => void;
  onSaveButtonClick: () => void;
}

const WikiWriteSummaryModal = ({
  open,
  onClose,
  isEditMode,
  isSaving,
  isDocChanged,
  isTagsChanged,
  editSummary,
  setEditSummary,
  tags,
  setTags,
  onSaveButtonClick,
}: WikiWriteSummaryModalProps) => {
  const isTooLong = isDocChanged && editSummary.length > WIKI_LIMITS.EDIT_SUMMARY_MAX;
  const isChanged = isDocChanged || isTagsChanged;

  return (
    <ActionModal
      modalWidth="xs"
      open={open}
      onClose={onClose}
      title={`편집 요약 및 ${isEditMode ? '수정' : '작성'}`}
      cancelButtonDisabled={isSaving}
      actionButtonDisabled={isTooLong || isSaving || !isChanged}
      actionButtonName={isEditMode ? '수정하기' : '작성완료'}
      onActionButonClick={onSaveButtonClick}
    >
      <div className="space-y-6">
        <div>
          <Typography variant="small" fontWeight="semibold" component="label" htmlFor="wiki-edit-summary">
            편집 요약
          </Typography>
          <StandardInput
            id="wiki-edit-summary"
            className="w-full"
            value={isDocChanged ? editSummary : ''}
            onChange={(e) => setEditSummary(e.target.value)}
            placeholder={
              isDocChanged
                ? '무엇을 바꿨는지 간단히 적어주세요 (선택)'
                : '제목과 본문이 바뀌지 않아 편집 요약을 추가할 수 없습니다.'
            }
            disabled={!isDocChanged || isSaving}
            error={isTooLong}
            helperText={isTooLong ? COMMON.error.maxLength(WIKI_LIMITS.EDIT_SUMMARY_MAX) : ''}
          />
        </div>
        <div>
          <Typography variant="small" fontWeight="semibold" component="p">
            태그{' '}
            <span className="font-normal text-subGray">
              {tags.length}/{WIKI_LIMITS.TAGS_PER_DOCUMENT_MAX}
            </span>
          </Typography>
          <WikiTagInput value={tags} onChange={setTags} disabled={isSaving} />
        </div>
      </div>
    </ActionModal>
  );
};

export default WikiWriteSummaryModal;
