import React from 'react';
import { CategoryMenu } from '@constants/category';
import { ListItemButton, ListItemText } from '@mui/material';

interface SubCategoryNavProps {
  subcategory: CategoryMenu;
}

const SubCategoryNav = ({ subcategory }: SubCategoryNavProps) => {
  return (
    <ListItemButton className="w-full">
      <ListItemText primary={`• ${subcategory.name}`} />
    </ListItemButton>
  );
};

export default SubCategoryNav;
