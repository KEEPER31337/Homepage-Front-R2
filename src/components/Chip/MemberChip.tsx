import React from 'react';
import { Chip, ChipProps } from '@mui/material';
import { KEEPER_COLOR } from '@constants/keeperTheme';

const MemberChip = (chipProps: ChipProps) => {
  return (
    <Chip
      sx={{ bgcolor: `${KEEPER_COLOR.pointBlue}30`, color: 'white', fontWeight: 500 }}
      size="small"
      {...chipProps}
    />
  );
};

export default MemberChip;
