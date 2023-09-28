import React, { useEffect } from 'react';
import { Autocomplete, Chip, TextField } from '@mui/material';

interface AutoCompleteItem {
  value: unknown;
  label: string;
  fixed?: boolean;
  group?: string;
}

export type SingleAutoCompleteValue = AutoCompleteItem | null;
export type MultiAutoCompleteValue = Array<AutoCompleteItem>;

type MultiOnChangeFuncType = (value: MultiAutoCompleteValue) => void;
type SingleOnChangeFuncType = (value: SingleAutoCompleteValue) => void;

interface AutoCompleteProps<Multiple> {
  items?: Array<AutoCompleteItem>;
  value: Multiple extends true ? MultiAutoCompleteValue : SingleAutoCompleteValue;
  multiple?: Multiple;
  onChange?: Multiple extends true ? MultiOnChangeFuncType : SingleOnChangeFuncType;
  grouped?: boolean;
  placeholder?: string;
  className?: string;
}

const AutoComplete = <Multiple extends boolean | undefined = false>({
  items = [],
  value,
  onChange = () => {
    return null;
  },
  multiple = false,
  grouped = false,
  placeholder = '',
  className = '',
}: AutoCompleteProps<Multiple>) => {
  const singleSuperOnChange = (v: SingleAutoCompleteValue) => (onChange as SingleOnChangeFuncType)(v);
  const multiSuperOnChange = (v: MultiAutoCompleteValue) => {
    const fixed = items.filter((item) => item.fixed);
    const nonFixed = v.filter((item) => !item?.fixed);
    (onChange as MultiOnChangeFuncType)([...fixed, ...nonFixed]);
  };

  return (
    <Autocomplete
      className={className}
      options={items}
      value={value}
      onChange={(e, v) =>
        multiple ? multiSuperOnChange(v as MultiAutoCompleteValue) : singleSuperOnChange(v as SingleAutoCompleteValue)
      }
      isOptionEqualToValue={(option, v) => option.value === v.value}
      multiple={multiple}
      groupBy={(option) => (grouped ? option.group || 'etc' : '')}
      renderInput={(params) => <TextField {...params} variant="standard" placeholder={placeholder} />}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => (
          <Chip
            label={option.label}
            {...getTagProps({ index })}
            disabled={option?.fixed}
            className="!flex !h-[22px] !w-fit !items-center !rounded-[4px] !bg-pointBlue !bg-opacity-30 !px-1 !py-[2px] !text-[12px] font-semibold"
          />
        ))
      }
      renderOption={(props, option) => (
        <li key={`${option.label}_${option.value}`} {...props}>
          {option.label}
          {option?.fixed && <span className="text-xs text-gray-400"> (기본값)</span>}
        </li>
      )}
    />
  );
};

export default AutoComplete;
