import React from 'react';
import useMainRouter from '@router/useMainRouter';

const App = () => {
  const routes = useMainRouter();

  return <div className="bg-subBlack">{routes}</div>;
};

export default App;
