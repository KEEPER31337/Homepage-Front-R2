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
  roleDuty: string[];
}

const roleDutyListInfo: RoleDutyList[] = [
  {
    roleName: '회장',
    roleDuty: ['회장 역할 1', '회장 역할 2', '회장 역할 3', '회장 역할 4', '회장 역할 5', '회장 역할 6'],
  },
  {
    roleName: '부회장',
    roleDuty: [
      '부회장 역할 1',
      '부회장 역할 2',
      '부회장 역할 3',
      '부회장 역할 4',
      '부회장 역할 5',
      '부회장 역할 6',
      '굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 긴 문자열',
    ],
  },
  {
    roleName: '학술부장',
    roleDuty: [
      '학술부장 역할 1',
      '학술부장 역할 2',
      '학술부장 역할 3',
      '학술부장 역할 4',
      '학술부장 역할 5',
      '학술부장 역할 6',
    ],
  },
  {
    roleName: '대외부장',
    roleDuty: [
      '대외부장 역할 1',
      '대외부장 역할 2',
      '대외부장 역할 3',
      '대외부장 역할 4',
      '대외부장 역할 5',
      '대외부장 역할 6',
      '굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 긴 문자열',
    ],
  },
  {
    roleName: '전산관리자',
    roleDuty: [
      '전산관리자 역할 1',
      '전산관리자 역할 2',
      '전산관리자 역할 3',
      '전산관리자 역할 4',
      '전산관리자 역할 5',
      '전산관리자 역할 6',
      '굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 긴 문자열',
    ],
  },
  {
    roleName: '서기',
    roleDuty: [
      '서기 역할 1',
      '서기 역할 2',
      '서기 역할 3',
      '서기 역할 4',
      '서기 역할 5',
      '서기 역할 6',
      '굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 긴 문자열',
    ],
  },
  {
    roleName: '사서',
    roleDuty: ['사서 역할 1', '사서 역할 2', '사서 역할 3', '사서 역할 4', '사서 역할 5', '사서 역할 6'],
  },
  {
    roleName: '총무',
    roleDuty: [
      '총무 역할 1',
      '총무 역할 2',
      '총무 역할 3',
      '총무 역할 4',
      '총무 역할 5',
      '총무 역할 6',
      '굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 굉장히 긴 문자열',
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
  { roleName: '회장', rolePersonName: '박재열', generation: '12', front: false },
  { roleName: '부회장', rolePersonName: '김태연', generation: '11', front: false },
  { roleName: '대외부장', rolePersonName: '신채원', generation: '13.5', front: false },
  { roleName: '학술부장', rolePersonName: '이현', generation: '10.5', front: false },
  { roleName: '전산관리자', rolePersonName: '조승현', generation: '9', front: true },
  { roleName: '전산관리자', rolePersonName: '손현경', generation: '13', front: false },
  { roleName: '서기', rolePersonName: '한대희', generation: '13', front: false },
  { roleName: '총무', rolePersonName: '민예진', generation: '12.5', front: false },
  { roleName: '사서', rolePersonName: '박소현', generation: '13', front: false },
];

export { roleDutyListInfo, roles, roleInfos };
