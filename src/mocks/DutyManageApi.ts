import chairmanBadge from '@assets/dutyManage/badge_1_chairman.gif';
import viceChairmanBadge from '@assets/dutyManage/badge_2_vice_chairman.gif';
import externalManagerBadge from '@assets/dutyManage/badge_3_external_manager.gif';
import studyManagerBadge from '@assets/dutyManage/badge_4_study_manager.gif';
import ITManagerBadge from '@assets/dutyManage/badge_5_it_manager.gif';
import clerkBadge from '@assets/dutyManage/badge_6_clerk.gif';
import administratorBadge from '@assets/dutyManage/badge_7_administrator.gif';
import librarianBadge from '@assets/dutyManage/badge_8_librarian.gif';

interface RoleDutyList {
  roleName: string;
  roleDuty: { key: number; content: string }[];
}

const roleDutyListInfo: RoleDutyList[] = [
  {
    roleName: '회장',
    roleDuty: [
      { key: 1, content: '회장역할 1' },
      { key: 2, content: '회장역할 2' },
      { key: 3, content: '회장역할 3' },
      { key: 4, content: '회장역할 4' },
      { key: 5, content: '회장역할 5' },
      { key: 6, content: '회장역할 6' },
    ],
  },
  {
    roleName: '부회장',
    roleDuty: [
      { key: 1, content: '부회장역할 1' },
      { key: 2, content: '부회장역할 2' },
      { key: 3, content: '부회장역할 3' },
      { key: 4, content: '부회장역할 4' },
      { key: 5, content: '부회장역할 5' },
      {
        key: 6,
        content:
          '굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 긴 문자열',
      },
    ],
  },
  {
    roleName: '학술부장',
    roleDuty: [
      { key: 1, content: '학술부장역할 1' },
      { key: 2, content: '학술부장역할 2' },
      { key: 3, content: '학술부장역할 3' },
      { key: 4, content: '학술부장역할 4' },
      { key: 5, content: '학술부장역할 5' },
      {
        key: 6,
        content:
          '굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 긴 문자열',
      },
    ],
  },
  {
    roleName: '대외부장',
    roleDuty: [
      { key: 1, content: '대외부장역할 1' },
      { key: 2, content: '대외부장역할 2' },
      { key: 3, content: '대외부장역할 3' },
      { key: 4, content: '대외부장역할 4' },
      { key: 5, content: '대외부장역할 5' },
      { key: 6, content: '대외부장역할 6' },
    ],
  },
  {
    roleName: '전산관리자',
    roleDuty: [
      { key: 1, content: '전산관리자역할 1' },
      { key: 2, content: '전산관리자역할 2' },
      { key: 3, content: '전산관리자역할 3' },
      { key: 4, content: '전산관리자역할 4' },
      { key: 5, content: '전산관리자역할 5' },
      { key: 6, content: '전산관리자역할 6' },
    ],
  },
  {
    roleName: '서기',
    roleDuty: [
      { key: 1, content: '서기역할 1' },
      { key: 2, content: '서기역할 2' },
      { key: 3, content: '서기역할 3' },
      { key: 4, content: '서기역할 4' },
      { key: 5, content: '서기역할 5' },
      { key: 6, content: '서기역할 6' },
    ],
  },
  {
    roleName: '사서',
    roleDuty: [
      { key: 1, content: '사서역할 1' },
      { key: 2, content: '사서역할 2' },
      { key: 3, content: '사서역할 3' },
      { key: 4, content: '사서역할 4' },
      {
        key: 5,
        content:
          '굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 긴 문자열',
      },
      { key: 6, content: '사서역할 6' },
    ],
  },
  {
    roleName: '총무',
    roleDuty: [
      { key: 1, content: '총무역할 1' },
      { key: 2, content: '총무역할 2' },
      {
        key: 3,
        content:
          '굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 긴 문자열',
      },
      { key: 4, content: '총무역할 4' },
      { key: 5, content: '총무역할 5' },
      { key: 6, content: '총무역할 6' },
    ],
  },
  {
    roleName: 'FRONT',
    roleDuty: [
      { key: 1, content: 'FRONT 1' },
      { key: 2, content: 'FRONT 2' },
      { key: 3, content: 'FRONT 3' },
      { key: 4, content: 'FRONT 4' },
      { key: 5, content: 'FRONT 5' },
      { key: 6, content: 'FRONT 6' },
    ],
  },
  {
    roleName: 'BACK',
    roleDuty: [
      { key: 1, content: 'BACK 1' },
      {
        key: 2,
        content:
          '굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 긴 문자열',
      },
      { key: 3, content: 'BACK 3' },
      { key: 4, content: 'BACK 4' },
      { key: 5, content: 'BACK 5' },
      { key: 6, content: 'BACK 6' },
    ],
  },
  {
    roleName: 'INFRA',
    roleDuty: [
      { key: 1, content: 'INFRA 1' },
      { key: 2, content: 'INFRA 2' },
      { key: 3, content: 'INFRA 3' },
      { key: 4, content: 'INFRA 4' },
      { key: 5, content: 'INFRA 5' },
      { key: 6, content: 'INFRA 6' },
    ],
  },
];

const roles = [
  { name: '회장', img: chairmanBadge },
  { name: '부회장', img: viceChairmanBadge },
  { name: '대외부장', img: externalManagerBadge },
  { name: '학술부장', img: studyManagerBadge },
  { name: '전산관리자', img: ITManagerBadge },
  { name: '서기', img: clerkBadge },
  { name: '총무', img: administratorBadge },
  { name: '사서', img: librarianBadge },
];

const roleInfos = [
  { roleName: '회장', rolePersonName: '박재열', generation: '12' },
  { roleName: '부회장', rolePersonName: '김태연', generation: '11' },
  { roleName: '대외부장', rolePersonName: '신채원', generation: '13.5' },
  { roleName: '학술부장', rolePersonName: '이현', generation: '10.5' },
  { roleName: 'FRONT', rolePersonName: '조승현', generation: '9' },
  { roleName: 'BACK', rolePersonName: '손현경', generation: '13' },
  { roleName: 'INFRA', rolePersonName: '전설', generation: '8' },
  { roleName: '서기', rolePersonName: '한대희', generation: '13' },
  { roleName: '총무', rolePersonName: '민예진', generation: '12.5' },
  { roleName: '사서', rolePersonName: '박소현', generation: '13' },
];

export { roleDutyListInfo, roles, roleInfos };
