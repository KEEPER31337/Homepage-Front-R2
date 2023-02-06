import React from 'react';
import { useRoutes } from 'react-router-dom';
import Home from '@pages/home/Home';
import SeminarManage from '@pages/admin/SeminarManage';
import LibraryManage from '@pages/admin/LibraryManage/LibraryManage';

const useMainRouter = () =>
  useRoutes([
    {
      path: '/',
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: 'admin',
          children: [
            {
              path: 'seminarManage',
              element: <SeminarManage />,
            },
            {
              path: 'libraryManage',
              element: <LibraryManage />,
            },
          ],
        },
      ],
    },
  ]);

export default useMainRouter;
