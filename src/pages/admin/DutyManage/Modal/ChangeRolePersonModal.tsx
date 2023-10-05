import React, { useEffect, useState } from 'react';
import {
  useGetExecutiveInfoQuery,
  useGetMemberInfoQuery,
  useCreateExecutiveJobMutation,
  useDeleteExecutiveJobMutation,
} from '@api/dutyManageApi';
import AutoComplete, { SingleAutoCompleteValue } from '@components/Input/AutoComplete';
import ActionModal from '@components/Modal/ActionModal';

interface ChangeRolePersonModalProps {
  open: boolean;
  toggleOpen: () => void;
  jobName?: string;
  badgeImage?: string;
}

type JobInfoType = {
  key: number;
  JobName: string;
  roleName: string;
};

const convertJobName: Array<JobInfoType> = [
  { key: 1, JobName: 'ROLE_회장', roleName: '회장' },
  { key: 2, JobName: 'ROLE_부회장', roleName: '부회장' },
  { key: 3, JobName: 'ROLE_대외부장', roleName: '대외부장' },
  { key: 4, JobName: 'ROLE_학술부장', roleName: '학술부장' },
  { key: 5, JobName: 'ROLE_FRONT_전산관리자', roleName: 'FRONT' },
  { key: 6, JobName: 'ROLE_BACK_전산관리자', roleName: 'BACK' },
  { key: 7, JobName: 'ROLE_서기', roleName: '서기' },
  { key: 8, JobName: 'ROLE_총무', roleName: '총무' },
  { key: 9, JobName: 'ROLE_사서', roleName: '사서' },
  { key: 12, JobName: 'ROLE_INFRA_전산관리자', roleName: 'INFRA' },
  { key: 99, JobName: 'ROLE_전산관리자', roleName: '전산관리자' },
];

const ChangeRolePersonModal = ({ open, toggleOpen, jobName, badgeImage }: ChangeRolePersonModalProps) => {
  const roleName = convertJobName.find((data) => data.JobName === jobName)?.roleName;
  const restOfTitle = ' 담당자 변경';

  const { data: executiveInfos } = useGetExecutiveInfoQuery();
  const { data: memberList } = useGetMemberInfoQuery();
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
    if (value !== null && !Array.isArray(value) && prevInfo.value !== value.value) {
      const deleteThing = {
        memberId: prevInfo.value,
        jobId: jobInfo ? jobInfo.key : -1,
      };
      if (deleteThing.memberId !== -1) deleteJob(deleteThing);

      const createMember = memberList?.find((data) => data.memberId === value.value);
      const createThing = {
        memberId: createMember?.memberId ? createMember?.memberId : -1,
        jobId: jobInfo ? jobInfo.key : -1,
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
