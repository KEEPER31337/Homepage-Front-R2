import { atom, atomFamily } from 'recoil';

const SidebarState = atomFamily({
  key: 'currentCategory',
  default: 0,
});

export default SidebarState;
