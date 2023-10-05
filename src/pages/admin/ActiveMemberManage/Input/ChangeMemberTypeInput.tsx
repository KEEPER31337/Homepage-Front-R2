import React from 'react';
import { MemberDetailInfo } from '@api/dto';
import AutoComplete, { MultiAutoCompleteValue } from '@components/Input/AutoComplete';

interface ChangeMemberTypeInputProps {
  memberList: MemberDetailInfo[];
  selectedMemberList: MultiAutoCompleteValue;
  setSelectedMemberList: React.Dispatch<React.SetStateAction<MultiAutoCompleteValue>>;
}

const ChangeMemberTypeButton = ({
  memberList,
  selectedMemberList,
  setSelectedMemberList,
}: ChangeMemberTypeInputProps) => {
  return (
    <AutoComplete
      className="w-96"
      value={selectedMemberList}
      multiple
      onChange={setSelectedMemberList}
      items={memberList?.map((member) => ({
        value: member.memberId,
        label: `${member.realName} (${member.generation})`,
      }))}
    />
  );
};

export default ChangeMemberTypeButton;
