import React, { useState } from 'react';
import { MemberDetailInfo } from '@api/dto';
import { useGetMembersQuery } from '@api/memberApi';
import { MultiAutoCompleteValue } from '@components/Input/AutoComplete';
import PageTitle from '@components/Typography/PageTitle';
import ChangeMemberTypeButton from './Button/ChangeMemberTypeButton';
import ChangeMemberTypeInput from './Input/ChangeMemberTypeInput';
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
      <div className="flex justify-between">
        <ChangeMemberTypeInput
          memberList={memberList}
          selectedMemberList={selectedMemberList}
          setSelectedMemberList={setSelectedMemberList}
        />
        <ChangeMemberTypeButton selectedMemberList={selectedMemberList} setSelectedMemberList={setSelectedMemberList} />
      </div>
    </div>
  );
};

export default ActiveMemberManage;
