/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable prettier/prettier */
import React from 'react';
import { DateTime } from 'luxon';
import TextField from '@mui/material/TextField';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface DatePickerProps {
  date: DateTime | null;
  setDate: React.Dispatch<React.SetStateAction<DateTime | null>>;
  label: string;
}

const StandardDatePicker = ({ date, setDate, label }: DatePickerProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <DatePicker
        label={label}
        inputFormat="yyyy.MM.dd"
        value={date}
        onChange={(newValue) => {
          setDate(newValue);
        }}
        renderInput={(params) => <TextField id="standard-basic" label="Standard" variant="standard" {...params} />}
      />
    </LocalizationProvider>
  );
};
export default StandardDatePicker;
