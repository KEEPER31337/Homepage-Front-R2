import React from 'react';
import { Typography } from '@mui/material';
import { MemberDetailInfo } from '@api/dto';
import { MultiAutoCompleteValue } from '@components/Input/AutoComplete';
import MemberCard from '../Card/MemberCard';

interface MemberCardProps {
  memberTypeList: Array<{
    type: string;
    renderType: string;
    typeId: number;
    color?: string;
  }>;
  memberList: MemberDetailInfo[];
  selectedMemberList: MultiAutoCompleteValue;
  setSelectedMemberList: React.Dispatch<React.SetStateAction<MultiAutoCompleteValue>>;
}

const MemberTypeSection = ({
  memberTypeList,
  memberList,
  selectedMemberList,
  setSelectedMemberList,
}: MemberCardProps) => {
  const toggleMemberSelection = (memberInfo: MemberDetailInfo) => {
    setSelectedMemberList((prevSelectedMember: MultiAutoCompleteValue) => {
      const isSelected = prevSelectedMember.some((member) => member.value === memberInfo.memberId);
      return isSelected
        ? prevSelectedMember.filter((member) => member.value !== memberInfo.memberId)
        : [
            ...prevSelectedMember,
            { value: memberInfo.memberId, label: `${memberInfo.realName} (${memberInfo.generation})` },
          ];
    });
  };

  return (
    <div className="mb-5 grid grid-cols-6 content-start gap-3">
      {memberTypeList
        .filter((memberType) => memberType.renderType !== '탈퇴')
        .map((memberType) => (
          <div
            key={memberType.typeId}
            className={`${
              memberType.type === '정회원' || memberType.type === '휴면회원' ? 'col-span-2' : 'col-span-1'
            } space-y-2`}
          >
            <div className="flex items-center space-x-2 p-1">
              <div className={`bg-${memberType.color} mr-2 h-4 w-4 rounded-full`} />
              <Typography>{memberType.renderType}</Typography>
            </div>
            <div className="grid grid-cols-2 gap-1">
              {memberList
                .filter((v) => v.memberType === memberType.type)
                .map((memberInfo) => (
                  <MemberCard
                    key={memberInfo.memberId}
                    memberInfo={memberInfo}
                    onClick={() => toggleMemberSelection(memberInfo)}
                    isSelected={selectedMemberList.some((member) => member.value === memberInfo.memberId)}
                  />
                ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default MemberTypeSection;
