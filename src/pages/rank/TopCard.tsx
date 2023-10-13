import React from 'react';
import { Typography } from '@mui/material';
import { formatGeneration } from '@utils/converter';
import ServerAvatar from '@components/Avatar/ServerAvatar';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface TopCardProps<T extends Record<string, any>> {
  item: T;
  message: string;
  index: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TopCard = <T extends Record<string, any>>({ item, message, index }: TopCardProps<T>) => {
  return (
    <div className="relative flex h-36 place-content-center">
      <div className="absolute z-10 h-28 w-80">
        <div className="flex h-full justify-between bg-mainBlack p-4">
          <div className="flex h-full flex-col justify-between">
            <div className="flex">
              <Typography border={1} borderColor="primary" color="primary" paddingX={1.5} paddingY={0.5}>
                {index + 1}
              </Typography>
              <Typography variant="h3" fontWeight="semibold" marginY="auto" marginLeft={1}>
                {item.realName}
              </Typography>
              <Typography variant="small" marginY="auto" marginLeft={1}>
                {formatGeneration(item.generation as string)}기
              </Typography>
            </div>
            <Typography color="primary" fontWeight="semibold">
              {message}
            </Typography>
          </div>
          <ServerAvatar className="my-auto !h-16 !w-16" thumbnailPath={item.thumbnailPath} />
        </div>
      </div>
      <div className="relative left-2 top-2 h-28 w-80 border-2 border-pointBlue" />
    </div>
  );
};

export default TopCard;
