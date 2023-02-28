import React from 'react';
import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Category } from '@constants/category';

interface CategoryNavProps {
  category: Category;
}

const CategoryNav = ({ category }: CategoryNavProps) => {
  return (
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemText primary={category.name} />
      </ListItemButton>
    </ListItem>
  );
};

export default CategoryNav;
