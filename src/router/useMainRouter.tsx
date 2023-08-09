import React from 'react';
import { useRoutes } from 'react-router-dom';
import Home from '@pages/home/Home';
import SeminarManage from '@pages/admin/SeminarManage';
import Study from '@pages/Study/Study';
import SeminarAttend from '@pages/senimarAttend/SenimarAttend';
import LibraryManage from '@pages/admin/LibraryManage/LibraryManage';

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
                  path: 'dutyManage',
                  element: <div />,
                },
                {
                  path: 'electionManage',
                  element: <div />,
                },
                {
                  path: 'libraryManage',
                  element: <LibraryManage />,
                },
                {
                  path: 'seminarManage',
                  element: <SeminarManage />,
                },
                {
                  path: 'activeMemberManage',
                  element: <div />,
                },
                {
                  path: 'rewordPenaltyManage',
                  element: <div />,
                },
              ],
            },
            {
              path: 'board',
              children: [
                {
                  path: ':categoryName',
                  element: <BoardList />,
                },
                {
                  path: 'write',
                  element: <BoardWrite />,
                },
                {
                  path: 'view/:postId',
                  element: <BoardView />,
                },
              ],
            },
            {
              path: 'study',
              element: <Study />,
            },
            {
              path: 'library',
              element: <Library />,
            },
            {
              path: 'seminar',
              element: <SeminarAttend />,
            },
            {
              path: 'election',
              element: <div />,
            },
            {
              path: 'rank',
              element: <div />,
            },
            {
              path: 'game',
              element: <Game />,
            },
            {
              path: 'ctf',
              children: [
                {
                  path: 'select',
                  element: <div />,
                },
                {
                  path: 'challenge',
                  element: <div />,
                },
                {
                  path: 'scoreboard',
                  element: <div />,
                },
                {
                  path: 'team',
                  element: <div />,
                },
                {
                  path: 'admin',
                  children: [
                    { path: 'challengeManage', element: <div /> },
                    { path: 'submissions', element: <div /> },
                    { path: 'operation', element: <div /> },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ]);

export default useMainRouter;
