import React from 'react';
import { useRoutes } from 'react-router-dom';
import Game from '@pages/Game/Game';
import Library from '@pages/Library/Library';
import Profile from '@pages/Profile/Profile';
import SignUp from '@pages/SignUp/SignUp';
import Study from '@pages/Study/Study';
import ActiveMemberManage from '@pages/admin/ActiveMemberManage/ActiveMemberManage';
import DutyManage from '@pages/admin/DutyManage/DutyManage';
import LibraryManage from '@pages/admin/LibraryManage/LibraryManage';
import MeritManage from '@pages/admin/MeritManage/MeritManage';
import SeminarManage from '@pages/admin/SeminarManage/SeminarManage';
import BoardList from '@pages/board/BoardList/BoardList';
import BoardView from '@pages/board/BoardView/BoardView';
import BoardWrite from '@pages/board/BoardWrite/BoardWrite';
import Home from '@pages/home/Home';
import Login from '@pages/login/Login';
import SearchAccount from '@pages/login/SearchAccount';
import Rank from '@pages/rank/Rank';
import SeminarAttend from '@pages/senimarAttend/SenimarAttend';
import FitContainer from '@components/Layout/Container/FitContainer';
import FullContainer from '@components/Layout/Container/FullContainer';
import MainLayout from '@components/Layout/MainLayout';

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
            {
              path: 'searchAccount',
              element: <SearchAccount />,
            },
            {
              path: 'profile/:memberId/*',
              element: <Profile />,
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
                  element: <DutyManage />,
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
                  element: <ActiveMemberManage />,
                },
                {
                  path: 'meritManage',
                  element: <MeritManage />,
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
                  path: 'write/:categoryName',
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
              element: <Rank />,
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
