/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { DateTime } from 'luxon';

interface StandardDatePickerProps {
  date: DateTime | null;
  setDate: React.Dispatch<React.SetStateAction<DateTime | null>>;
  label?: string;
}

const StandardDatePicker = ({ date, setDate, label }: StandardDatePickerProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <DatePicker
        label={label}
        inputFormat="yyyy.MM.dd"
        value={date}
        onChange={(newValue) => {
          setDate(newValue);
        }}
        renderInput={(params) => <TextField variant="standard" {...params} />}
      />
    </LocalizationProvider>
  );
};
export default StandardDatePicker;
