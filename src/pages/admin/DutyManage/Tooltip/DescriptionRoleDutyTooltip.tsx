import React from 'react';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

import muiTheme from '@constants/muiTheme';

const DiscriptionRoleDutyTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 800,
    border: '2px solid',
    borderColor: muiTheme.palette.primary.main,
    backgroundColor: muiTheme.palette.info.light,
  },
  [`& .${tooltipClasses.arrow}`]: {
    borderColor: muiTheme.palette.primary.main,
    '&::before': {
      border: '2px solid',
      borderColor: muiTheme.palette.primary.main,
      backgroundColor: muiTheme.palette.info.light,
    },
  },
  /* 기존의 ui 였던 작대기 동그라미 봉을 구현하려던 코드  */
  // [`& .${tooltipClasses.arrow}`]: {
  //   overflow: 'visible',
  //   height: '23px',
  //   width: '0px',
  //   border: '1px solid',
  //   top: '-15px !important',
  //   borderColor: muiTheme.palette.primary.main,
  //   // backgroundColor: muiTheme.palette.info.light,
  //   '&::before': {
  //     height: '8px',
  //     width: '8px',
  //     border: '1px solid',
  //     marginTop: '-10px !important',
  //     marginLeft: '-5.5px !important',
  //     borderRadius: '50%',
  //     borderColor: muiTheme.palette.primary.main,
  //     backgroundColor: muiTheme.palette.primary.main,
  //   },
  // },
});

export default DiscriptionRoleDutyTooltip;
