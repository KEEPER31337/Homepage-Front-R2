import React from 'react';
import { useRoutes } from 'react-router-dom';
import Home from '../pages/home/Home';
import SeminarManage from '../pages/admin/SeminarManage';

const useMainRouter = () =>
  useRoutes([
    {
      path: '/',
      children: [
        {
          index: true,
          element: <Home />,
        },
      ],
    },
  ]);

export default useMainRouter;
