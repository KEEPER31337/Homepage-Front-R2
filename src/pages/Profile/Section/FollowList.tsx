import React from 'react';
import { useNavigate } from 'react-router-dom';
import { List, ListItemIcon, ListItem, ListItemButton, Typography } from '@mui/material';
import { FollowInfo } from '@api/dto';
import CommonAvatar from '@components/Avatar/CommonAvatar';

interface FollowListProps {
  followlist: FollowInfo[];
}

const FollowList = ({ followlist }: FollowListProps) => {
  const navigate = useNavigate();

  return (
    <List className="flex flex-col !p-0">
      <ListItem className="flex flex-col" disablePadding>
        {followlist.map((followInfo) => (
          <ListItemButton
            key={followInfo.id}
            className="w-full !p-0"
            onClick={() => {
              navigate(`/profile/${followInfo.id}`);
            }}
          >
            <ListItemIcon className="items-center">
              <CommonAvatar
                className="m-1 mr-3 !h-5 !w-5 sm:!h-8 sm:!w-8"
                userId={followInfo.id}
                thumbnailPath={followInfo.thumbnailPath}
              />
              <Typography className="!text-small sm:!text-paragraph">
                {followInfo.generation}기 {followInfo.name}
              </Typography>
            </ListItemIcon>
          </ListItemButton>
        ))}
      </ListItem>
    </List>
  );
};

export default FollowList;
