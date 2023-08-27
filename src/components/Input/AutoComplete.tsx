import React from 'react';
import { Autocomplete, Chip, TextField } from '@mui/material';

export interface Item {
  value: unknown;
  label: string;
  fixed?: boolean;
  group?: string;
}

export type AutoCompleteValueType = Array<Item> | Item | null;

interface AutoCompleteProps {
  items?: Array<Item>;
  value: Array<Item> | Item | null;
  onChange?: (value: Array<Item> | Item | null) => void;
  multiple?: boolean;
  grouped?: boolean;
  placeholder?: string;
  className?: string;
}

const AutoComplete = ({
  items = [],
  value,
  onChange = () => {
    return null;
  },
  multiple = false,
  grouped = false,
  placeholder = '',
  className = '',
}: AutoCompleteProps) => {
  const superOnChange = (v: Array<Item> | Item | null) => {
    if (multiple) {
      const fixed = items.filter((item) => item.fixed);
      const nonFixed = (v as Array<Item>).filter((item) => !item?.fixed);
      onChange([...fixed, ...nonFixed]);
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
      groupBy={(option) => (grouped ? option.group || 'etc' : '')}
      renderInput={(params) => <TextField {...params} variant="standard" placeholder={placeholder} />}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => (
          <Chip label={option.label} {...getTagProps({ index })} disabled={option?.fixed} className="!-z-10" />
        ))
      }
    />
  );
};

export default AutoComplete;
