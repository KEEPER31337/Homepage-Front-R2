import React from 'react';
import { Autocomplete, Chip, TextField } from '@mui/material';

export interface Item {
  value: any;
  label: string;
  fixed?: boolean;
  group?: string;
}

interface AutoCompleteProps {
  items?: Array<Item>;
  value: Array<Item> | Item | null;
  onChange?: (value: Array<Item> | Item | null) => void;
  multiple?: boolean;
  placeholder?: string;
  className?: string;
}

const AutoComplete = ({
  items = [],
  value,
  onChange = (v) => console.log(v),
  multiple = false,
  placeholder = '',
  className = '',
}: AutoCompleteProps) => {
  const superOnChange = (v: Array<Item> | Item | null) => {
    if (multiple) {
      const fixed = items.filter((item) => item.fixed);
      onChange([...fixed, ...(v as Array<Item>).filter((item) => !item?.fixed)]);
    } else {
      onChange(v);
    }
  };

  return (
    <Autocomplete
      className={className}
      options={items}
      value={value}
      onChange={(e, v) => superOnChange(v)}
      multiple={multiple}
      groupBy={(option) => option.group || 'etc'}
      renderInput={(params) => <TextField {...params} variant="standard" placeholder={placeholder} />}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => (
          <Chip label={option.label} {...getTagProps({ index })} disabled={option?.fixed} />
        ))
      }
    />
  );
};

export default AutoComplete;
