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
  const options: { value: number; label: string; group: string }[] = [];
  memberList?.forEach((data) => options.push({ value: data.memberId, label: data.realName, group: data.generation }));
  const sortedOptions = options.sort((a, b) => (a.group > b.group ? 1 : -1));

  return (
    <AutoComplete
      className="w-96"
      value={selectedMemberList}
      multiple
      grouped
      onChange={setSelectedMemberList}
      items={sortedOptions}
    />
  );
};

export default MemberTypeChangeInput;
