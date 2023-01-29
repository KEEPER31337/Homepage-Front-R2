import { atomFamily } from 'recoil';

export const categoryIdStateFamily = atomFamily({
  key: 'currentCategory',
  default: 0,
});

export const subcategoryIdStateFamily = atomFamily({
  key: 'currentSubcategory',
  default: 0,
});
