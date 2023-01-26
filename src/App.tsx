import React from 'react';
import useMainRouter from './router/useMainRouter';
import Header from './pages/shared/Header';
import Sidebar from './pages/shared/Sidebar';

const App = () => {
  const routes = useMainRouter();

  return (
    <div className="min-h-full bg-[#26262C]">
      <Header />
      <Sidebar />
      <div className="App">{routes}</div>
    </div>
  );
};

export default App;
