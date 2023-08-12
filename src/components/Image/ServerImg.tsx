import React, { useState } from 'react';
import LogoNeon from '@assets/logo/logo_neon.svg';

interface ServerImg {
  src: string;
  alt: string;
  className?: string;
  errorClassName?: string;
}

const ServerImg = ({ src, alt, className, errorClassName }: ServerImg) => {
  const [error, setError] = useState(false);
  const srcWithServerUrl = `${process.env.REACT_APP_API_URL}/${src}`;

  const handleImgError: React.ReactEventHandler<HTMLImageElement> = (e) => {
    e.currentTarget.src = LogoNeon;
    setError(true);
  };

  return (
    <img src={srcWithServerUrl} alt={alt} onError={handleImgError} className={error ? errorClassName : className} />
  );
};

export default ServerImg;
