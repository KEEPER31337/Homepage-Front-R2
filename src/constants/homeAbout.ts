import { PageBlockInfo } from '@api/dto';

export const HOME_ACTIVITY_BLOCK: PageBlockInfo = {
  id: 1,
  title: 'Activity',
  type: 'activity',
  subtitleImages: [
    {
      id: 2,
      subtitle: '세미나',
      thumbnailPath: undefined,
      displayOrder: 1,
      staticWriteContents: [
        { id: 1, content: '매주 금요일 마다 정기적으로 운영', displayOrder: 1 },
        { id: 2, content: '공지사항 전달 및 건의', displayOrder: 2 },
        { id: 3, content: '개인 발표 또는 팀 발표', displayOrder: 3 },
      ],
    },
    {
      id: 3,
      subtitle: '스터디 & 멘토링',
      thumbnailPath: undefined,
      displayOrder: 2,
      staticWriteContents: [
        { id: 4, content: '매학기 활동 시작 전 원하는 스터디 개설 및 스터디원 구성', displayOrder: 1 },
        { id: 5, content: '스터디원과의 시간 협의 후 가능한 시간에 매주 스터디 진행', displayOrder: 2 },
        {
          id: 6,
          content: '신입 회원의 경우 멘토링 진행 (기본적인 프로그래밍, 기초 보안 학습)',
          displayOrder: 3,
        },
      ],
    },
    {
      id: 4,
      subtitle: '기술문서',
      thumbnailPath: undefined,
      displayOrder: 3,
      staticWriteContents: [
        { id: 7, content: '여름/겨울 방학 기간에 원하는 주제로 사람을 모집하여 기술 문서 작성', displayOrder: 1 },
        { id: 8, content: '1년에 1건 이상 작성 요구', displayOrder: 2 },
        { id: 9, content: '제안서 발표, 중간 발표, 최종 발표로 진행상황 공유', displayOrder: 3 },
      ],
    },
  ],
};

export const HOME_EXCELLENCE_BLOCK: PageBlockInfo = {
  id: 2,
  title: 'Excellence',
  type: 'excellence',
  subtitleImages: [
    {
      id: 1,
      subtitle: '동아리 지원',
      thumbnailPath: undefined,
      displayOrder: 1,
      staticWriteContents: [
        { id: 1, content: '도서 및 기자재 지원', displayOrder: 1 },
        { id: 2, content: '스터디룸 비용 지원', displayOrder: 2 },
        { id: 3, content: '회식비 지원', displayOrder: 3 },
      ],
    },
    {
      id: 2,
      subtitle: '이벤트',
      thumbnailPath: undefined,
      displayOrder: 2,
      staticWriteContents: [{ id: 4, content: '키퍼 내 CTF 퀴즈 이벤트', displayOrder: 1 }],
    },
    {
      id: 3,
      subtitle: '대외활동',
      thumbnailPath: undefined,
      displayOrder: 3,
      staticWriteContents: [{ id: 5, content: 'CTF 참가', displayOrder: 1 }],
    },
  ],
};

export const HOME_HISTORY_BLOCK: PageBlockInfo = {
  id: 3,
  title: 'History',
  type: 'history',
  subtitleImages: [
    {
      id: 1,
      subtitle: '2010',
      thumbnailPath: undefined,
      displayOrder: 1,
      staticWriteContents: [
        {
          id: 1,
          content: '한국인터넷진흥원(KISA) 주관 대학 정보보호동아리 지원사업(KUCIS)에 대학 정보보호 동아리로서 참여',
          displayOrder: 1,
        },
      ],
    },
    {
      id: 2,
      subtitle: '2012',
      thumbnailPath: undefined,
      displayOrder: 2,
      staticWriteContents: [
        {
          id: 2,
          content:
            '본교 학생회관에서 KUCIS 영남권역 세미나를 개최하여 부산 외의 인접지역에 있는 정보보호동아리들과 지식을 공유하고 교류함',
          displayOrder: 1,
        },
      ],
    },
    {
      id: 3,
      subtitle: '2014',
      thumbnailPath: undefined,
      displayOrder: 3,
      staticWriteContents: [
        {
          id: 3,
          content:
            '정보보호동아리 및 정보보호 분야의 현업에 종사하고 있는 사람들까지 대상으로한 경남권 정보보호 세미나를 주최함',
          displayOrder: 1,
        },
        {
          id: 4,
          content: '경남권 동아리와 함께 청소년을 대상으로 정보보호의 입문을 돕기위한 Security One을 주최함',
          displayOrder: 2,
        },
      ],
    },
    {
      id: 4,
      subtitle: '2015',
      thumbnailPath: undefined,
      displayOrder: 4,
      staticWriteContents: [
        { id: 5, content: 'KUCIS 사업 참여, MS(MicroSoft) Windows10 서포터즈 1등', displayOrder: 1 },
      ],
    },
    {
      id: 5,
      subtitle: '2016',
      thumbnailPath: undefined,
      displayOrder: 5,
      staticWriteContents: [{ id: 6, content: 'KUCIS 사업 참여', displayOrder: 1 }],
    },
    {
      id: 6,
      subtitle: '2017',
      thumbnailPath: undefined,
      displayOrder: 6,
      staticWriteContents: [{ id: 7, content: '교내 서비스 취약점 분석', displayOrder: 1 }],
    },
    {
      id: 7,
      subtitle: '2018',
      thumbnailPath: undefined,
      displayOrder: 7,
      staticWriteContents: [{ id: 8, content: 'KUCIS, 시원포럼 경남지역 연합세미나 주최', displayOrder: 1 }],
    },
    {
      id: 8,
      subtitle: '2020',
      thumbnailPath: undefined,
      displayOrder: 8,
      staticWriteContents: [
        { id: 9, content: '암호동아리 지원사업 참가', displayOrder: 1 },
        { id: 10, content: '제6회 동서발전 정보보안 온라인 경진대회 우수상', displayOrder: 2 },
      ],
    },
    {
      id: 9,
      subtitle: '2021',
      thumbnailPath: undefined,
      displayOrder: 9,
      staticWriteContents: [
        { id: 11, content: '화이트해커 양성 프로젝트 참여', displayOrder: 1 },
        { id: 12, content: '암호동아리 지원사업 참가', displayOrder: 2 },
      ],
    },
    {
      id: 10,
      subtitle: '2022',
      thumbnailPath: undefined,
      displayOrder: 10,
      staticWriteContents: [
        { id: 13, content: '코드게이트 본선 진출', displayOrder: 1 },
        { id: 14, content: '전국 연합 동아리 CCA 가입', displayOrder: 2 },
        { id: 15, content: '영남권 연합 동아리 참여', displayOrder: 3 },
      ],
    },
    {
      id: 11,
      subtitle: '2023',
      thumbnailPath: undefined,
      displayOrder: 11,
      staticWriteContents: [
        { id: 16, content: '2023 세종 HackTheon 본선 진출', displayOrder: 1 },
        { id: 17, content: '2023 KOSPO CTF 장려상', displayOrder: 2 },
        { id: 18, content: 'BWB2023(블록체인인프라보안) 행사', displayOrder: 3 },
        { id: 19, content: 'SW 중심대학 자율주행 경진대회 대상', displayOrder: 4 },
        { id: 20, content: 'PNU SW Innovation 창업 해커톤 대회 최우수상', displayOrder: 5 },
        { id: 21, content: '부산대학교 TinyML Challenge 우수상', displayOrder: 6 },
      ],
    },
    {
      id: 12,
      subtitle: '2024',
      thumbnailPath: undefined,
      displayOrder: 12,
      staticWriteContents: [
        { id: 24, content: '2024 KOSPO CTF 장려상', displayOrder: 1 },
        { id: 25, content: '2024 세종 HackTheon 우수상', displayOrder: 2 },
        { id: 26, content: '제1회 대한민국 SW 융합 해커톤 대회 지정 과제부문 대상', displayOrder: 3 },
        { id: 27, content: '2024 XRPL 해커톤 스마트 컨트랙트 부문 Winner', displayOrder: 4 },
        { id: 29, content: '2024년 제1회 전국대학스마트정보통신공유포럼 우수상', displayOrder: 5 },
        { id: 31, content: '시큐포럼(Security One) 공동운영 참여', displayOrder: 6 },
        { id: 32, content: 'PNU 정보보호대학원 해킹경진대회 운영', displayOrder: 7 },
      ],
    },
    {
      id: 13,
      subtitle: '2025',
      thumbnailPath: undefined,
      displayOrder: 13,
      staticWriteContents: [
        { id: 33, content: '영남권 정보보안 모의해킹대회 공동운영 및 참여', displayOrder: 1 },
        { id: 34, content: 'HACKSIUM 2025 우수상', displayOrder: 2 },
        { id: 35, content: '2025 세종 HackTheon 본선 진출', displayOrder: 3 },
        { id: 36, content: 'PNU 버그헌팅 대/최우수/우수/장려상', displayOrder: 4 },
      ],
    },
  ],
};
