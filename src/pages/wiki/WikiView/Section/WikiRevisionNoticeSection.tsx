import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { VscWarning } from 'react-icons/vsc';
import OutlinedButton from '@components/Button/OutlinedButton';

interface WikiRevisionNoticeSectionProps {
  docId: number;
  revisionNo: number;
}

/* NOTE 리비전 상세 응답만으로는 최신 리비전인지 알 수 없어, 최신 리비전을 리비전 주소로 열어도 틀리지 않는 문구를 사용합니다. */
/* TODO 추후 수정 */
const WikiRevisionNoticeSection = ({ docId, revisionNo }: WikiRevisionNoticeSectionProps) => {
  const navigate = useNavigate();

  return (
    <div
      role="note"
      className="flex flex-wrap items-center justify-between gap-2 border-l-4 border-subOrange bg-middleBlack px-6 py-3"
    >
      <div className="flex items-center text-subOrange">
        <VscWarning className="mr-2 shrink-0" size={16} />
        <Typography>
          특정 시점의 리비전(<b>r{revisionNo}</b>)을 보고 있습니다. 현재 문서와 내용이 다를 수 있습니다.
        </Typography>
      </div>
      <OutlinedButton small onClick={() => navigate(`/wiki/view/${docId}`)}>
        현재 문서 보기
      </OutlinedButton>
    </div>
  );
};

export default WikiRevisionNoticeSection;
