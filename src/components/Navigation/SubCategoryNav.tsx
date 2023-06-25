import React from 'react';
import { Link } from 'react-router-dom';
import { CategoryMenu } from '@constants/category';
import { ListItemButton, ListItemText } from '@mui/material';

interface SubCategoryNavProps {
  subcategory: CategoryMenu;
}

const SubCategoryNav = ({ subcategory }: SubCategoryNavProps) => {
  return (
    <ListItemButton component={Link} to={`/${subcategory.path}`} className="w-full">
      <ListItemText primary={`• ${subcategory.name}`} />
    </ListItemButton>
  );
};

export default SubCategoryNav;
