import React from 'react';
import useMainRouter from '@router/useMainRouter';
import Header from './components/layout/Header/Header';
import Sidebar from './components/layout/Sidebar/Sidebar';

const App = () => {
  const routes = useMainRouter();

  return (
    <div className="min-h-full bg-[#26262C]">
      <Header />
      <Sidebar />
      <div className="App text-base(=16pt) font-basic">{routes}</div>
    </div>
  );
};

export default App;
