import React from 'react';
import { Typography } from '@mui/material';
import { formatGeneration } from '@utils/converter';
import CommonAvatar from '@components/Avatar/CommonAvatar';
import ProfileLink from '@components/Link/ProfileLink';

interface TopCardItem {
  memberId: number;
  thumbnailPath: string | null;
  realName: string;
  generation: string;
}

interface TopCardProps<T extends TopCardItem> {
  item: T;
  message: string;
  index: number;
}

const TopCard = <T extends TopCardItem>({ item, message, index }: TopCardProps<T>) => {
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
                <ProfileLink memberId={item.memberId}>{item.realName}</ProfileLink>
              </Typography>
              <Typography variant="small" marginY="auto" marginLeft={1}>
                {formatGeneration(item.generation as string)}기
              </Typography>
            </div>
            <Typography color="primary" fontWeight="semibold">
              {message}
            </Typography>
          </div>
          <ProfileLink
            memberId={item.memberId}
            underline={false}
            aria-label={`${item.realName} 프로필`}
            className="my-auto shrink-0"
          >
            <CommonAvatar className="!h-16 !w-16" userId={item.memberId} thumbnailPath={item.thumbnailPath} />
          </ProfileLink>
        </div>
      </div>
      <div className="relative left-2 top-2 h-28 w-80 border-2 border-pointBlue" />
    </div>
  );
};

export default TopCard;
