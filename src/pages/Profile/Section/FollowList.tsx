import React from 'react';
import { useNavigate } from 'react-router-dom';
import { List, ListItemIcon, ListItem, ListItemButton, Avatar, Typography } from '@mui/material';
import { FollowInfo } from '@api/dto';
import { getServerImgUrl } from '@utils/converter';

interface FollowListProps {
  followlist: FollowInfo[];
}

const FollowList = ({ followlist }: FollowListProps) => {
  const navigate = useNavigate();

  return (
    <List className="flex h-[60px] flex-col !overflow-auto !bg-pointBlue/10 !p-0 sm:h-[120px]">
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
              <Avatar
                className="m-1 !h-5 !w-5 !bg-subBlack !text-white sm:!h-8 sm:!w-8"
                src={followInfo?.thumbnailPath ? getServerImgUrl(followInfo?.thumbnailPath) : ''}
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
