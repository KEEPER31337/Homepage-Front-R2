import React, { useState } from 'react';
import { MemberDetailInfo } from '@api/dto';
import { useGetMembersQuery } from '@api/memberApi';
import { MultiAutoCompleteValue } from '@components/Input/AutoComplete';
import PageTitle from '@components/Typography/PageTitle';
import MemberTypeChangeButton from './Button/MemberTypeChangeButton';
import MemberTypeChangeInput from './Input/MemberTypeChangeInput';
import MemberTypeSection from './Section/MemberTypeSection';
import SortSelector from './Selector/SortSelector';

const ActiveMemberManage = () => {
  const [selectedMemberList, setSelectedMemberList] = useState<MultiAutoCompleteValue>([]);
  const [memberList, setMemberList] = useState<MemberDetailInfo[]>([]);

  useGetMembersQuery({
    onSuccess: (data: MemberDetailInfo[]) => {
      setMemberList(data);
    },
  });

  return (
    <div>
      <PageTitle>활동 인원 관리</PageTitle>
      <SortSelector memberList={memberList} setMemberList={setMemberList} />
      <MemberTypeSection
        memberList={memberList}
        selectedMemberList={selectedMemberList}
        setSelectedMemberList={setSelectedMemberList}
      />
      <div className="flex w-full flex-col sm:flex-row">
        <MemberTypeChangeInput
          memberList={memberList}
          selectedMemberList={selectedMemberList}
          setSelectedMemberList={setSelectedMemberList}
        />
        <MemberTypeChangeButton selectedMemberList={selectedMemberList} setSelectedMemberList={setSelectedMemberList} />
      </div>
    </div>
  );
};

export default ActiveMemberManage;
