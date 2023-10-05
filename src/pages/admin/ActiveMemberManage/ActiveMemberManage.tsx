import React, { useState } from 'react';
import { MemberDetailInfo } from '@api/dto';
import { useGetMembersQuery } from '@api/memberApi';
import { MultiAutoCompleteValue } from '@components/Input/AutoComplete';
import PageTitle from '@components/Typography/PageTitle';
import ChangeMemberTypeButton from './Button/ChangeMemberTypeButton';
import ChangeMemberTypeInput from './Input/ChangeMemberTypeInput';
import MemberTypeSection from './Section/MemberTypeSection';
import SortSelector from './Selector/SortSelector';

const memberTypeList = [
  { type: '정회원', renderType: '활동회원', typeId: 2, color: 'pointBlue' },
  { type: '휴면회원', renderType: '휴면', typeId: 3, color: 'white' },
  { type: '졸업', renderType: '졸업', typeId: 4, color: 'mainBlack' },
  { type: '비회원', renderType: '비회원', typeId: 1, color: '' },
  { type: '탈퇴', renderType: '탈퇴', typeId: 5, color: 'subRed' },
];

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
        memberTypeList={memberTypeList}
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
        <ChangeMemberTypeButton
          memberTypeList={memberTypeList}
          selectedMemberList={selectedMemberList}
          setSelectedMemberList={setSelectedMemberList}
        />
      </div>
    </div>
  );
};

export default ActiveMemberManage;
