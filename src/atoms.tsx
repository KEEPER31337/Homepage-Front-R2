import { atomFamily } from 'recoil';

export const SidebarCategoryState = atomFamily({
  key: 'currentCategory',
  default: 0,
});

export const SidebarSubcategoryState = atomFamily({
  key: 'currentSubcategory',
  default: 0,
});
