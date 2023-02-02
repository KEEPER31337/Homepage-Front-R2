import React from 'react';
import { useRoutes } from 'react-router-dom';
import Home from '@pages/home/Home';
import SeminarManage from '@pages/admin/SeminarManage';
import MainLayout from '@components/Layout/MainLayout';
import FullContainer from '@components/Layout/Container/FullContainer';
import FitContainer from '@components/Layout/Container/FitContainer';
import SeminarAttend from '@pages/senimarAttend/SenimarAttend';

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
              ],
            },
            {
              path: 'seminarAttend',
              element: <SeminarAttend />,
            },
          ],
        },
      ],
    },
  ]);

export default useMainRouter;
