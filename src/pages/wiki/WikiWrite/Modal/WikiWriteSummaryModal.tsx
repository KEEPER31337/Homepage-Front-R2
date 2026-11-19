import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import { COMMON } from '@constants/helperText';
import { WIKI_LIMITS } from '@constants/wiki';
import StandardInput from '@components/Input/StandardInput';
import ActionModal from '@components/Modal/ActionModal';

interface WikiWriteSummaryModalProps {
  open: boolean;
  onClose: () => void;
  isEditMode: boolean;
  isSaving: boolean;
  editSummary: string;
  setEditSummary: React.Dispatch<React.SetStateAction<string>>;
  onSaveButtonClick: () => void;
}

const WikiWriteSummaryModal = ({
  open,
  onClose,
  isEditMode,
  isSaving,
  editSummary,
  setEditSummary,
  onSaveButtonClick,
}: WikiWriteSummaryModalProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const isTooLong = editSummary.length > WIKI_LIMITS.EDIT_SUMMARY_MAX;

  return (
    <ActionModal
      modalWidth={isMobile ? 'sm' : undefined}
      open={open}
      onClose={onClose}
      title={`편집 요약 및 ${isEditMode ? '수정' : '작성'}`}
      cancelButtonDisabled={isSaving}
      actionButtonDisabled={isTooLong || isSaving}
      actionButtonName={isEditMode ? '수정하기' : '작성완료'}
      onActionButonClick={onSaveButtonClick}
    >
      <StandardInput
        className="w-full"
        value={editSummary}
        onChange={(e) => setEditSummary(e.target.value)}
        placeholder="무엇을 바꿨는지 간단히 적어주세요 (선택)"
        error={isTooLong}
        helperText={isTooLong && COMMON.error.maxLength(WIKI_LIMITS.EDIT_SUMMARY_MAX)}
      />
    </ActionModal>
  );
};

export default WikiWriteSummaryModal;
