import React, { useEffect, useState } from 'react';
import {
  useGetExecutiveInfoQuery,
  useGetMemberInfoQuery,
  useGetJobListQuery,
  useCreateExecutiveJobMutation,
  useDeleteExecutiveJobMutation,
} from '@api/dutyManageApi';
import { convertJobName, JobInfoType } from '@mocks/DutyManageApi';
import AutoComplete, { SingleAutoCompleteValue } from '@components/Input/AutoComplete';
import ActionModal from '@components/Modal/ActionModal';

interface ChangeRolePersonModalProps {
  open: boolean;
  toggleOpen: () => void;
  jobName?: string;
  badgeImage?: string;
}

const ChangeRolePersonModal = ({ open, toggleOpen, jobName, badgeImage }: ChangeRolePersonModalProps) => {
  const roleName = convertJobName.find((data) => data.JobName === jobName)?.roleName;
  const restOfTitle = ' 담당자 변경';

  const { data: executiveInfos } = useGetExecutiveInfoQuery();
  const { data: memberList } = useGetMemberInfoQuery();
  const { data: jobList } = useGetJobListQuery();
  const { mutate: createJob } = useCreateExecutiveJobMutation();
  const { mutate: deleteJob } = useDeleteExecutiveJobMutation();

  const options: { value: number; label: string; group: string }[] = [];
  memberList?.forEach((data) => options.push({ value: data.memberId, label: data.realName, group: data.generation }));
  const sortedOptions = options.sort((a, b) => (a.group > b.group ? 1 : -1));

  const [value, setValue] = useState<SingleAutoCompleteValue>(null);
  const [prevInfo, setPrevInfo] = useState<{ value: number; label: string; group: string }>({
    value: -1,
    label: '',
    group: '',
  });
  const [jobInfo, setJobInfo] = useState<JobInfoType>();

  useEffect(() => {
    const executiveInfo = executiveInfos?.find((data) => data.jobName === jobName);

    const currentInfo = {
      value: executiveInfo?.memberId ? executiveInfo.memberId : -1,
      label: executiveInfo?.realName ? executiveInfo.realName : '',
      group: executiveInfo?.generation ? executiveInfo.generation : '',
    };

    setPrevInfo(currentInfo);
    setJobInfo(convertJobName.find((data) => data.JobName === jobName));
    setValue(currentInfo);
  }, [executiveInfos]);

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

    toggleOpen();
  };

  return (
    <ActionModal
      modalWidth="sm"
      open={open}
      onClose={toggleOpen}
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
          onChange={(v) => setValue(v)}
        />
      </div>
    </ActionModal>
  );
};

export default ChangeRolePersonModal;
