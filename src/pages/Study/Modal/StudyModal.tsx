import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { InputLabel, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { SiNotion } from 'react-icons/si';
import { VscGithubInverted, VscLink } from 'react-icons/vsc';

import { useRecoilValue } from 'recoil';
import { PeriodicInfo, StudyInfo } from '@api/dto';
import { useGetMemberInfoQuery } from '@api/dutyManageApi';
import {
  useAddStudyMutation,
  useEditStudyMutation,
  useEditStudyThumbnailMutation,
  useGetStudyQuery,
} from '@api/studyApi';
import { REQUIRE_ERROR_MSG } from '@constants/errorMsg';
import memberState from '@recoil/member.recoil';
import AutoComplete, { MultiAutoCompleteValue } from '@components/Input/AutoComplete';
import StandardInput from '@components/Input/StandardInput';
import ActionModal from '@components/Modal/ActionModal';
import ImageUploader from '@components/Uploader/ImageUploader';

const STUDY_TITLE_MAX_LENGTH = 45;
const STUDY_CONTENT_MAX_LENGTH = 100;

interface StudyModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedStudyInfo: StudyInfo | null;
  setSelectedStudyInfo: React.Dispatch<React.SetStateAction<StudyInfo | null>>;
  currentPeriod: PeriodicInfo;
}

const StudyModal = ({ open, setOpen, selectedStudyInfo, setSelectedStudyInfo, currentPeriod }: StudyModalProps) => {
  const [thumbnail, setThumbnail] = useState<Blob | null>(null);
  const [isThumbnailChanged, setIsThumbnailChanged] = useState(false);
  const [memberInfos, setMemberInfos] = useState<MultiAutoCompleteValue>([]);
  const headMemberInfo = useRecoilValue(memberState);
  const isEditMode = Boolean(selectedStudyInfo);

  const { control, getValues, reset } = useForm({ mode: 'onBlur' });
  const { data: studyDetail } = useGetStudyQuery({ studyId: selectedStudyInfo?.studyId ?? -1, enabled: isEditMode });
  const { mutate: addStudy } = useAddStudyMutation();
  const { mutate: editStudy } = useEditStudyMutation();
  const { mutate: editStudyThumbnail } = useEditStudyThumbnailMutation();
  const { data: members } = useGetMemberInfoQuery();
  const queryClient = useQueryClient();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClose = () => {
    setOpen(false);
    reset();
    setSelectedStudyInfo(null);
  };

  const handleAddActionButtonClick = () => {
    const newStudyInfo = {
      title: getValues('studyTitle'),
      information: getValues('studyInformation'),
      gitLink: getValues('gitLink') || null,
      notionLink: getValues('notionLink') || null,
      etcTitle: getValues('etcTitle') || null,
      etcLink: getValues('etcLink') || null,
      year: currentPeriod.year,
      season: currentPeriod.season,
      memberIds: memberInfos?.map((v) => v.value as number),
    };

    if (isEditMode && selectedStudyInfo) {
      editStudy(
        {
          studyId: selectedStudyInfo.studyId,
          studyInfo: newStudyInfo,
        },
        {
          onSuccess: () => {
            if (isThumbnailChanged) {
              editStudyThumbnail(
                { studyId: selectedStudyInfo.studyId, thumbnail },
                {
                  onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ['studies'] });
                  },
                },
              );
            } else {
              queryClient.invalidateQueries({ queryKey: ['studies'] });
            }
            handleClose();
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
          setOpen(false);
        },
      },
    );
  };

  useEffect(() => {
    reset();
    if (open && headMemberInfo) {
      setMemberInfos([
        {
          value: headMemberInfo.memberId,
          label: `${headMemberInfo.realName} (${headMemberInfo.generation})`,
          group: headMemberInfo.generation,
          fixed: true,
        },
        ...(studyDetail?.members.map((member) => ({
          value: member.memberId,
          label: `${member.realName} (${member.generation})`,
          group: member.generation,
        })) || []),
      ]);
    }
  }, [open, headMemberInfo]);

  return (
    <ActionModal
      open={open}
      onClose={handleClose}
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
                defaultValue={selectedStudyInfo?.title ?? ''}
                control={control}
                rules={{
                  required: REQUIRE_ERROR_MSG,
                  maxLength: {
                    value: STUDY_TITLE_MAX_LENGTH,
                    message: `최대 ${STUDY_TITLE_MAX_LENGTH}글자 입력이 가능합니다.`,
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
                defaultValue={studyDetail?.information ?? ''}
                control={control}
                rules={{
                  required: REQUIRE_ERROR_MSG,
                  maxLength: {
                    value: STUDY_CONTENT_MAX_LENGTH,
                    message: `최대 ${STUDY_CONTENT_MAX_LENGTH}글자 입력이 가능합니다.`,
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
              thumbnailPath={selectedStudyInfo?.thumbnailPath}
              setThumbnail={setThumbnail}
              setIsThumbnailChanged={setIsThumbnailChanged}
            />
          </div>
        </div>
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:gap-2">
          <div className="w-36 space-y-2">
            <InputLabel className="!font-semibold">스터디장</InputLabel>
            <StandardInput value={headMemberInfo?.realName || ''} readOnly />
          </div>
          <div className="w-full space-y-2">
            <InputLabel className="!font-semibold">스터디원</InputLabel>
            <AutoComplete
              className="!-z-10 flex space-x-2 pb-[6px]"
              multiple
              grouped
              value={memberInfos}
              items={members?.map((member) => ({
                value: member.memberId,
                label: `${member.realName} (${member.generation})`,
                group: member.generation,
                fixed: member.memberId === headMemberInfo?.memberId,
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
            <span className="text-small text-subGray">(1개 이상 링크 필수)</span>
          </InputLabel>
          <Stack spacing={{ xs: 3, sm: 2 }}>
            <div className="flex flex-col items-center gap-2 sm:flex-row">
              <VscGithubInverted size={25} className="fill-pointBlue" />
              <Typography className="w-24 text-center">Github</Typography>
              <Controller
                name="gitLink"
                defaultValue={studyDetail?.links.find((link) => link.title === 'Github')?.content ?? ''}
                control={control}
                rules={{
                  pattern: {
                    value: /^(https:\/\/github.com)/,
                    message: `깃헙 링크만 입력이 가능합니다.`,
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
            <div className="flex flex-col items-center gap-2 sm:flex-row">
              <SiNotion size={25} className="fill-pointBlue" />
              <Typography className="w-24 text-center">Notion</Typography>
              <Controller
                name="notionLink"
                defaultValue={studyDetail?.links.find((link) => link.title === 'Notion')?.content ?? ''}
                control={control}
                rules={{
                  pattern: {
                    value: /^(https:\/\/)/,
                    message: `https:// 로 시작해야 합니다.`,
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
            <div className="flex flex-col items-center gap-2 sm:flex-row">
              <VscLink size={25} className="fill-pointBlue" />
              <Controller
                name="etcTitle"
                defaultValue={
                  studyDetail?.links.find((link) => link.title !== 'Notion' && link.title !== 'Github')?.title ?? ''
                }
                control={control}
                render={({ field, fieldState: { error } }) => {
                  return (
                    <StandardInput
                      className="w-24"
                      placeholder="ex. Plato"
                      {...field}
                      error={Boolean(error)}
                      helperText={error?.message}
                      autoFocus
                    />
                  );
                }}
              />
              <Controller
                name="etcLink"
                defaultValue={
                  studyDetail?.links.find((link) => link.title !== 'Notion' && link.title !== 'Github')?.content ?? ''
                }
                control={control}
                rules={{
                  pattern: {
                    value: /^(https:\/\/)/,
                    message: `https:// 로 시작해야 합니다.`,
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
          </Stack>
        </div>
      </Stack>
    </ActionModal>
  );
};

export default StudyModal;
