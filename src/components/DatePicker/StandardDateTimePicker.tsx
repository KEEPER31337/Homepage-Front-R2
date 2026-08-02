import React, { forwardRef } from 'react';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { DateTime } from 'luxon';

interface StandardDateTimePickerProps {
  value: DateTime | null;
  onChange: (value: DateTime | null) => void;
  label?: React.ReactNode;
  minDateTime?: DateTime;
  hasBackground?: boolean;
  error?: boolean;
  helperText?: string;
  className?: string;
}

const StandardDateTimePicker = forwardRef(
  (
    {
      value,
      onChange,
      label,
      minDateTime,
      hasBackground = false,
      error,
      helperText,
      className,
    }: StandardDateTimePickerProps,
    ref?: React.ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <DateTimePicker
          ref={ref}
          className={className}
          label={label}
          format="yyyy.MM.dd HH:mm"
          ampm={false}
          enableAccessibleFieldDOMStructure={false}
          value={value}
          minDateTime={minDateTime}
          onChange={onChange}
          slotProps={{
            openPickerButton: { size: 'small', color: 'primary' },
            textField: {
              fullWidth: true,
              variant: 'standard',
              InputProps: {
                className: `${error ? '' : 'before:!border-pointBlue pr-1'} ${
                  hasBackground ? 'h-12 bg-subGray/5' : ''
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

export default StandardDateTimePicker;
