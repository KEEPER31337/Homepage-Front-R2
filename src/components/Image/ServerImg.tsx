import React, { useState } from 'react';
import LogoNeon, { ReactComponent as LogoNeonComponent } from '@assets/logo/logo_neon.svg';
import { getServerImgUrl } from '@utils/converter';

interface ServerImgProps {
  src?: string | null;
  alt: string;
  className?: string;
  errorClassName?: string;
}

const ServerImg = ({ src, alt, className, errorClassName }: ServerImgProps) => {
  const [error, setError] = useState(false);
  const srcWithServerUrl = src ? getServerImgUrl(src) : undefined;

  const handleImgError: React.ReactEventHandler<HTMLImageElement> = (e) => {
    e.currentTarget.src = LogoNeon;
    setError(true);
  };

  return src ? (
    <img src={srcWithServerUrl} alt={alt} onError={handleImgError} className={error ? errorClassName : className} />
  ) : (
    <LogoNeonComponent className={errorClassName || ''} />
  );
};

export default ServerImg;
