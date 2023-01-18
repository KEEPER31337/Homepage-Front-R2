import React from 'react';
import useMainRouter from './router/useMainRouter';

const App = () => {
  const routes = useMainRouter();

  return <div className="App">{routes}</div>;
};

export default App;
