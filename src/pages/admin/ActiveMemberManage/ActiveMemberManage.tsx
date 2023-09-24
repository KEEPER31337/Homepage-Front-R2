import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { MemberDetailInfo, MemberType } from '@api/dto';
import { useGetMembersQuery } from '@api/memberApi';
import OutlinedButton from '@components/Button/OutlinedButton';
import AutoComplete, { MultiAutoCompleteValue } from '@components/Input/AutoComplete';
import Selector from '@components/Selector/Selector';
import PageTitle from '@components/Typography/PageTitle';
import MemberCard from './MemberCard';

type SortInfo = {
  generation: string;
  realName: string;
};

const ActiveMemberManage = () => {
  const [selectedMemberList, setSelectedMemberList] = useState<MultiAutoCompleteValue>([]);
  const [sortInfo, setSortInfo] = useState<SortInfo>({
    generation: '내림차순',
    realName: '가나다순',
  });
  const [memberList, setMemberList] = useState<MemberDetailInfo[]>([]);

  const memberTypeList = [
    { type: '활동회원', typeId: 2, color: 'pointBlue' },
    { type: '휴면', typeId: 3, color: 'amber-300' },
    { type: '졸업', typeId: 4, color: 'black' },
    { type: '비회원', typeId: 1, color: 'white' },
    { type: '탈퇴', typeId: 5, color: '' },
  ];

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

  const { data: originMemberList } = useGetMembersQuery({
    onSuccess: (data: MemberDetailInfo[]) => {
      setMemberList(data);
    },
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

  const toggleMemberSelection = (memberInfo: MemberDetailInfo) => {
    setSelectedMemberList((prevSelectedMembers: any) => {
      const isMemberSelected = prevSelectedMembers.some((member: any) => member.value === memberInfo.memberId);
      return isMemberSelected
        ? prevSelectedMembers.filter((member: any) => member.value !== memberInfo.memberId)
        : [
            ...prevSelectedMembers,
            { value: memberInfo.memberId, label: `${memberInfo.realName} (${memberInfo.generation})` },
          ];
    });
  };

  return (
    <div>
      <PageTitle>활동 인원 관리</PageTitle>
      <div className="mb-5 flex space-x-2">
        <div className="flex justify-start space-x-2">
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
      </div>

      <div className="mb-5 grid grid-cols-6 content-start gap-3">
        <div className="col-span-2 space-y-2">
          <div className="flex items-center space-x-2  p-1">
            <div className="h-4 w-4 rounded-full bg-pointBlue" />
            <Typography>활동회원</Typography>
          </div>
          <div className="grid grid-cols-2 gap-1">
            {memberList.map((memberInfo) => (
              <MemberCard
                key={memberInfo.memberId}
                memberInfo={memberInfo}
                onClick={() => toggleMemberSelection(memberInfo)}
                isSelected={selectedMemberList.some((member) => member.value === memberInfo.memberId)}
              />
            ))}
          </div>
        </div>
        {/* <div className="col-span-2 space-y-2">
          <div className="flex items-center space-x-2 p-1">
            <div className="h-4 w-4 rounded-full bg-amber-300" />
            <Typography>휴면</Typography>
          </div>

          <div className="grid grid-cols-2  gap-1">
            {memberList.map((memberInfo) => (
              <MemberCard
                key={memberInfo.memberId}
                memberInfo={memberInfo}
                onClick={() => toggleMemberSelection(memberInfo.memberId)}
                isSelected={selectedMemberList.some((member) => member.value === memberInfo.memberId)}
              />
            ))}
          </div>
        </div>
        <div className="col-span-1 space-y-2">
          <div className="flex items-center space-x-2 p-1">
            <div className="h-4 w-4 rounded-full bg-black" />
            <Typography>졸업</Typography>
          </div>
          <div className="grid gap-1">
            {memberList.map((memberInfo) => (
              <MemberCard
                key={memberInfo.memberId}
                memberInfo={memberInfo}
                onClick={() => toggleMemberSelection(memberInfo.memberId)}
                isSelected={selectedMemberList.some((member) => member.value === memberInfo.memberId)}
              />
            ))}
          </div>
        </div>

        <div className="col-span-1 space-y-2">
          <div className="flex items-center space-x-2 p-1">
            <div className="h-4 w-4 rounded-full bg-white" />
            <Typography>비회원</Typography>
          </div>
          <div className="grid gap-1">
            {memberList.map((memberInfo) => (
              <MemberCard
                key={memberInfo.memberId}
                memberInfo={memberInfo}
                onClick={() => toggleMemberSelection(memberInfo.memberId)}
                isSelected={selectedMemberList.some((member) => member.value === memberInfo.memberId)}
              />
            ))}
          </div>
        </div> */}
      </div>
      <div className="flex justify-between">
        {selectedMemberList && (
          <AutoComplete
            className="w-96"
            value={selectedMemberList}
            multiple
            onChange={setSelectedMemberList}
            items={originMemberList?.map((member) => ({
              value: member.memberId,
              label: `${member.realName} (${member.generation})`,
            }))}
          />
        )}
        <div className="flex space-x-2">
          {memberTypeList.map((member) => (
            <OutlinedButton
              key={member.typeId}
              onClick={() => {
                console.log(member.typeId, '선택한 인원 : ', selectedMemberList);
              }}
            >
              {member.color && <div className={`bg-${member.color}  mr-2 h-4 w-4 rounded-full`} />}
              <Typography>{member.type}</Typography>
            </OutlinedButton>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActiveMemberManage;
