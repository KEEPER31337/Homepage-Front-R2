import React from 'react';
import { TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { DateTime } from 'luxon';

interface StandardDatePickerProps {
  date: DateTime | null;
  setDate: React.Dispatch<React.SetStateAction<DateTime | null>>;
  label?: string;
  hasBackground?: boolean;
}

const StandardDatePicker = ({ date, setDate, label, hasBackground }: StandardDatePickerProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <DatePicker
        label={label}
        inputFormat="yyyy.MM.dd"
        OpenPickerButtonProps={{ size: 'small', color: 'primary' }}
        value={date}
        onChange={(newValue) => {
          setDate(newValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            InputProps={{
              className: `before:!border-pointBlue pr-1 ${hasBackground ? 'bg-subGray/5 h-12' : ''}`,
              ...params.InputProps,
            }}
            sx={hasBackground ? { '.MuiFormLabel-root[data-shrink=false]': { top: 8 } } : undefined}
          />
        )}
      />
    </LocalizationProvider>
  );
};
export default StandardDatePicker;
