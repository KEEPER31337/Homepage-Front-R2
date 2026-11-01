import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
import { InputLabel, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { SiNotion } from 'react-icons/si';
import { VscGithubInverted, VscLink } from 'react-icons/vsc';

import { MemberDetailInfo, PeriodicInfo, StudyDetail, StudyInfo, StudyLinkInfo } from '@api/dto';
import { useGetMemberInfoQuery } from '@api/dutyManageApi';
import {
  useAddStudyMutation,
  useEditStudyMutation,
  useEditStudyThumbnailMutation,
  useGetStudyQuery,
} from '@api/studyApi';
import { COMMON, STUDY_MSG } from '@constants/helperText';
import { useMeQuery } from '@api/meApi';
import AutoComplete, { MultiAutoCompleteValue } from '@components/Input/AutoComplete';
import StandardInput from '@components/Input/StandardInput';
import ActionModal from '@components/Modal/ActionModal';
import ImageUploader from '@components/Uploader/ImageUploader';

const STUDY_TITLE_MAX_LENGTH = 45;
const STUDY_CONTENT_MAX_LENGTH = 100;

interface StudyFormValues {
  studyTitle: string;
  studyInformation: string;
  gitLink: string;
  notionLink: string;
  etcTitle: string;
  etcLink: string;
}

const isEtcLink = (link: StudyLinkInfo) => link.title !== 'Notion' && link.title !== 'Github';

const getDefaultFormValues = (selectedStudy: StudyInfo | null, studyDetail?: StudyDetail): StudyFormValues => {
  const etcLink = studyDetail?.links.find(isEtcLink);

  return {
    studyTitle: selectedStudy?.title ?? '',
    studyInformation: studyDetail?.information ?? '',
    gitLink: studyDetail?.links.find((link) => link.title === 'Github')?.content ?? '',
    notionLink: studyDetail?.links.find((link) => link.title === 'Notion')?.content ?? '',
    etcTitle: etcLink?.title ?? '',
    etcLink: etcLink?.content ?? '',
  };
};

const toMemberInfo = (member: Pick<MemberDetailInfo, 'memberId' | 'generation' | 'realName'>) => ({
  value: member.memberId,
  label: `${member.realName} (${member.generation})`,
  group: member.generation,
});

interface StudyModalFormProps {
  open: boolean;
  onClose: () => void;
  selectedStudy: StudyInfo | null;
  studyDetail?: StudyDetail;
  headMemberInfo: MemberDetailInfo;
  currentPeriod: PeriodicInfo;
}

const StudyModalForm = ({
  open,
  onClose,
  selectedStudy,
  studyDetail,
  headMemberInfo,
  currentPeriod,
}: StudyModalFormProps) => {
  const [thumbnail, setThumbnail] = useState<Blob | null>(null);
  const [isThumbnailChanged, setIsThumbnailChanged] = useState(false);
  const [memberInfos, setMemberInfos] = useState<MultiAutoCompleteValue>(() => [
    { ...toMemberInfo(headMemberInfo), fixed: true },
    ...(studyDetail?.members.map(toMemberInfo) ?? []),
  ]);
  const [linkError, setLinkError] = useState(false);
  const [etcLinkError, setEtcLinkError] = useState(false);

  const isEditMode = Boolean(selectedStudy);

  const {
    control,
    getValues,
    formState: { isValid },
  } = useForm<StudyFormValues>({ mode: 'onBlur', defaultValues: getDefaultFormValues(selectedStudy, studyDetail) });
  const { mutate: addStudy } = useAddStudyMutation();
  const { mutate: editStudy } = useEditStudyMutation();
  const { mutate: editStudyThumbnail } = useEditStudyThumbnailMutation();
  const { data: members } = useGetMemberInfoQuery();
  const queryClient = useQueryClient();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleAddActionButtonClick = () => {
    if (!(getValues('gitLink') || getValues('notionLink') || getValues('etcLink'))) {
      setLinkError(true);
      return;
    }

    if (!((getValues('etcTitle') && getValues('etcLink')) || (!getValues('etcTitle') && !getValues('etcLink')))) {
      setEtcLinkError(true);
      return;
    }

    if (!isValid) {
      return;
    }

    const newStudyInfo = {
      title: getValues('studyTitle'),
      information: getValues('studyInformation'),
      gitLink: getValues('gitLink') || null,
      notionLink: getValues('notionLink') || null,
      etcTitle: getValues('etcTitle') || null,
      etcLink: getValues('etcLink') || null,
      year: currentPeriod.year,
      season: currentPeriod.season,
      memberIds: memberInfos.map((v) => v.value as number),
    };

    if (selectedStudy) {
      editStudy(
        {
          studyId: selectedStudy.studyId,
          studyInfo: newStudyInfo,
        },
        {
          onSuccess: () => {
            if (isThumbnailChanged) {
              editStudyThumbnail(
                { studyId: selectedStudy.studyId, thumbnail },
                {
                  onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ['studies'] });
                  },
                },
              );
            } else {
              queryClient.invalidateQueries({ queryKey: ['studies'] });
            }
            onClose();
          },
        },
      );
      return;
    }
    addStudy(
      {
        request: newStudyInfo,
        thumbnail,
      },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };

  return (
    <ActionModal
      open={open}
      onClose={onClose}
      modalWidth={isMobile ? 'xs' : undefined}
      title={isEditMode ? '스터디 수정' : '스터디 추가'}
      actionButtonName={isEditMode ? '수정' : '추가'}
      onActionButonClick={handleAddActionButtonClick}
    >
      <Stack width={{ sm: 430 }}>
        <div className="mb-10 flex flex-col-reverse justify-between gap-6 sm:flex-row sm:items-start">
          <Stack spacing={3}>
            <div>
              <InputLabel className="!font-semibold">스터디명</InputLabel>
              <Controller
                name="studyTitle"
                control={control}
                rules={{
                  required: COMMON.error.required,
                  maxLength: {
                    value: STUDY_TITLE_MAX_LENGTH,
                    message: COMMON.error.maxLength(STUDY_TITLE_MAX_LENGTH),
                  },
                }}
                render={({ field, fieldState: { error } }) => {
                  return (
                    <StandardInput
                      className="w-full sm:w-64"
                      {...field}
                      error={Boolean(error)}
                      helperText={error?.message}
                      autoFocus
                    />
                  );
                }}
              />
            </div>
            <div>
              <InputLabel className="!font-semibold">스터디 소개</InputLabel>
              <Controller
                name="studyInformation"
                control={control}
                rules={{
                  required: COMMON.error.required,
                  maxLength: {
                    value: STUDY_CONTENT_MAX_LENGTH,
                    message: COMMON.error.maxLength(STUDY_CONTENT_MAX_LENGTH),
                  },
                }}
                render={({ field, fieldState: { error } }) => {
                  return (
                    <StandardInput
                      className="w-full"
                      multiline
                      rows={2}
                      {...field}
                      error={Boolean(error)}
                      helperText={error?.message}
                      autoFocus
                    />
                  );
                }}
              />
            </div>
          </Stack>
          <div className="h-40 w-32 self-center sm:self-start">
            <ImageUploader
              isEditMode
              thumbnailPath={selectedStudy?.thumbnailPath}
              setThumbnail={setThumbnail}
              setIsThumbnailChanged={setIsThumbnailChanged}
            />
          </div>
        </div>
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:gap-2">
          <div className="w-36 space-y-2">
            <InputLabel className="!font-semibold">스터디장</InputLabel>
            <StandardInput value={headMemberInfo.realName} readOnly />
          </div>
          <div className="w-full space-y-2">
            <InputLabel className="!font-semibold">스터디원</InputLabel>
            <AutoComplete
              className="!-z-10 flex space-x-2 pb-[6px]"
              multiple
              grouped
              value={memberInfos}
              items={members?.map((member) => ({
                ...toMemberInfo(member),
                fixed: member.memberId === headMemberInfo.memberId,
              }))}
              onChange={(v) => {
                setMemberInfos(v);
              }}
            />
          </div>
        </div>
        <div className="space-y-4">
          <InputLabel className="!font-semibold">
            <span className="mr-1">링크</span>
            <span className={`text-small ${linkError ? 'text-subRed' : 'text-subGray'}`}>(1개 이상 링크 필수)</span>
          </InputLabel>
          <Stack spacing={{ xs: 3, sm: 2 }}>
            <div className="flex flex-col items-center gap-2 sm:flex-row">
              <VscGithubInverted size={25} className="fill-pointBlue" />
              <Typography className="w-24 text-center">Github</Typography>
              <Controller
                name="gitLink"
                control={control}
                rules={{
                  pattern: {
                    value: /^(https:\/\/github.com)/,
                    message: STUDY_MSG.error.onlyGitLink,
                  },
                }}
                render={({ field, fieldState: { error } }) => {
                  return (
                    <StandardInput
                      className="w-full"
                      placeholder="https://"
                      {...field}
                      onChange={(e) => {
                        setLinkError(false);
                        field.onChange(e);
                      }}
                      error={Boolean(error)}
                      helperText={error?.message}
                      autoFocus
                    />
                  );
                }}
              />
            </div>
            <div className="flex flex-col items-center gap-2 sm:flex-row">
              <SiNotion size={25} className="fill-pointBlue" />
              <Typography className="w-24 text-center">Notion</Typography>
              <Controller
                name="notionLink"
                control={control}
                rules={{
                  pattern: {
                    value: /^(https:\/\/)/,
                    message: COMMON.error.onlyHttps,
                  },
                }}
                render={({ field, fieldState: { error } }) => {
                  return (
                    <StandardInput
                      className="w-full"
                      placeholder="https://"
                      {...field}
                      error={Boolean(error)}
                      helperText={error?.message}
                      autoFocus
                    />
                  );
                }}
              />
            </div>
            <div className="flex flex-col items-start gap-2 sm:flex-row">
              <VscLink size={25} className="fill-pointBlue" />
              <Controller
                name="etcTitle"
                control={control}
                render={({ field, fieldState: { error } }) => {
                  return (
                    <StandardInput
                      className="w-24"
                      placeholder="ex. Plato"
                      {...field}
                      error={Boolean(error)}
                      onChange={(e) => {
                        setEtcLinkError(false);
                        field.onChange(e);
                      }}
                      helperText={error?.message}
                      autoFocus
                    />
                  );
                }}
              />
              <Controller
                name="etcLink"
                control={control}
                rules={{
                  pattern: {
                    value: /^(https:\/\/)/,
                    message: COMMON.error.onlyHttps,
                  },
                }}
                render={({ field, fieldState: { error } }) => {
                  return (
                    <StandardInput
                      className="w-full"
                      placeholder="https://"
                      {...field}
                      error={Boolean(error)}
                      onChange={(e) => {
                        setLinkError(false);
                        setEtcLinkError(false);
                        field.onChange(e);
                      }}
                      helperText={error?.message}
                      autoFocus
                    />
                  );
                }}
              />
            </div>
            {etcLinkError && (
              <Typography variant="small" className="text-center text-subRed">
                기타 링크를 사용하려면 링크명과 링크 둘 다 입력해야 합니다.
              </Typography>
            )}
          </Stack>
        </div>
      </Stack>
    </ActionModal>
  );
};

interface StudyModalProps {
  open: boolean;
  onClose: () => void;
  selectedStudy: StudyInfo | null;
  currentPeriod: PeriodicInfo;
}

/**
 * 폼 초기값에 필요한 데이터(로그인 회원, 수정 대상 스터디 상세)가 준비된 뒤에 폼을 마운트합니다.
 * 모달은 열릴 때마다 새로 마운트되므로(useModal) 폼 상태는 마운트 시점의 초기값으로 시작합니다.
 */
const StudyModal = ({ open, onClose, selectedStudy, currentPeriod }: StudyModalProps) => {
  const { data: headMemberInfo } = useMeQuery();
  const { data: studyDetail } = useGetStudyQuery({
    studyId: selectedStudy?.studyId ?? -1,
    enabled: Boolean(selectedStudy),
  });

  useEffect(() => {
    if (headMemberInfo !== null) return;

    toast.error(COMMON.error.requiredLogin);
    onClose();
  }, [headMemberInfo, onClose]);

  if (!headMemberInfo) return null;
  if (selectedStudy && !studyDetail) return null;

  return (
    <StudyModalForm
      open={open}
      onClose={onClose}
      selectedStudy={selectedStudy}
      studyDetail={studyDetail}
      headMemberInfo={headMemberInfo}
      currentPeriod={currentPeriod}
    />
  );
};

export default StudyModal;
