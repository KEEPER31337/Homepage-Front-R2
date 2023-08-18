import React, { useState } from 'react';
import { VscGithubInverted, VscLink } from 'react-icons/vsc';
import { SiNotion } from 'react-icons/si';

import { InputLabel, Stack, Typography } from '@mui/material';
import ActionModal from '@components/Modal/ActionModal';
import StandardInput from '@components/Input/StandardInput';
import ImageUploader from '@components/Uploader/ImageUploader';
import { ModalInfo } from '../Study.interface';
import { StudyChip, StudyChipDismissible } from '../share/StudyChip';

interface StudyModalProps {
  open: boolean;
  handleOpen: () => void;
  modalInfo: ModalInfo;
}

const memberList = ['김은지', '장서윤', '송세연'];
const StudyModal = ({ open, handleOpen, modalInfo }: StudyModalProps) => {
  const [, setThumbnail] = useState<Blob>();
  const [test, setTest] = useState('');
  const { mode, selectedStudy } = modalInfo;
  const isEdit = mode === 'Edit';
  return (
    <ActionModal
      open={open}
      onClose={handleOpen}
      title={isEdit ? '스터디 수정' : '스터디 추가'}
      actionButtonName={isEdit ? '수정' : '추가'}
      onActionButonClick={handleOpen}
    >
      <div className="mb-10 flex justify-between">
        <Stack flexGrow={1} marginRight={3} spacing={3}>
          <div>
            <InputLabel className="!font-semibold">스터디명</InputLabel>
            <StandardInput
              className="w-full"
              value=""
              onChange={() => {
                // TODO
              }}
            />
          </div>
          <div>
            <InputLabel className="!font-semibold">스터디 소개</InputLabel>
            <StandardInput
              className="w-full"
              multiline
              rows={2}
              value={test}
              onChange={(e) => {
                setTest(e.target.value);
              }}
            />
          </div>
        </Stack>
        <div className="h-40 w-32">
          <ImageUploader isEdit={false} setThumbnail={setThumbnail} />
        </div>
      </div>
      <div className="mb-10 flex space-x-2">
        <div className="w-[108px] space-y-2">
          <InputLabel className="!font-semibold">스터디장</InputLabel>
          <div className="flex border-b-2 border-pointBlue pb-[6px]">
            <StudyChip value="박재열" />
          </div>
        </div>
        <div className="w-full space-y-2">
          <InputLabel className="!font-semibold">스터디원</InputLabel>
          <div className="flex space-x-2 border-b-2 border-pointBlue pb-[6px]">
            <StudyChip value="박재열" />
            {memberList.map((member) => (
              <StudyChipDismissible
                key={member}
                value={member}
                onClick={() => {
                  /* TODO 추후 멤버 제거 핸들러 구현하고 지울 예정
                   */
                  console.log('임시로 구현한 핸들러 함수');
                }}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <InputLabel className="!font-semibold">링크</InputLabel>
        <Stack spacing={2}>
          <div className="flex items-center space-x-2">
            <VscGithubInverted size={25} className="fill-pointBlue" />
            <Typography className="w-24 text-center">Github</Typography>
            <StandardInput
              className="w-full"
              placeholder="https://"
              value=""
              onChange={() => {
                // TODO
              }}
            />
          </div>
          <div className="flex items-center space-x-2">
            <SiNotion size={25} className="fill-pointBlue" />
            <Typography className="w-24 text-center">Notion</Typography>
            <StandardInput
              className="w-full"
              placeholder="https://"
              value=""
              onChange={() => {
                // TODO
              }}
            />
          </div>
          <div className="flex items-center space-x-2">
            <VscLink size={25} className="fill-pointBlue" />
            <StandardInput
              className="w-24"
              placeholder="ex. Plato"
              value=""
              onChange={() => {
                // TODO
              }}
            />
            <StandardInput
              className="w-full"
              placeholder="https://"
              value=""
              onChange={() => {
                // TODO
              }}
            />
          </div>
        </Stack>
      </div>
    </ActionModal>
  );
};

export default StudyModal;
