import React, { useState } from 'react';
import { Collapse, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Category } from '@constants/category';
import SubCategoryNav from './SubCategoryNav';

interface CategoryNavProps {
  category: Category;
}

const CategoryNav = ({ category }: CategoryNavProps) => {
  const [open, setOpen] = useState(false);

  return (
    <ListItem className="flex flex-col" disablePadding>
      <ListItemButton
        selected={open}
        className="w-full"
        onClick={() => {
          setOpen((prev) => !prev);
        }}
      >
        <ListItemText primary={category.name} />
      </ListItemButton>
      <Collapse className="w-full" in={open} timeout="auto">
        {category.subCategories.map((subcategory) => (
          <SubCategoryNav key={subcategory.id} viaPath={category.path} subcategory={subcategory} />
        ))}
      </Collapse>
    </ListItem>
  );
};

export default CategoryNav;
