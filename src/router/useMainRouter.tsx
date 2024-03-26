import React from 'react';
import { useRoutes } from 'react-router-dom';
import Game from '@pages/Game/Game';
import Library from '@pages/Library/Library';
import NotFound from '@pages/NotFound/NotFound';
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
import NeedAuth from '@components/NeedAuth/NeedAuth';
import NeedLogin from '@components/NeedAuth/NeedLogin';

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
              path: '*',
              element: <NotFound from="Page" />,
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
              element: (
                <NeedLogin>
                  <Profile />
                </NeedLogin>
              ),
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
                  element: (
                    <NeedAuth>
                      <DutyManage />
                    </NeedAuth>
                  ),
                },
                /* {
                  path: 'electionManage',
                  element: <div />,
                }, */
                {
                  path: 'libraryManage/*',
                  element: (
                    <NeedAuth roles={['ROLE_사서']}>
                      <LibraryManage />
                    </NeedAuth>
                  ),
                },
                {
                  path: 'seminarManage',
                  element: (
                    <NeedAuth roles={['ROLE_서기']}>
                      <SeminarManage />
                    </NeedAuth>
                  ),
                },
                {
                  path: 'activeMemberManage',
                  element: (
                    <NeedAuth roles={['ROLE_서기']}>
                      <ActiveMemberManage />
                    </NeedAuth>
                  ),
                },
                {
                  path: 'meritManage',
                  element: (
                    <NeedAuth roles={['ROLE_서기']}>
                      <MeritManage />
                    </NeedAuth>
                  ),
                },
              ],
            },
            {
              path: 'board',
              children: [
                {
                  path: ':categoryName',
                  element: (
                    <NeedLogin>
                      <BoardList />
                    </NeedLogin>
                  ),
                },
                {
                  path: 'write/:categoryName',
                  element: (
                    <NeedLogin>
                      <BoardWrite />
                    </NeedLogin>
                  ),
                },
                {
                  path: 'view/:postId',
                  element: (
                    <NeedLogin>
                      <BoardView />
                    </NeedLogin>
                  ),
                },
              ],
            },
            {
              path: 'study',
              element: (
                <NeedLogin>
                  <Study />
                </NeedLogin>
              ),
            },
            {
              path: 'library',
              element: (
                <NeedLogin>
                  <Library />
                </NeedLogin>
              ),
            },
            {
              path: 'seminar',
              element: (
                <NeedLogin>
                  <SeminarAttend />
                </NeedLogin>
              ),
            },
            /* {
              path: 'election',
              element: <div />,
            }, */
            {
              path: 'rank',
              element: (
                <NeedLogin>
                  <Rank />
                </NeedLogin>
              ),
            },
            {
              path: 'game',
              element: (
                <NeedLogin>
                  <Game />
                </NeedLogin>
              ),
            },
            /* {
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
            }, */
          ],
        },
      ],
    },
  ]);

export default useMainRouter;
