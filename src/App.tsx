import React from 'react';
import useMainRouter from '@router/useMainRouter';
import SeminarManage from '@pages/admin/SeminarManage';

const App = () => {
  const routes = useMainRouter();

  return (
    <div className="App">
      {routes}
      <SeminarManage />
    </div>
  );
};

export default App;
