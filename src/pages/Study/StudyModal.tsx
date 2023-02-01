import React, { Fragment, useState } from 'react';
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react';
import { VscGithubInverted, VscLink } from 'react-icons/vsc';
import { SiNotion } from 'react-icons/si';
import StudyInput from './share/StudyInput';
import StudyTextarea from './share/StudyTextarea';
import { StudyChip, StudyChipDismissible } from './share/StudyChip';

interface ModalType {
  isModify: boolean;
  studyId: number | null;
}
const memberList = ['김은지', '장서윤', '송세연'];
const StudyModal = ({ isModify, studyId }: ModalType): JSX.Element => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="outlined"
        className="h-[34px] w-[70px] rounded-[2px] border-pointBlue p-0 text-pointBlue"
      >
        추가
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>스터디 생성</DialogHeader>
        <DialogBody>
          <div className="space-y-[24px]">
            <div className="flex space-x-[16px]">
              <div className="w-full space-y-[24px]">
                <StudyInput size="lg" variant="static" label="스터디명" placeholder="스터디 이름을 적어주세요." />
                <StudyTextarea variant="static" label="스터디 소개" placeholder="스터디 소개를 적어주세요." />
              </div>
              <div className="w-[141px] space-y-[10px]">
                <p>썸네일</p>
                <div className="h-[130px] w-[130px] rounded-[10px] border-2 border-dashed">aaa</div>
              </div>
            </div>
            <div className="flex space-x-[16px]">
              <div className="w-[108px]">
                <p>스터디장</p>
                <div className="flex justify-center border-b-[2px] border-pointBlue">
                  <StudyChip value="박재열" />
                </div>
              </div>
              <div className="w-full">
                <p>스터디원</p>
                <div className="space-x-[4px] border-b-[2px] border-pointBlue">
                  <StudyChip value="박재열" />
                  {memberList.map((member) => (
                    <StudyChipDismissible
                      value={member}
                      onClick={() => {
                        console.log('xxx');
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-[4px]">
              <p>링크</p>

              <div className="space-y-[16px]">
                <div className="flex space-x-[8px]">
                  <VscGithubInverted className="h-[25px] w-[25px]" />
                  <StudyInput size="md" variant="static" label="Github" placeholder="https://" />
                </div>
                <div className="flex space-x-[8px]">
                  <SiNotion className="h-[25px] w-[25px]" />
                  <StudyInput size="md" variant="static" label="Notion" placeholder="https://" />
                </div>
                <div className="flex space-x-[8px]">
                  <VscLink className="h-[25px] w-[25px]" />
                  <div className="flex w-full space-x-[16px]">
                    <StudyInput size="md" variant="static" label="etc." placeholder="ex)Plato" />
                    <StudyInput size="md" variant="static" label="" placeholder="https://" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="blue" onClick={handleOpen} className="mr-1">
            <span>취소</span>
          </Button>
          <Button variant="filled" color="blue" onClick={handleOpen} className="rounded-[2px]">
            <span>확인</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default StudyModal;
