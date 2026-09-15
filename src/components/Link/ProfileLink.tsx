import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { ANONYMOUS_OR_VIRTUAL_USER_ID } from '@constants/member';

interface ProfileLinkProps extends Omit<LinkProps, 'to'> {
  memberId: number | null | undefined;
  underline?: boolean;
}

const ProfileLink = ({
  memberId,
  children,
  className = '',
  underline = true,
  onClick,
  ...linkProps
}: ProfileLinkProps) => {
  const canIdentifyMember = memberId != null && memberId !== ANONYMOUS_OR_VIRTUAL_USER_ID;

  if (!canIdentifyMember) {
    return <span className={className}>{children}</span>;
  }

  return (
    <Link
      {...linkProps}
      to={`/profile/${memberId}`}
      className={`group/profile cursor-pointer rounded-sm text-inherit no-underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pointBlue ${
        underline ? 'hover:underline focus-visible:underline' : ''
      } ${className}`}
      onClick={(event) => {
        event.stopPropagation();
        onClick?.(event);
      }}
    >
      {children}
    </Link>
  );
};

export default ProfileLink;
