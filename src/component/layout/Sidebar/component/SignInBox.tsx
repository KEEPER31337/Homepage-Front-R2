import React from 'react';
import { Link } from 'react-router-dom';

const SignInBox = () => {
  return (
    <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
      <Link
        to="signin"
        className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-mainYellow hover:bg-pointYellow"
      >
        Sign in
      </Link>
    </div>
  );
};

export default SignInBox;
