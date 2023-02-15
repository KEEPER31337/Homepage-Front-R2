import React from 'react';
import { useRoutes } from 'react-router-dom';
import Home from '@pages/home/Home';
import SeminarManage from '@pages/admin/SeminarManage';
import LibraryManage from '@pages/admin/LibraryManage/LibraryManage';
import MainLayout from '@components/Layout/MainLayout';
import FullContainer from '@components/Layout/Container/FullContainer';
import FitContainer from '@components/Layout/Container/FitContainer';

const useMainRouter = () =>
  useRoutes([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          element: <FullContainer />,
          children: [
            {
              index: true,
              element: <Home />,
            },
          ],
        },
        {
          element: <FitContainer />,
          children: [
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
      ],
    },
  ]);

export default useMainRouter;
