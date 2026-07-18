import React, { forwardRef } from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { DateTime } from 'luxon';

interface StandardDatePickerProps {
  value: DateTime | null;
  onChange: (value: DateTime | null) => void;
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
          format="yyyy.MM.dd"
          enableAccessibleFieldDOMStructure={false}
          value={value}
          onChange={onChange}
          slotProps={{
            openPickerButton: { size: 'small', color: 'primary' },
            textField: {
              variant: 'standard',
              InputProps: {
                className: `${error ? '' : 'before:!border-pointBlue pr-1'} ${
                  hasBackground ? 'bg-subGray/5 h-12' : ''
                }`,
              },
              error,
              helperText,
              sx: hasBackground ? { '.MuiFormLabel-root[data-shrink=false]': { top: 8 } } : undefined,
            },
          }}
        />
      </LocalizationProvider>
    );
  },
);
export default StandardDatePicker;
