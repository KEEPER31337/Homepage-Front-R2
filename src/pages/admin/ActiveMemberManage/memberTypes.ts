import type { MemberType } from '@api/dto';

export interface MemberTypeInfo {
  type: MemberType;
  renderType: string;
  typeId: number;
  colorClassName: string;
}

export type MemberManagementAction = { kind: 'changeType'; memberType: MemberTypeInfo } | { kind: 'delete' };

const memberTypes: MemberTypeInfo[] = [
  { type: '정회원', renderType: '활동회원', typeId: 2, colorClassName: 'bg-pointBlue' },
  { type: '휴면회원', renderType: '휴면', typeId: 3, colorClassName: 'bg-pointBlue/30' },
  { type: '졸업', renderType: '졸업', typeId: 4, colorClassName: 'bg-mainBlack' },
  { type: '비회원', renderType: '비회원', typeId: 1, colorClassName: 'bg-white' },
  { type: '가입대기', renderType: '가입대기', typeId: 5, colorClassName: 'bg-subOrange' },
];

export default memberTypes;
