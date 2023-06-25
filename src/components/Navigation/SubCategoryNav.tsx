import React from 'react';
import { Link, matchPath, useLocation } from 'react-router-dom';
import { CategoryMenu } from '@constants/category';
import { ListItemButton, ListItemText } from '@mui/material';

interface SubCategoryNavProps {
  subcategory: CategoryMenu;
}

const SubCategoryNav = ({ subcategory }: SubCategoryNavProps) => {
  const currentPath = useLocation();
  const isCurrentPath = Boolean(matchPath(currentPath.pathname, `/${subcategory.path}`));

  return (
    <ListItemButton component={Link} to={`/${subcategory.path}`} className="w-full">
      <ListItemText className={isCurrentPath ? 'text-pointBlue' : ''} primary={`• ${subcategory.name}`} />
    </ListItemButton>
  );
};

export default SubCategoryNav;
