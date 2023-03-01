import React, { useState } from 'react';
import { Collapse, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Category, CategoryMenu } from '@constants/category';
import SubCategoryNav from './SubCategoryNav';

interface CategoryNavProps {
  category: Category;
}

const CategoryNav = ({ category }: CategoryNavProps) => {
  const [open, setOpen] = useState(false);

  return (
    <ListItem className="flex flex-col" disablePadding>
      <ListItemButton
        className="w-full"
        onClick={() => {
          setOpen((prev) => !prev);
        }}
      >
        <ListItemText primary={category.name} />
      </ListItemButton>
      <Collapse className="w-full" in={open} timeout="auto">
        {category.subCategories.map((subcategory: CategoryMenu) => (
          <SubCategoryNav key={subcategory.id} subcategory={subcategory} />
        ))}
      </Collapse>
    </ListItem>
  );
};

export default CategoryNav;
