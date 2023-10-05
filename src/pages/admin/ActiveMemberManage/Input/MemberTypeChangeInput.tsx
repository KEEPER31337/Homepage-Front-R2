import React from 'react';
import { MemberDetailInfo } from '@api/dto';
import AutoComplete, { MultiAutoCompleteValue } from '@components/Input/AutoComplete';

interface MemberTypeChangeInputProps {
  memberList: MemberDetailInfo[];
  selectedMemberList: MultiAutoCompleteValue;
  setSelectedMemberList: React.Dispatch<React.SetStateAction<MultiAutoCompleteValue>>;
}

const MemberTypeChangeInput = ({
  memberList,
  selectedMemberList,
  setSelectedMemberList,
}: MemberTypeChangeInputProps) => {
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

export default MemberTypeChangeInput;
