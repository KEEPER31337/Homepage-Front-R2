import React from 'react';
import { NavLink } from 'react-router-dom';
import { CategoryMenu } from '@constants/category';
import { ListItemButton, Typography } from '@mui/material';
import useCheckAuth from '@hooks/useCheckAuth';

interface SubCategoryNavProps {
  viaPath?: string;
  subcategory: CategoryMenu;
}

const SubCategoryNav = ({ viaPath, subcategory }: SubCategoryNavProps) => {
  const categoryPath = viaPath ? `/${viaPath}/${subcategory.path}` : `/${subcategory.path}`;
  const { checkIncludeOneOfAuths } = useCheckAuth();
  const isAuthenticated = !subcategory.roles || checkIncludeOneOfAuths(subcategory.roles);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      {categoryPath.split('/').includes('admin') && (
        <Typography marginLeft={2} variant="small" className="text-gray-400">
          {subcategory.roles?.at(-1)}
        </Typography>
      )}
      <NavLink
        to={categoryPath}
        className={({ isActive }) => (isActive ? 'whitespace-pre text-pointBlue' : 'whitespace-pre')}
      >
        <ListItemButton>{`•\t${subcategory.name}`}</ListItemButton>
      </NavLink>
    </>
  );
};

export default SubCategoryNav;
