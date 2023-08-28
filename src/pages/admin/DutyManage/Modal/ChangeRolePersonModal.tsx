import React, { useEffect, useState } from 'react';
import ActionModal from '@components/Modal/ActionModal';

import AutoComplete, { AutoCompleteValueType } from '@components/Input/AutoComplete';
import {
  useGetExecutiveInfoQuery,
  useGetMemberInfoQuery,
  useCreateExecutiveJobMutation,
  useDeleteExecutiveJobMutation,
} from '@api/dutyManageApi';
import { ExecutiveInfo } from '@api/dto';

interface ChangeRolePersonModalProps {
  open: boolean;
  toggleOpen: () => void;
  jobName?: string;
  badgeImage?: string;
}

const convertJobName = [
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

  const options: { value: number; label: string }[] = [];
  memberList?.forEach((data) => options.push({ value: data.memberId, label: data.memberName }));

  const [value, setValue] = useState<AutoCompleteValueType>(null);
  const [prevInfo, setPrevInfo] = useState<{ value: number; label: string }>({ value: -1, label: '' });
  const [jobInfo, setJobInfo] = useState<ExecutiveInfo>();

  useEffect(() => {
    const executiveInfo = executiveInfos?.find((data) => data.jobName === jobName);

    const currentInfo = {
      value: executiveInfo?.memberId ? executiveInfo.memberId : -1,
      label: executiveInfo?.realName ? executiveInfo.realName : '',
    };

    setPrevInfo(currentInfo);
    setJobInfo(executiveInfo);
    setValue(currentInfo);
  }, [executiveInfos]);

  const actionButtionClick = () => {
    if (value !== null && !Array.isArray(value) && prevInfo.value !== value.value) {
      const deleteThing = {
        memberId: prevInfo.value,
        jobId: jobInfo ? jobInfo.jobId : -1,
      };
      deleteJob(deleteThing);

      const createMember = memberList?.find((data) => data.memberId === value.value);
      const createThing = {
        memberId: createMember?.memberId ? createMember?.memberId : -1,
        jobId: jobInfo ? jobInfo.jobId : -1,
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
        <AutoComplete className="mx-12 w-60" items={options} value={value} onChange={(v) => setValue(v)} />
      </div>
    </ActionModal>
  );
};

export default ChangeRolePersonModal;
