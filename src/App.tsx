import React from 'react';
import useMainRouter from '@router/useMainRouter';
import Header from './components/layout/Header/Header';
import Sidebar from './components/layout/Sidebar/Sidebar';

const App = () => {
  const routes = useMainRouter();

  return (
    <div className="min-h-full bg-[#26262C]">
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="flex w-full justify-center">
          <div className="w-full max-w-[1080px] App text-base(=16pt) font-basic">{routes}</div>
        </div>
      </div>
    </div>
  );
};

export default App;
