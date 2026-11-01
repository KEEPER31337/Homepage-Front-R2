import { useEffect, useRef, useState } from 'react';
import { useTheme } from '@mui/material';

/**
 * Dialog의 exit 타이머는 커밋 이후에 시작되므로, 그보다 늦게 언마운트되도록 여유를 둡니다.
 */
const EXIT_TRANSITION_BUFFER_MS = 50;

/**
 * 모달을 열 때 마운트하고, MUI Dialog의 exit 애니메이션이 끝난 뒤 언마운트합니다.
 * 모달 내부 상태(useState, useForm 등)는 언마운트로 초기화되므로 닫을 때 수동 reset이 필요 없습니다.
 *
 * @example
 * const studyModal = useModal<StudyInfo>();
 *
 * <ActionButton onClick={() => studyModal.open()}>추가</ActionButton>
 * <ActionButton onClick={() => studyModal.open(study)}>수정</ActionButton>
 * {studyModal.isMounted && (
 *   <StudyModal
 *     key={studyModal.key}
 *     open={studyModal.isOpen}
 *     onClose={studyModal.close}
 *     selectedStudy={studyModal.data}
 *   />
 * )}
 */
const useModal = <T = undefined>() => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [key, setKey] = useState(0);
  const exitTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const open = (nextData?: T) => {
    clearTimeout(exitTimer.current);
    setData(nextData ?? null);
    // exit 애니메이션 도중 다시 열리면 이전 인스턴스가 재사용되지 않도록 key를 갱신합니다.
    setKey((prev) => prev + 1);
    setIsMounted(true);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    exitTimer.current = setTimeout(
      () => setIsMounted(false),
      theme.transitions.duration.leavingScreen + EXIT_TRANSITION_BUFFER_MS,
    );
  };

  useEffect(() => () => clearTimeout(exitTimer.current), []);

  return { isOpen, isMounted, data, key, open, close };
};

export default useModal;
