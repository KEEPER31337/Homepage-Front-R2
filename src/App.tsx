import React from 'react';
import useMainRouter from './router/useMainRouter';
import Header from './pages/shared/Header';

const App = () => {
  const routes = useMainRouter();

  return (
    <>
      <Header />
      <div className="App">{routes}</div>
    </>
  );
};

export default App;
