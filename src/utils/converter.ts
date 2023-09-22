import CATEGORIES from '@constants/category';

const formatFileSize = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
};

const categoryNameToId = (categoryName: string) => {
  for (let i = 0; i < CATEGORIES.length; i += 1) {
    const { subCategories } = CATEGORIES[i];
    for (let j = 0; j < subCategories.length; j += 1) {
      const subCategory = subCategories[j];
      if (subCategory.name === categoryName) {
        return subCategory.id;
      }
    }
  }
  return null;
};

const formatGeneration = (generation: string) => {
  return generation.replace('.0', '');
};

const getServerImgUrl = (url: string) => {
  return `${process.env.REACT_APP_API_URL}/${url}`;
};

export { formatFileSize, categoryNameToId, getServerImgUrl, formatGeneration };
