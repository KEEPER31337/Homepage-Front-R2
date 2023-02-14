import React from 'react';
import useMainRouter from '@router/useMainRouter';
import Header from './components/Layout/Header/Header';
import Sidebar from './components/Layout/Sidebar/Sidebar';

const App = () => {
  const routes = useMainRouter();

  return <div className="bg-subBlack">{routes}</div>;
};

export default App;
