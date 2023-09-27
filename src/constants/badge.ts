import chairmanBadge from '@assets/dutyManage/badge_1_chairman.gif';
import viceChairmanBadge from '@assets/dutyManage/badge_2_vice_chairman.gif';
import externalManagerBadge from '@assets/dutyManage/badge_3_external_manager.gif';
import studyManagerBadge from '@assets/dutyManage/badge_4_study_manager.gif';
import ITManagerBadge from '@assets/dutyManage/badge_5_it_manager.gif';
import clerkBadge from '@assets/dutyManage/badge_6_clerk.gif';
import administratorBadge from '@assets/dutyManage/badge_7_administrator.gif';
import librarianBadge from '@assets/dutyManage/badge_8_librarian.gif';
import graduateBadge from '@assets/profileBadge/profile_badge_state_graduate.gif';
import regularBadge from '@assets/profileBadge/profile_badge_state_regular.gif';
import sleepBadge from '@assets/profileBadge/profile_badge_state_sleep.gif';

const roles = [
  { name: 'ROLE_회장', img: chairmanBadge },
  { name: 'ROLE_부회장', img: viceChairmanBadge },
  { name: 'ROLE_서기', img: clerkBadge },
  { name: 'ROLE_총무', img: administratorBadge },
  { name: 'ROLE_사서', img: librarianBadge },
  { name: 'ROLE_학술부장', img: studyManagerBadge },
  { name: 'ROLE_대외부장', img: externalManagerBadge },
  { name: 'ROLE_FRONT_전산관리자', img: ITManagerBadge },
  { name: 'ROLE_BACK_전산관리자', img: ITManagerBadge },
  { name: 'ROLE_INFRA_전산관리자', img: ITManagerBadge },
];

const types: { [key: string]: string } = { 정회원: regularBadge, 졸업: graduateBadge, 휴면: sleepBadge };

export { types, roles };
