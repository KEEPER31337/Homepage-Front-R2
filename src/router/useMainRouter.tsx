import React from 'react';
import { useRoutes } from 'react-router-dom';
import Home from '@pages/home/Home';
import SeminarManage from '@pages/admin/SeminarManage';
import About from '@pages/about/About';

const useMainRouter = () =>
  useRoutes([
    {
      path: '/',
      children: [
        {
          index: true,
          element: <About />,
        },
        {
          path: 'admin',
          children: [
            {
              path: 'seminarManage',
              element: <SeminarManage />,
            },
          ],
        },
      ],
    },
  ]);

export default useMainRouter;
