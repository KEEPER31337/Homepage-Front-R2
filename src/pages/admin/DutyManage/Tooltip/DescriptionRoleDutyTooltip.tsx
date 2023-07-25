import React from 'react';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

import muiTheme from '@constants/muiTheme';

const DescriptionRoleDutyTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 800,
    border: '2px solid',
    borderColor: muiTheme.palette.primary.main,
    backgroundColor: muiTheme.palette.secondary.main,
    '&::hover': {
      bg: muiTheme.palette.secondary.main,
    },
  },
  [`& .${tooltipClasses.arrow}`]: {
    borderColor: muiTheme.palette.primary.main,
    '&::before': {
      border: '2px solid',
      borderColor: muiTheme.palette.primary.main,
      backgroundColor: muiTheme.palette.secondary.main,
    },
  },
});

export default DescriptionRoleDutyTooltip;
