import React from 'react';
import { NavLink } from 'react-router-dom';
import { CategoryMenu } from '@constants/category';
import { ListItemButton } from '@mui/material';

interface SubCategoryNavProps {
  viaPath?: string;
  subcategory: CategoryMenu;
}

const SubCategoryNav = ({ viaPath, subcategory }: SubCategoryNavProps) => {
  const categoryPath = viaPath ? `/${viaPath}/${subcategory.path}` : `/${subcategory.path}`;

  return (
    <NavLink
      to={categoryPath}
      className={({ isActive }) => (isActive ? 'whitespace-pre text-pointBlue' : 'whitespace-pre')}
    >
      <ListItemButton>{`•\t${subcategory.name}`}</ListItemButton>
    </NavLink>
  );
};

export default SubCategoryNav;
