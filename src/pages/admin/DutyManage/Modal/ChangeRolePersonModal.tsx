import React, { useState } from 'react';
import {
  useGetExecutiveInfoQuery,
  useGetMemberInfoQuery,
  useGetJobListQuery,
  useCreateExecutiveJobMutation,
  useDeleteExecutiveJobMutation,
} from '@api/dutyManageApi';
import { convertJobName } from '@mocks/DutyManageApi';
import AutoComplete, { SingleAutoCompleteValue } from '@components/Input/AutoComplete';
import ActionModal from '@components/Modal/ActionModal';

interface ChangeRolePersonModalProps {
  open: boolean;
  onClose: () => void;
  jobName?: string;
  badgeImage?: string;
}

const ChangeRolePersonModal = ({ open, onClose, jobName, badgeImage }: ChangeRolePersonModalProps) => {
  const jobInfo = convertJobName.find((data) => data.JobName === jobName);
  const roleName = jobInfo?.roleName;
  const restOfTitle = ' 담당자 변경';

  const { data: executiveInfos } = useGetExecutiveInfoQuery();
  const { data: memberList } = useGetMemberInfoQuery();
  const { data: jobList } = useGetJobListQuery();
  const { mutate: createJob } = useCreateExecutiveJobMutation();
  const { mutate: deleteJob } = useDeleteExecutiveJobMutation();

  const options: { value: number; label: string; group: string }[] = [];
  memberList?.forEach((data) => options.push({ value: data.memberId, label: data.realName, group: data.generation }));
  const sortedOptions = options.sort(
    (a, b) => parseFloat(a.group) - parseFloat(b.group) || a.label.localeCompare(b.label),
  );

  const executiveInfo = executiveInfos?.find((data) => data.jobName === jobName);
  const prevInfo = {
    value: executiveInfo?.memberId ? executiveInfo.memberId : -1,
    label: executiveInfo?.realName ? executiveInfo.realName : '',
    group: executiveInfo?.generation ? executiveInfo.generation : '',
  };

  // 사용자가 직접 선택하기 전까지는 현재 담당자를 선택값으로 사용합니다.
  const [selectedValue, setSelectedValue] = useState<SingleAutoCompleteValue | undefined>(undefined);
  const value = selectedValue === undefined ? (prevInfo.value === -1 ? null : prevInfo) : selectedValue;

  const actionButtionClick = () => {
    const jobId = jobList?.find((data) => data.jobName === jobInfo?.JobName)?.jobId;

    if (value === null && prevInfo.value !== -1) {
      const deleteThing = {
        memberId: prevInfo.value,
        jobId: jobId !== undefined ? jobId : -1,
      };
      deleteJob(deleteThing);
    }

    if (value !== null && prevInfo.value !== value.value) {
      if (prevInfo.value !== -1) {
        const deleteThing = {
          memberId: prevInfo.value,
          jobId: jobId !== undefined ? jobId : -1,
        };
        deleteJob(deleteThing);
      }

      const createMember = memberList?.find((data) => data.memberId === value.value);
      const createThing = {
        memberId: createMember?.memberId ? createMember?.memberId : -1,
        jobId: jobId !== undefined ? jobId : -1,
      };
      createJob(createThing);
    }

    onClose();
  };

  return (
    <ActionModal
      modalWidth="sm"
      open={open}
      onClose={onClose}
      title={roleName + restOfTitle}
      actionButtonName="변경"
      onActionButonClick={actionButtionClick}
    >
      <div className="flex items-center">
        <img className="w-[150px]" alt={jobName} src={badgeImage} />
        <AutoComplete
          className="mx-12 w-60"
          items={sortedOptions}
          value={value}
          grouped
          onChange={(v) => setSelectedValue(v)}
        />
      </div>
    </ActionModal>
  );
};

export default ChangeRolePersonModal;
