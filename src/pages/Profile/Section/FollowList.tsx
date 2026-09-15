import React from 'react';
import { List, ListItemIcon, ListItem, Typography } from '@mui/material';
import { FollowInfo } from '@api/dto';
import CommonAvatar from '@components/Avatar/CommonAvatar';
import ProfileLink from '@components/Link/ProfileLink';

interface FollowListProps {
  followlist: FollowInfo[];
}

const FollowList = ({ followlist }: FollowListProps) => {
  return (
    <List className="flex flex-col !p-0">
      <ListItem className="flex flex-col" disablePadding>
        {followlist.map((followInfo) => (
          <ProfileLink
            key={followInfo.id}
            memberId={followInfo.id}
            underline={false}
            className="flex w-full items-center hover:bg-white/[0.08]"
          >
            <ListItemIcon className="items-center">
              <CommonAvatar
                className="m-1 mr-3 !h-5 !w-5 sm:!h-8 sm:!w-8"
                userId={followInfo.id}
                thumbnailPath={followInfo.thumbnailPath}
              />
              <Typography className="!text-small sm:!text-paragraph">
                {followInfo.generation}기{' '}
                <span className="group-hover/profile:underline group-focus-visible/profile:underline">
                  {followInfo.name}
                </span>
              </Typography>
            </ListItemIcon>
          </ProfileLink>
        ))}
      </ListItem>
    </List>
  );
};

export default FollowList;
