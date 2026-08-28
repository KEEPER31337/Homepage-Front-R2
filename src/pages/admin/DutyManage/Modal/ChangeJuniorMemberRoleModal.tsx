import React, { useEffect, useMemo, useState } from 'react';
import {
  useCreateExecutiveJobMutation,
  useDeleteExecutiveJobMutation,
  useGetJobListQuery,
  useGetMemberInfoQuery,
} from '@api/dutyManageApi';
import { ExecutiveInfo } from '@api/dto';
import AutoComplete, { SingleAutoCompleteValue } from '@components/Input/AutoComplete';
import ActionModal from '@components/Modal/ActionModal';
import { isJuniorExecutiveRole, MEMBER_ROLE_PREFIX } from '@constants/member';
import { roles } from '@mocks/DutyManageApi';

interface ChangeJuniorMemberRoleModalProps {
  open: boolean;
  toggleOpen: () => void;
  currentAssignment?: ExecutiveInfo;
  juniorAssignments: ExecutiveInfo[];
}

const ChangeJuniorMemberRoleModal = ({
  open,
  toggleOpen,
  currentAssignment,
  juniorAssignments,
}: ChangeJuniorMemberRoleModalProps) => {
  const { data: memberList } = useGetMemberInfoQuery();
  const { data: jobList } = useGetJobListQuery();
  const { mutateAsync: createJob, isPending: isCreating } = useCreateExecutiveJobMutation();
  const { mutateAsync: deleteJob, isPending: isDeleting } = useDeleteExecutiveJobMutation();

  const memberOptions = useMemo(
    () =>
      (memberList ?? [])
        .map((member) => ({
          value: member.memberId,
          label: member.realName,
          group: member.generation,
        }))
        .sort((a, b) => parseFloat(a.group) - parseFloat(b.group) || a.label.localeCompare(b.label)),
    [memberList],
  );
  const roleOptions = useMemo(
    () =>
      (jobList ?? [])
        .filter((job) => isJuniorExecutiveRole(job.jobName))
        .map((job) => ({
          value: job.jobId,
          label: job.jobName.replace(MEMBER_ROLE_PREFIX, ''),
        })),
    [jobList],
  );

  const [memberValue, setMemberValue] = useState<SingleAutoCompleteValue>(null);
  const [roleValue, setRoleValue] = useState<SingleAutoCompleteValue>(null);

  useEffect(() => {
    if (!open) return;

    setMemberValue(
      currentAssignment
        ? (memberOptions.find((option) => option.value === currentAssignment.memberId) ?? {
            value: currentAssignment.memberId,
            label: currentAssignment.realName,
            group: currentAssignment.generation,
          })
        : null,
    );
    setRoleValue(
      currentAssignment
        ? (roleOptions.find((option) => option.value === currentAssignment.jobId) ?? {
            value: currentAssignment.jobId,
            label: currentAssignment.jobName.replace(MEMBER_ROLE_PREFIX, ''),
          })
        : null,
    );
  }, [currentAssignment, memberOptions, open, roleOptions]);

  const selectedMemberId = memberValue ? Number(memberValue.value) : null;
  const selectedJobId = roleValue ? Number(roleValue.value) : null;
  const isRemoval = Boolean(currentAssignment) && memberValue === null;
  const isChanged = currentAssignment?.memberId !== selectedMemberId || currentAssignment?.jobId !== selectedJobId;
  const isDuplicate =
    selectedMemberId !== null &&
    selectedJobId !== null &&
    juniorAssignments.some(
      (assignment) =>
        assignment.memberId === selectedMemberId &&
        assignment.jobId === selectedJobId &&
        (assignment.memberId !== currentAssignment?.memberId || assignment.jobId !== currentAssignment?.jobId),
    );
  const actionButtonDisabled =
    isCreating ||
    isDeleting ||
    isDuplicate ||
    (!isRemoval && (selectedMemberId === null || selectedJobId === null || !isChanged));

  const selectedRoleName = roleValue ? `${MEMBER_ROLE_PREFIX}${roleValue.label}` : undefined;
  const badgeImage = roles.find((role) => role.name === selectedRoleName)?.img;

  const handleActionButtonClick = async () => {
    try {
      if (currentAssignment && memberValue === null) {
        await deleteJob({ memberId: currentAssignment.memberId, jobId: currentAssignment.jobId });
        toggleOpen();
        return;
      }

      if (selectedMemberId === null || selectedJobId === null) return;

      if (currentAssignment) {
        await deleteJob({ memberId: currentAssignment.memberId, jobId: currentAssignment.jobId });
      }
      await createJob({ memberId: selectedMemberId, jobId: selectedJobId });
      toggleOpen();
    } catch {
      // API 오류는 전역 mutation 오류 처리기에서 안내한다.
    }
  };

  return (
    <ActionModal
      modalWidth="sm"
      open={open}
      onClose={toggleOpen}
      title={currentAssignment ? '부원 담당자 변경' : '부원 담당자 추가'}
      actionButtonName={currentAssignment ? '변경' : '추가'}
      actionButtonDisabled={actionButtonDisabled}
      cancelButtonDisabled={isCreating || isDeleting}
      onActionButonClick={handleActionButtonClick}
    >
      <div className="flex items-center">
        {badgeImage ? (
          <img className="w-[150px]" alt={selectedRoleName} src={badgeImage} />
        ) : (
          <div className="flex h-[150px] w-[150px] shrink-0 items-center justify-center rounded border border-dashed border-subGray text-subGray">
            역할 미선택
          </div>
        )}
        <div className="mx-12 flex w-60 flex-col gap-6">
          <AutoComplete
            items={memberOptions}
            value={memberValue}
            grouped
            onChange={setMemberValue}
            placeholder="부원 선택"
          />
          <AutoComplete items={roleOptions} value={roleValue} onChange={setRoleValue} placeholder="역할 선택" />
        </div>
      </div>
    </ActionModal>
  );
};

export default ChangeJuniorMemberRoleModal;
