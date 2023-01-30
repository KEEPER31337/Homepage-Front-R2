import React, { useState } from 'react';
import { Accordion, AccordionHeader, AccordionBody, Chip, Button } from '@material-tailwind/react';
import { VscGithubInverted, VscLink } from 'react-icons/vsc';
import { SiNotion } from 'react-icons/si';

interface Test {
  id: number;
  open: number;
}
interface StudyItemType {
  id: number;
}

/**
 * TODO API 연동 후 삭제할 코드(하드코딩)
 * */
const link = [
  { title: 'github', contents: 'https//~' },
  { title: 'notion', contents: 'https//~' },
  { title: 'plato', contents: 'https//~' },
];
const members = ['장서윤', '김은지', '송세연', '산다라박'];
/**
 * TODO 나중에 다른 파일로 빼줄 예정
 * 영문 가장 앞 글자만 대문자, 나머지는 소문자로 반환해주는 함수
 * @param str
 * @returns
 */
const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
/**
 * 링크 라벨에 따라 알맞은 아이콘 컴포넌트를 반환하는 함수
 * @param name 링크 라벨(github, notion, plato 등)
 * @returns 아이콘
 */
const LinkIcon = (name: string): JSX.Element => {
  if (name === 'github') return <VscGithubInverted className="h-[28px] w-[28px]" />;
  if (name === 'notion') return <SiNotion className="h-[28px] w-[28px]" />;
  return <VscLink className="h-[28px] w-[28px]" />;
};

const Icon = ({ id, open }: Test) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${id === open ? 'rotate-180' : ''} h-5 w-5 transition-transform`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
};
const StudyItem = ({ id }: StudyItemType) => {
  const [open, setOpen] = useState(0);

  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <Accordion open={open === id} icon={<Icon id={id} open={open} />}>
      <AccordionHeader className="h-[80px]" onClick={() => handleOpen(id)}>
        <div className="flex h-[64px] w-full space-x-[24px] text-left">
          <span className="h-[64px] w-[64px] bg-gray-300">이미지</span>
          <div className="flex flex-col justify-between">
            <p className="h-[30px] text-[20px]">CTF 스터디</p>
            <p className="h-[24px] text-[16px]">스터디장 김태연 | 현재 인원 8명</p>
          </div>
        </div>
      </AccordionHeader>
      <AccordionBody className="space-y-[30px] py-[30px] px-[41px]">
        <div className="space-y-[16px]">
          <p>스터디 소개</p>
          <div className="border-l-2 border-blue-300 px-[10px]">CTF 준비합니다</div>
        </div>
        <div className="space-y-[16px] ">
          <p>스터디원</p>
          <p className="space-x-[10px]">
            {members.map((member: string) => (
              <Chip value={member} />
            ))}
            {/**
             * <Chip
             * show={show}
             * dismissible={{
             *   onClose: () => setShow(false),
             * }}
             * value="Dismissible"
             * />
             * */}
          </p>
        </div>
        <div className="space-y-[16px] ">
          <p>링크</p>
          <p className="flex space-x-[16px]">
            {link.map((li) => (
              <p className="flex items-center space-x-[4px]">
                <span>{LinkIcon(li.title)}</span>
                <span className="underline">{capitalize(li.title)}</span>
              </p>
            ))}
          </p>
        </div>
      </AccordionBody>
    </Accordion>
  );
};

export default StudyItem;
