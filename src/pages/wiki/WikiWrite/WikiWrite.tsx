import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Stack, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import {
  getWikiDoc,
  getWikiErrorStatus,
  useCreateWikiDocMutation,
  useGetWikiDocQuery,
  useUpdateWikiDocMutation,
  wikiKeys,
} from '@api/wikiApi';
import { WikiDocument } from '@api/wikiDto';
import { COMMON } from '@constants/helperText';
import { WIKI_LIMITS } from '@constants/wiki';
import OutlinedButton from '@components/Button/OutlinedButton';
import TextButton from '@components/Button/TextButton';
import StandardEditor from '@components/Editor/StandardEditor';
import type { StandardEditorHandle } from '@components/Editor/StandardEditor';
import StandardInput from '@components/Input/StandardInput';
import PageTitle from '@components/Typography/PageTitle';
import NotFound from '@pages/NotFound/NotFound';
import WikiHidden from '@pages/wiki/WikiHidden';
import WikiEditSummaryModal from './Modal/WikiEditSummaryModal';

/* NOTE 위키 에러 응답의 message에는 사용자 입력값(본문 전체일 수도 있음)이 그대로 담기므로 화면에 띄우지 않고,
  HTTP 상태 코드에 따라 아래 문구만 보여줍니다. */
const WIKI_WRITE_MSG = {
  conflict: '다른 회원이 먼저 수정했습니다. 최신 버전을 확인해주세요.',
  latestFetchFail: '최신 버전 정보를 불러오지 못했습니다. 잠시 후 다시 저장해주세요.',
  badRequest: '입력값을 확인해주세요.',
  notFound: '문서가 더 이상 존재하지 않습니다.',
  saveFail: '저장에 실패했습니다. 잠시 후 다시 시도해주세요.',
  loadFail: '문서를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.',
} as const;

const getContentErrMsg = (content: string) => {
  if (!content.trim()) return COMMON.error.required;
  if (content.length > WIKI_LIMITS.CONTENT_MAX) return COMMON.error.maxLength(WIKI_LIMITS.CONTENT_MAX);
  return '';
};

const toastSaveError = (error: unknown) => {
  const status = getWikiErrorStatus(error);

  // 401은 전역 에러 핸들러가 로그인 페이지로 보냅니다.
  if (status === 401) return;
  if (status === 400) {
    toast.error(WIKI_WRITE_MSG.badRequest);
    return;
  }
  if (status === 404) {
    toast.error(WIKI_WRITE_MSG.notFound);
    return;
  }
  toast.error(WIKI_WRITE_MSG.saveFail);
};

interface WikiWriteFormValues {
  title: string;
}

/** 저장할 때 baseRevisionNo로 보내고, 변경 여부를 비교할 기준 리비전 */
interface WikiEditBase {
  docId: number;
  revisionNo: number;
  title: string;
}

/** 409 충돌 처리 단계. syncing은 최신 리비전으로 기준을 다시 맞추는 중이라 저장할 수 없고, 한 번 충돌하면 안내는 계속 보여줍니다. */
type WikiConflictStep = 'none' | 'syncing' | 'notified';

interface WikiWriteFormProps {
  /** 편집할 문서. 없으면 새 문서 작성.
    StandardEditor는 initialValue가 바뀌면 에디터를 다시 만들어 작성 중인 본문이 사라지므로, 마운트 이후에는 바뀌지 않는 값을 넘겨야 합니다. */
  initialDoc?: WikiDocument;
}

const WikiWriteForm = ({ initialDoc }: WikiWriteFormProps) => {
  const [editBase, setEditBase] = useState<WikiEditBase | null>(() =>
    initialDoc ? { docId: initialDoc.docId, revisionNo: initialDoc.revisionNo, title: initialDoc.title } : null,
  );
  const baseContentRef = useRef(initialDoc?.content ?? '');

  const [contentErrMsg, setContentErrMsg] = useState(() => getContentErrMsg(initialDoc?.content ?? ''));
  /* NOTE 새 문서는 처음부터 본문이 비어 있으므로, 본문을 건드리기 전에는 오류 문구를 보여주지 않습니다. */
  const [isContentTouched, setIsContentTouched] = useState(false);
  const [isContentChanged, setIsContentChanged] = useState(false);
  const [conflictStep, setConflictStep] = useState<WikiConflictStep>('none');
  const [editSummary, setEditSummary] = useState('');
  const [editSummaryModalOpen, setEditSummaryModalOpen] = useState(false);

  const editorRef = useRef<StandardEditorHandle | null>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: createWikiDoc, isPending: isCreating } = useCreateWikiDocMutation();
  const { mutate: updateWikiDoc, isPending: isUpdating } = useUpdateWikiDocMutation();
  const {
    control,
    getValues,
    formState: { isValid },
  } = useForm<WikiWriteFormValues>({
    mode: 'onChange',
    defaultValues: { title: initialDoc?.title ?? '' },
  });
  const title = useWatch({ control, name: 'title' });

  useEffect(() => {
    /* NOTE 에디터가 본문을 정규화(줄바꿈, WYSIWYG 변환 등)해서 돌려줄 수 있으므로,
      "변경 없음" 판정은 서버 원문이 아니라 에디터가 처음 돌려준 값을 기준으로 합니다. */
    const content = editorRef.current?.getInstance().getMarkdown();
    if (content !== undefined) baseContentRef.current = content;
  }, []);

  const isEditMode = editBase !== null;
  const isChanged = !editBase || title.trim() !== editBase.title || isContentChanged;
  const isSaving = isCreating || isUpdating || conflictStep === 'syncing';

  const handleEditorChange = () => {
    const editor = editorRef.current?.getInstance();
    if (!editor) return;

    const content = editor.getMarkdown();

    setContentErrMsg(getContentErrMsg(content));
    setIsContentTouched(true);
    setIsContentChanged(content !== baseContentRef.current);
  };

  /* NOTE 409 응답에는 최신 리비전 번호가 없으므로 문서 상세를 다시 조회해 다음 저장의 기준 리비전으로 삼습니다.
    에디터 본문은 건드리지 않습니다. 조회에 실패하면 기준이 그대로라 다음 저장에서 다시 409를 받고 재시도됩니다. */
  const syncBaseWithLatest = (docId: number) => {
    setConflictStep('syncing');

    queryClient
      .fetchQuery({ queryKey: wikiKeys.doc(docId), queryFn: () => getWikiDoc(docId), staleTime: 0 })
      .then((latest) => {
        setEditBase({ docId, revisionNo: latest.revisionNo, title: latest.title });
        baseContentRef.current = latest.content;
        setIsContentChanged(editorRef.current?.getInstance().getMarkdown() !== latest.content);
      })
      .catch(() => {
        toast.error(WIKI_WRITE_MSG.latestFetchFail);
      })
      .finally(() => {
        setConflictStep('notified');
      });
  };

  const handleSaveButtonClick = () => {
    const content = editorRef.current?.getInstance().getMarkdown() ?? '';
    const errMsg = getContentErrMsg(content);

    if (errMsg) {
      setContentErrMsg(errMsg);
      setIsContentTouched(true);
      return;
    }

    setEditSummaryModalOpen(true);
  };

  const handleEditSummaryModalClose = () => {
    setEditSummaryModalOpen(false);
  };

  const handleUploadButtonClick = () => {
    const trimmedEditSummary = editSummary.trim();
    const request = {
      title: getValues('title').trim(),
      content: editorRef.current?.getInstance().getMarkdown() ?? '',
      ...(trimmedEditSummary && { editSummary: trimmedEditSummary }),
    };

    if (editBase) {
      const { docId, revisionNo } = editBase;

      updateWikiDoc(
        { docId, request: { ...request, baseRevisionNo: revisionNo } },
        {
          onSuccess: () => {
            navigate(`/wiki/view/${docId}`);
          },
          onError: (error) => {
            if (getWikiErrorStatus(error) === 409) {
              // 충돌 안내가 모달에 가려지지 않도록 닫습니다. 적어 둔 편집 요약은 남아 있습니다.
              setEditSummaryModalOpen(false);
              toast.error(WIKI_WRITE_MSG.conflict);
              syncBaseWithLatest(docId);
              return;
            }
            toastSaveError(error);
          },
        },
      );
      return;
    }

    createWikiDoc(request, {
      onSuccess: ({ docId }) => {
        navigate(`/wiki/view/${docId}`);
      },
      onError: toastSaveError,
    });
  };

  const handleCancelButtonClick = () => {
    navigate(editBase ? `/wiki/view/${editBase.docId}` : '/wiki/list');
  };

  return (
    <div>
      <PageTitle>{isEditMode ? '위키 문서 편집' : '위키 문서 작성'}</PageTitle>
      <div className="mb-5 flex w-full items-center">
        <Stack className="w-full" flexDirection={{ sm: 'row' }}>
          <Typography fontWeight="semibold" className="!mr-2 whitespace-nowrap pt-1">
            제목
          </Typography>
          <Controller
            name="title"
            control={control}
            rules={{
              required: COMMON.error.required,
              validate: (value) => Boolean(value.trim()) || COMMON.error.required,
              maxLength: {
                value: WIKI_LIMITS.TITLE_MAX,
                message: COMMON.error.maxLength(WIKI_LIMITS.TITLE_MAX),
              },
            }}
            render={({ field, fieldState: { error } }) => {
              return (
                <StandardInput
                  className="w-full sm:w-[498px]"
                  {...field}
                  error={Boolean(error)}
                  helperText={error?.message}
                />
              );
            }}
          />
        </Stack>
      </div>
      <div>
        <StandardEditor
          height="470px"
          initialValue={initialDoc?.content}
          forwardedRef={editorRef}
          onChange={handleEditorChange}
        />
        <Typography variant="small" className="text-subRed">
          {isContentTouched && contentErrMsg}
        </Typography>
      </div>
      {editBase && conflictStep !== 'none' && (
        <div role="alert" className="mt-5 space-y-1 rounded-sm border border-subOrange bg-subOrange/10 px-4 py-3">
          <Typography fontWeight="semibold" className="text-subOrange">
            다른 회원이 이 문서를 먼저 수정했습니다.
          </Typography>
          <Typography variant="paragraph" component="p" className="text-subOrange">
            작성 중이던 내용은 이 화면에 그대로 남아 있습니다.{' '}
            <Link
              to={`/wiki/view/${editBase.docId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-pointBlue underline"
            >
              최신 버전 보기(새 탭)
            </Link>
            에서 바뀐 부분을 확인하고, 필요한 내용을 여기에 직접 반영한 뒤 다시 저장해주세요. 반영하지 않고 저장하면
            최신 버전의 변경 내용이 지금 작성한 내용으로 덮어써집니다.
          </Typography>
        </div>
      )}
      <div className="mt-5 flex justify-end space-x-2">
        <TextButton onClick={handleCancelButtonClick}>취소</TextButton>
        <OutlinedButton
          onClick={handleSaveButtonClick}
          disabled={!isValid || Boolean(contentErrMsg) || !isChanged || isSaving}
        >
          {isEditMode ? '수정하기' : '작성완료'}
        </OutlinedButton>
      </div>
      <WikiEditSummaryModal
        open={editSummaryModalOpen}
        onClose={handleEditSummaryModalClose}
        isEditMode={isEditMode}
        isSaving={isSaving}
        editSummary={editSummary}
        setEditSummary={setEditSummary}
        onSaveButtonClick={handleUploadButtonClick}
      />
    </div>
  );
};

interface WikiEditLoaderProps {
  docId: number;
}

const WikiEditLoader = ({ docId }: WikiEditLoaderProps) => {
  const { data: doc, error, isFetching, refetch } = useGetWikiDocQuery({ docId });
  const navigate = useNavigate();

  /* NOTE 캐시에 남아 있던 문서로 편집을 시작하면 곧바로 409가 나므로 조회가 끝난 최신 문서를 한 번만 담아 둡니다.
    이후 쿼리가 갱신되거나 실패해도 폼(에디터)은 다시 만들지 않습니다. */
  const [initialDoc, setInitialDoc] = useState<WikiDocument | null>(null);
  if (!initialDoc && doc && !isFetching && !error) setInitialDoc(doc);

  if (initialDoc) return <WikiWriteForm initialDoc={initialDoc} />;
  if (isFetching) return null;

  const status = getWikiErrorStatus(error);
  if (status === 404) return <NotFound from="Wiki" />;
  // 현재 리비전이 숨겨진 문서는 상세를 불러올 수 없어 편집할 수 없습니다.
  if (status === 403) return <WikiHidden target="문서" docId={docId} />;
  if (!error) return null;

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
      <Typography className="text-subGray">{WIKI_WRITE_MSG.loadFail}</Typography>
      <div className="flex space-x-2">
        <OutlinedButton onClick={() => refetch()}>다시 시도</OutlinedButton>
        <OutlinedButton onClick={() => navigate('/wiki/list')}>위키 목록</OutlinedButton>
      </div>
    </div>
  );
};

const WikiWrite = () => {
  const { docId } = useParams();

  if (docId === undefined) return <WikiWriteForm />;

  return <WikiEditLoader key={docId} docId={Number(docId)} />;
};

export default WikiWrite;
