import React, { useState } from 'react';
import { MemberDetailInfo } from '@api/dto';
import Selector from '@components/Selector/Selector';

type SortInfo = {
  generation: string;
  realName: string;
};

interface SortSelectorProps {
  memberList: MemberDetailInfo[];
  setMemberList: React.Dispatch<React.SetStateAction<MemberDetailInfo[]>>;
}

const generationSearchList = [
  {
    id: '내림차순',
    content: '내림차순',
  },
  {
    id: '오름차순',
    content: '오름차순',
  },
];
const realNameSearchList = [
  {
    id: '가나다순',
    content: '가나다순',
  },
  {
    id: '역순',
    content: '역순',
  },
];

const SortSelector = ({ memberList, setMemberList }: SortSelectorProps) => {
  const [sortInfo, setSortInfo] = useState<SortInfo>({
    generation: '내림차순',
    realName: '가나다순',
  });

  const sortMemberList = ({ generation, realName }: SortInfo) => {
    const sortedList = [...memberList]
      .sort((a, b) => {
        const aRealName = a.realName;
        const bRealName = b.realName;
        return realName === '가나다순' ? aRealName.localeCompare(bRealName) : bRealName.localeCompare(aRealName);
      })
      .sort((a, b) => {
        const aGeneration = parseFloat(a.generation);
        const bGeneration = parseFloat(b.generation);
        return generation === '내림차순' ? bGeneration - aGeneration : aGeneration - bGeneration;
      });

    setMemberList(sortedList);
  };
  return (
    <div className="mb-5 flex space-x-2">
      <Selector
        className="w-32"
        label="기수"
        value={sortInfo.generation}
        onChange={(e) => {
          const generationSortInfo = e.target.value as string;
          setSortInfo((prev) => ({ ...prev, generation: generationSortInfo }));
          sortMemberList({ generation: generationSortInfo, realName: sortInfo.realName });
        }}
        options={generationSearchList}
      />
      <Selector
        className="w-32"
        label="이름"
        value={sortInfo.realName}
        onChange={(e) => {
          const realNameSortInfo = e.target.value as string;
          setSortInfo((prev) => ({ ...prev, realName: realNameSortInfo }));
          sortMemberList({ generation: sortInfo.generation, realName: realNameSortInfo });
        }}
        options={realNameSearchList}
      />
    </div>
  );
};

export default SortSelector;
