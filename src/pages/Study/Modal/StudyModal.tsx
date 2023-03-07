import React from 'react';
import { VscGithubInverted, VscLink } from 'react-icons/vsc';
import { SiNotion } from 'react-icons/si';
import { Typography } from '@material-tailwind/react';

import ActionModal from '@components/Modal/ActionModal';
import StudyInput from '../share/StudyInput';
import StudyTextarea from '../share/StudyTextarea';
import { StudyChip, StudyChipDismissible } from '../share/StudyChip';

interface StudyModalProps {
  open: boolean;
  handleOpen: () => void;
  isModify: boolean;
  studyId: number | undefined;
}

const memberList = ['김은지', '장서윤', '송세연'];
const StudyModal = ({ open, isModify, handleOpen, studyId }: StudyModalProps): JSX.Element => {
  return (
    <ActionModal
      opened={open}
      onClose={handleOpen}
      title={isModify ? '스터디 수정' : '스터디 생성'}
      actionButtonName={isModify ? '적용하기' : '생성하기'}
      onActionButonClick={handleOpen}
    >
      <div className="space-y-6">
        <div className="flex space-x-4">
          <div className="w-full space-y-6">
            <StudyInput size="lg" variant="static" label="스터디명" placeholder="스터디 이름을 적어주세요." />
            <StudyTextarea variant="static" label="스터디 소개" placeholder="스터디 소개를 적어주세요." />
          </div>
          <div className="w-[141px] space-y-[10px]">
            <Typography className="text-pointBlue">썸네일</Typography>
            <div className="flex h-[130px] w-[130px] items-center justify-center rounded-[10px] border-2 border-dashed border-pointBlue/30 text-pointBlue/30">
              aaa
            </div>
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="w-[108px] space-y-1">
            <Typography className="text-pointBlue">스터디장</Typography>
            <div className="flex border-b-2 border-pointBlue py-[6px]">
              <StudyChip value="박재열" />
            </div>
          </div>
          <div className="w-full space-y-1">
            <Typography className="text-pointBlue">스터디원</Typography>
            <div className="flex space-x-1 border-b-2 border-pointBlue py-[6px]">
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
          <Typography className="text-pointBlue">링크</Typography>
          <div className="space-y-4">
            <div className="flex space-x-2">
              <VscGithubInverted className="h-[25px] w-[25px] text-pointBlue" />
              <StudyInput size="md" variant="static" label="Github" placeholder="https://" />
            </div>
            <div className="flex space-x-2">
              <SiNotion className="h-[25px] w-[25px] text-pointBlue" />
              <StudyInput size="md" variant="static" label="Notion" placeholder="https://" />
            </div>
            <div className="flex space-x-2">
              <VscLink className="h-[25px] w-[25px] text-pointBlue" />
              <div className="flex w-full space-x-4">
                <div className="w-[90px]">
                  <StudyInput size="md" variant="static" label="etc." placeholder="ex)Plato" />
                </div>
                <StudyInput size="md" variant="static" label="" placeholder="https://" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ActionModal>
  );
};

export default StudyModal;
