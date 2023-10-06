interface memberTypeInfo {
  type: string;
  renderType: string;
  typeId: number;
  color?: string;
}

const memberTypes: memberTypeInfo[] = [
  { type: '정회원', renderType: '활동회원', typeId: 2, color: 'pointBlue' },
  { type: '휴면회원', renderType: '휴면', typeId: 3, color: 'white' },
  { type: '졸업', renderType: '졸업', typeId: 4, color: 'mainBlack' },
  { type: '비회원', renderType: '비회원', typeId: 1, color: '' },
  { type: '탈퇴', renderType: '탈퇴', typeId: 5, color: '' },
];

export default memberTypes;
