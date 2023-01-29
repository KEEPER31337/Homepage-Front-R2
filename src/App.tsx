import React from 'react';
import useMainRouter from './router/useMainRouter';
import Header from './component/layout/Header/Header';
import Sidebar from './component/layout/Sidebar/Sidebar';

const App = () => {
  const routes = useMainRouter();

  return (
    <div className="min-h-full bg-[#26262C]">
      <Header />
      <Sidebar depth={0} />
      <div className="App">{routes}</div>
    </div>
  );
};

export default App;
