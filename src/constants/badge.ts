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
import { MEMBER_ROLE } from './member';

const roles = [
  { name: MEMBER_ROLE.회장, img: chairmanBadge },
  { name: MEMBER_ROLE.부회장, img: viceChairmanBadge },
  { name: MEMBER_ROLE.서기, img: clerkBadge },
  { name: MEMBER_ROLE.총무, img: administratorBadge },
  { name: MEMBER_ROLE.사서, img: librarianBadge },
  { name: MEMBER_ROLE.학술부장, img: studyManagerBadge },
  { name: MEMBER_ROLE.대외부장, img: externalManagerBadge },
  { name: MEMBER_ROLE.FRONT_전산관리자, img: ITManagerBadge },
  { name: MEMBER_ROLE.BACK_전산관리자, img: ITManagerBadge },
  { name: MEMBER_ROLE.INFRA_전산관리자, img: ITManagerBadge },
];

const types: { [key: string]: string } = { 정회원: regularBadge, 졸업: graduateBadge, 휴면회원: sleepBadge };

export { types, roles };
