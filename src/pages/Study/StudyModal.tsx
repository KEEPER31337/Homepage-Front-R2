import React, { Fragment, useState } from 'react';
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react';
import { VscGithubInverted, VscLink } from 'react-icons/vsc';
import { SiNotion } from 'react-icons/si';
import StudyInput from './share/StudyInput';
import StudyTextarea from './share/StudyTextarea';
import { StudyChip, StudyChipDismissible } from './share/StudyChip';

interface ModalProps {
  isModify: boolean;
  studyId: number | undefined;
}

const memberList = ['김은지', '장서윤', '송세연'];
const StudyModal = ({ isModify, studyId }: ModalProps): JSX.Element => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="outlined"
        className="h-[34px] w-[70px] rounded-[2px] border-pointBlue p-0 text-pointBlue focus:outline-none focus:ring-0"
      >
        추가
      </Button>
      <Dialog className="bg-subBlack" open={open} handler={handleOpen}>
        <DialogHeader className="text-pointBlue">스터디 생성</DialogHeader>
        <DialogBody>
          <div className="space-y-[24px]">
            <div className="flex space-x-[16px]">
              <div className="w-full space-y-[24px]">
                <StudyInput size="lg" variant="static" label="스터디명" placeholder="스터디 이름을 적어주세요." />
                <StudyTextarea variant="static" label="스터디 소개" placeholder="스터디 소개를 적어주세요." />
              </div>
              <div className="w-[141px] space-y-[10px]">
                <p className="text-pointBlue">썸네일</p>
                <div className="flex h-[130px] w-[130px] items-center justify-center rounded-[10px] border-[2px] border-dashed border-pointBlue/[30%] text-pointBlue/[30%]">
                  aaa
                </div>
              </div>
            </div>
            <div className="flex space-x-[16px] ">
              <div className="w-[108px]  space-y-[4px]">
                <p className="text-pointBlue">스터디장</p>
                <div className="flex border-b-[2px] border-pointBlue py-[6px]">
                  <StudyChip value="박재열" />
                </div>
              </div>
              <div className="w-full space-y-[4px]">
                <p className="text-pointBlue">스터디원</p>
                <div className="flex space-x-[4px] border-b-[2px] border-pointBlue py-[6px]">
                  <StudyChip value="박재열" />
                  {memberList.map((member) => (
                    <StudyChipDismissible
                      key={member}
                      value={member}
                      onClick={() => {
                        /* TODO 추후 멤버 제거 핸들러 구현할 예정
                         */
                        console.log('임시로 구현한 핸들러 함수');
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-[16px]">
              <p className="text-pointBlue">링크</p>

              <div className="space-y-[16px]">
                <div className="flex space-x-[8px]">
                  <VscGithubInverted className="h-[25px] w-[25px] text-pointBlue" />
                  <StudyInput size="md" variant="static" label="Github" placeholder="https://" />
                </div>
                <div className="flex space-x-[8px]">
                  <SiNotion className="h-[25px] w-[25px] text-pointBlue" />
                  <StudyInput size="md" variant="static" label="Notion" placeholder="https://" />
                </div>
                <div className="flex space-x-[8px]">
                  <VscLink className="h-[25px] w-[25px] text-pointBlue" />
                  <div className="flex w-full space-x-[16px]">
                    <p className="w-[90px]">
                      <StudyInput size="md" variant="static" label="etc." placeholder="ex)Plato" />
                    </p>
                    <StudyInput size="md" variant="static" label="" placeholder="https://" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="blue" onClick={handleOpen} className="mr-1 text-pointBlue">
            <span>취소</span>
          </Button>
          <Button
            variant="filled"
            color="blue"
            onClick={handleOpen}
            className="rounded-[2px] bg-pointBlue text-subBlack"
          >
            <span>확인</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default StudyModal;
