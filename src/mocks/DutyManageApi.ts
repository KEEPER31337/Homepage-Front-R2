import chairmanBadge from '@assets/dutyManage/badge_1_chairman.gif';
import viceChairmanBadge from '@assets/dutyManage/badge_2_vice_chairman.gif';
import externalManagerBadge from '@assets/dutyManage/badge_3_external_manager.gif';
import studyManagerBadge from '@assets/dutyManage/badge_4_study_manager.gif';
import ITManagerBadge from '@assets/dutyManage/badge_5_it_manager.gif';
import clerkBadge from '@assets/dutyManage/badge_6_clerk.gif';
import administratorBadge from '@assets/dutyManage/badge_7_administrator.gif';
import librarianBadge from '@assets/dutyManage/badge_8_librarian.gif';

interface RoleDutyList {
  jobName: string;
  roleDuty: { key: number; content: string }[];
}

const roleDutyListInfo: RoleDutyList[] = [
  {
    jobName: 'ROLE_회장',
    roleDuty: [
      {
        key: 1,
        content: '회장은 본회를 대표하며, 본회에서 주최하는 모든 행사의 대표자와 사회자를 맡으며, 인사관리를 담당한다.',
      },
      { key: 2, content: '대표자나 사회자의 역할은 필요에 따라 대리인에게 위임할 수 있다.' },
    ],
  },
  {
    jobName: 'ROLE_부회장',
    roleDuty: [
      { key: 1, content: '부회장은 회장의 업무를 보좌하며, 회장의 부재 시 우선적으로 회장의 역할을 위임받는다.' },
    ],
  },
  {
    jobName: 'ROLE_학술부장',
    roleDuty: [{ key: 1, content: '학술부장은 본회의 모든 연구 활동, 스터디, 각종 문서, 강의실 대여를 관리한다.' }],
  },
  {
    jobName: 'ROLE_대외부장',
    roleDuty: [{ key: 1, content: '동아리 지원사업 관리 및 유지하며 관련 자료를 수집, 기록한다.' }],
  },
  {
    jobName: 'ROLE_전산관리자',
    roleDuty: [
      { key: 1, content: '전산 관리자는 본회의 서버, 홈페이지를 비롯한 모든 전산 작업의 유지 및 보수를 담당한다.' },
    ],
  },
  {
    jobName: 'ROLE_서기',
    roleDuty: [
      {
        key: 1,
        content: '서기는 본회에서 일어나는 모든 활동 및 행사의 기록, 보관 및 도서 관련 업무를 담당한다.',
      },
      { key: 2, content: '상점과 처벌에 의한 벌점을 관리한다.' },
    ],
  },
  {
    jobName: 'ROLE_사서',
    roleDuty: [{ key: 1, content: '사서는 동아리에 새로 들어오는 책에 표시(주기)하고, 동아리 소유의 책을 관리한다.' }],
  },
  {
    jobName: 'ROLE_총무',
    roleDuty: [{ key: 1, content: '총무는 본회의 재무를 담당하며, 본회에서 주최하는 모든 재정적 업무를 총괄한다.' }],
  },
  {
    jobName: 'ROLE_FRONT_전산관리자',
    roleDuty: [
      { key: 1, content: '전산 관리자는 본회의 서버, 홈페이지를 비롯한 모든 전산 작업의 유지 및 보수를 담당한다.' },
    ],
  },
  {
    jobName: 'ROLE_BACK_전산관리자',
    roleDuty: [
      { key: 1, content: '전산 관리자는 본회의 서버, 홈페이지를 비롯한 모든 전산 작업의 유지 및 보수를 담당한다.' },
    ],
  },
  {
    jobName: 'ROLE_INFRA_전산관리자',
    roleDuty: [
      { key: 1, content: '전산 관리자는 본회의 서버, 홈페이지를 비롯한 모든 전산 작업의 유지 및 보수를 담당한다.' },
    ],
  },
];

const roles = [
  { name: 'ROLE_회장', img: chairmanBadge },
  { name: 'ROLE_부회장', img: viceChairmanBadge },
  { name: 'ROLE_대외부장', img: externalManagerBadge },
  { name: 'ROLE_학술부장', img: studyManagerBadge },
  { name: 'ROLE_전산관리자', img: ITManagerBadge },
  { name: 'ROLE_서기', img: clerkBadge },
  { name: 'ROLE_총무', img: administratorBadge },
  { name: 'ROLE_사서', img: librarianBadge },
];

export type JobInfoType = {
  JobName: string;
  roleName: string;
};

const convertJobName: Array<JobInfoType> = [
  { JobName: 'ROLE_회장', roleName: '회장' },
  { JobName: 'ROLE_부회장', roleName: '부회장' },
  { JobName: 'ROLE_대외부장', roleName: '대외부장' },
  { JobName: 'ROLE_학술부장', roleName: '학술부장' },
  { JobName: 'ROLE_FRONT_전산관리자', roleName: 'FRONT' },
  { JobName: 'ROLE_BACK_전산관리자', roleName: 'BACK' },
  { JobName: 'ROLE_서기', roleName: '서기' },
  { JobName: 'ROLE_총무', roleName: '총무' },
  { JobName: 'ROLE_사서', roleName: '사서' },
  { JobName: 'ROLE_INFRA_전산관리자', roleName: 'INFRA' },
  { JobName: 'ROLE_전산관리자', roleName: '전산관리자' },
];

export { roleDutyListInfo, roles, convertJobName };
