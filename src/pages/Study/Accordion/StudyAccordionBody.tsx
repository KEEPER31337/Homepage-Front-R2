import { useGetStudyQuery } from '@api/studyApi';
import { Typography } from '@mui/material';
import React from 'react';
import { SiNotion } from 'react-icons/si';
import { VscGithubInverted, VscLink } from 'react-icons/vsc';
import { Link } from 'react-router-dom';

interface StudyAccordionBodyProps {
  studyId: number;
}

const StudyAccordionBody = ({ studyId }: StudyAccordionBodyProps) => {
  const { data: studyInfo } = useGetStudyQuery({ studyId });

  const LinkIconData = {
    Github: <VscGithubInverted size={20} />,
    Notion: <SiNotion size={20} />,
    etc: <VscLink size={20} />,
  };

  if (!studyInfo) return null;
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Typography className="font-semibold">스터디 소개</Typography>
        <Typography className="border-l-2 border-pointBlue px-2">{studyInfo.information}</Typography>
      </div>
      <div className="space-y-2">
        <Typography className="font-semibold">스터디원</Typography>
        <div className="flex space-x-2">
          {/* {memberList?.map(({ id, realName }: any) => (
            <StudyChip key={id} value={realName} />
          ))} */}
        </div>
      </div>
      <div className="space-y-2">
        <Typography className="font-semibold">링크</Typography>
        <div className="flex space-x-4 text-pointBlue">
          {studyInfo.links.map(({ title, contents }) => (
            <Link key={title} to={contents} target="_blank" className="flex items-center space-x-2">
              <span>{LinkIconData[title as keyof typeof LinkIconData] ?? LinkIconData.etc}</span>
              <span className="underline decoration-pointBlue underline-offset-4">{title ?? 'ETC'}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudyAccordionBody;
