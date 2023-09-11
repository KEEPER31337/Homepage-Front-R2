import React, { forwardRef } from 'react';
import { TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { DateTime } from 'luxon';

interface StandardDatePickerProps {
  value: DateTime | null;
  onChange: (value: DateTime | null, keyboardInputValue?: string | undefined) => void;
  label?: React.ReactNode;
  hasBackground?: boolean;
  error?: boolean;
  helperText?: string;
}

const StandardDatePicker = forwardRef(
  (
    { value, onChange, label, hasBackground, error, helperText }: StandardDatePickerProps,
    ref?: React.ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <DatePicker
          ref={ref}
          label={label}
          inputFormat="yyyy.MM.dd"
          OpenPickerButtonProps={{ size: 'small', color: 'primary' }}
          value={value}
          onChange={onChange}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              InputProps={
                error
                  ? undefined
                  : {
                      className: `before:!border-pointBlue pr-1 ${hasBackground ? 'bg-subGray/5 h-12' : ''}`,
                      ...params.InputProps,
                    }
              }
              error={error}
              helperText={helperText}
              sx={hasBackground ? { '.MuiFormLabel-root[data-shrink=false]': { top: 8 } } : undefined}
            />
          )}
        />
      </LocalizationProvider>
    );
  },
);
export default StandardDatePicker;
