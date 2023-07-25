import React from 'react';
import { useRoutes } from 'react-router-dom';
import Home from '@pages/home/Home';
import SeminarManage from '@pages/admin/SeminarManage';
import Study from '@pages/Study/Study';
import SeminarAttend from '@pages/senimarAttend/SenimarAttend';
import LibraryManage from '@pages/admin/LibraryManage/LibraryManage';
import DutyManage from '@pages/admin/DutyManage/DutyManage';

import MainLayout from '@components/Layout/MainLayout';
import FullContainer from '@components/Layout/Container/FullContainer';
import FitContainer from '@components/Layout/Container/FitContainer';
import BoardList from '@pages/board/BoardList';
import SignUp from '@pages/SignUp/SignUp';
import Login from '@pages/login/Login';
import Game from '@pages/Game/Game';
import Library from '@pages/Library/Library';
import BoardWrite from '@pages/BoardWrite/BoardWrite';
import BoardView from '@pages/board/BoardView/BoardView';

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
            {
              path: 'signUp',
              element: <SignUp />,
            },
            {
              path: 'login',
              element: <Login />,
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
                {
                  path: 'DutyManage',
                  element: <DutyManage />,
                },
              ],
            },
            {
              path: 'board',
              children: [
                {
                  path: 'list',
                  element: <BoardList />,
                },
                {
                  path: 'write',
                  element: <BoardWrite />,
                },
                {
                  path: 'view',
                  element: <BoardView />,
                },
              ],
            },
            {
              path: 'study',
              element: <Study />,
            },
            {
              path: 'game',
              element: <Game />,
            },
            {
              path: 'library',
              element: <Library />,
            },
          ],
        },
        {
          element: <FitContainer />,
          children: [
            {
              path: 'seminar',
              element: <SeminarAttend />,
            },
          ],
        },
      ],
    },
  ]);

export default useMainRouter;
