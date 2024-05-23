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
  const sortedOptions = options.sort((a, b) => {
    const aGroup = parseFloat(a.group);
    const bGroup = parseFloat(b.group);
    if (aGroup !== bGroup) {
      return aGroup - bGroup;
    }
    return a.label.localeCompare(b.label);
  });

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
