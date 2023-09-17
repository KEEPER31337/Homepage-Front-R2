import React from 'react';
import { useNavigate } from 'react-router-dom';
import { List, ListItemIcon, ListItem, ListItemButton, ListItemText, Avatar } from '@mui/material';
import { FollowInfo } from '@api/dto';

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
            <ListItemIcon>
              <Avatar
                className="m-1 !h-8 !w-8 !bg-subBlack !text-white"
                alt="profile thumbnail"
                src={followInfo?.thumbnailPath || ''}
              />
            </ListItemIcon>
            <ListItemText primary={`${followInfo.generation.replace('.0', '')}기 ${followInfo.name}`} />
          </ListItemButton>
        ))}
      </ListItem>
    </List>
  );
};

export default FollowList;
