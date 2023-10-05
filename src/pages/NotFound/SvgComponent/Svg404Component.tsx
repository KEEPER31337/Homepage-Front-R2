import React from 'react';

interface Svg404Component {
  point: { top: number; left: number };
  handleKeyClick: () => void;
}

/* NOTE src/assets/notFound/404.svg에서 추가적인 이벤트 처리한 컴포넌트 */
const Svg404Component = ({ point, handleKeyClick }: Svg404Component) => {
  return (
    <svg
      width="344"
      height="145"
      viewBox="0 0 344 145"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect
        className="animate-pulse hover:brightness-150"
        onClick={handleKeyClick}
        x="178.791"
        y="64"
        width="10.974"
        height="10.7936"
        transform="rotate(88.8057 178.791 64)"
        fill="url(#pattern0)"
      />
      <path d="M120.084 5.53835L160.676 13.2559L131.086 45.3661L120.084 5.53835Z" fill="#4CEEF9" />
      <path d="M198.084 10.5383L238.676 18.2559L209.086 50.3661L198.084 10.5383Z" fill="#4CEEF9" />
      <circle cx="160" cy="43" r="5" fill="#4CEEF9" />
      <ellipse
        cx={point.left > window.innerWidth * (3 / 4) ? 157 + point.left / (window.innerWidth / 4) : 159}
        cy={41 + point.top / (window.innerHeight / 4)}
        rx="3.5"
        ry="4"
        fill="#131316"
      />
      <circle cx="186" cy="43" r="5" fill="#4CEEF9" />
      <ellipse
        cx={point.left > window.innerWidth * (3 / 4) ? 183 + point.left / (window.innerWidth / 4) : 185}
        cy={41 + point.top / (window.innerHeight / 4)}
        rx="3.5"
        ry="4"
        fill="#131316"
      />
      <line x1="147.062" y1="49.5039" x2="155.062" y2="50.5039" stroke="#4CEEF9" />
      <line x1="147.929" y1="53.505" x2="154.929" y2="52.505" stroke="#4CEEF9" />
      <line
        y1="-0.5"
        x2="8.13398"
        y2="-0.5"
        transform="matrix(-0.97294 0.231058 0.235185 0.971951 198.914 49)"
        stroke="#4CEEF9"
      />
      <line
        y1="-0.5"
        x2="7.1375"
        y2="-0.5"
        transform="matrix(-0.999529 -0.0306805 -0.0312597 0.999511 198.358 53.0859)"
        stroke="#4CEEF9"
      />
      <line x1="149.135" y1="64.0092" x2="171.135" y2="67.0092" stroke="#4CEEF9" strokeWidth="2" />
      <line x1="175.852" y1="67.0111" x2="195.852" y2="64.0111" stroke="#4CEEF9" strokeWidth="2" />
      <ellipse cx="173" cy="48" rx="2" ry="1" fill="#4CEEF9" />
      <path
        d="M67.6172 142V114.6H0.217188V99.8L58.6172 2.4H83.6172V100.6H103.817V114.6H83.6172V142H67.6172ZM16.0172 100.6H67.6172V15.4H66.6172L16.0172 100.6ZM172.539 144.4C155.872 144.4 143.672 138.067 135.939 125.4C128.339 112.733 124.539 95 124.539 72.2C124.539 49.4 128.339 31.6667 135.939 19C143.672 6.33333 155.872 -7.62939e-06 172.539 -7.62939e-06C189.206 -7.62939e-06 201.339 6.33333 208.939 19C216.672 31.6667 220.539 49.4 220.539 72.2C220.539 95 216.672 112.733 208.939 125.4C201.339 138.067 189.206 144.4 172.539 144.4ZM172.539 129.8C178.006 129.8 182.672 128.667 186.539 126.4C190.406 124.133 193.539 120.933 195.939 116.8C198.339 112.667 200.072 107.8 201.139 102.2C202.339 96.6 202.939 90.4 202.939 83.6V60.8C202.939 54 202.339 47.8 201.139 42.2C200.072 36.6 198.339 31.7333 195.939 27.6C193.539 23.4667 190.406 20.2667 186.539 18C182.672 15.7333 178.006 14.6 172.539 14.6C167.072 14.6 162.406 15.7333 158.539 18C154.672 20.2667 151.539 23.4667 149.139 27.6C146.739 31.7333 144.939 36.6 143.739 42.2C142.672 47.8 142.139 54 142.139 60.8V83.6C142.139 90.4 142.672 96.6 143.739 102.2C144.939 107.8 146.739 112.667 149.139 116.8C151.539 120.933 154.672 124.133 158.539 126.4C162.406 128.667 167.072 129.8 172.539 129.8ZM307.461 142V114.6H240.061V99.8L298.461 2.4H323.461V100.6H343.661V114.6H323.461V142H307.461ZM255.861 100.6H307.461V15.4H306.461L255.861 100.6Z"
        fill="#4CEEF9"
      />
      <defs>
        <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use xlinkHref="#image0_299_382" transform="matrix(0.00322581 0 0 0.00327975 0 -0.00836059)" />
        </pattern>
        <image id="image0_299_382" width="310" height="310" xlinkHref="/favicon/favicon-96x96.png" />
      </defs>
    </svg>
  );
};

export default Svg404Component;
