import React from 'react';
import { useRoutes } from 'react-router-dom';
import Duty from '@pages/Duty/Duty';
import Library from '@pages/Library/Library';
import NotFound from '@pages/NotFound/NotFound';
import Profile from '@pages/Profile/Profile';
import SignUp from '@pages/SignUp/SignUp';
import Study from '@pages/Study/Study';
import VoteList from '@pages/Vote/VoteList';
import VotePageContainer from '@pages/Vote/VotePageContainer';
import VoteResult from '@pages/Vote/VoteResult';
import BoardList from '@pages/board/BoardList/BoardList';
import BoardView from '@pages/board/BoardView/BoardView';
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

const Game = React.lazy(() => import('@pages/Game/Game'));
const BoardWrite = React.lazy(() => import('@pages/board/BoardWrite/BoardWrite'));
const ActiveMemberManage = React.lazy(() => import('@pages/admin/ActiveMemberManage/ActiveMemberManage'));
const DutyManage = React.lazy(() => import('@pages/admin/DutyManage/DutyManage'));
const LibraryManage = React.lazy(() => import('@pages/admin/LibraryManage/LibraryManage'));
const MeritManage = React.lazy(() => import('@pages/admin/MeritManage/MeritManage'));
const SeminarManage = React.lazy(() => import('@pages/admin/SeminarManage/SeminarManage'));
const VoteMange = React.lazy(() => import('@pages/admin/VoteMange/VoteMange'));

const SuspendedPage = ({ children }: React.PropsWithChildren) => (
  <React.Suspense
    fallback={
      <output className="flex min-h-[50vh] items-center justify-center" aria-live="polite">
        페이지를 불러오는 중입니다.
      </output>
    }
  >
    {children}
  </React.Suspense>
);

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
                      <SuspendedPage>
                        <DutyManage />
                      </SuspendedPage>
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
                      <SuspendedPage>
                        <LibraryManage />
                      </SuspendedPage>
                    </NeedAuth>
                  ),
                },
                {
                  path: 'seminarManage',
                  element: (
                    <NeedAuth roles={['ROLE_서기']}>
                      <SuspendedPage>
                        <SeminarManage />
                      </SuspendedPage>
                    </NeedAuth>
                  ),
                },
                {
                  path: 'activeMemberManage',
                  element: (
                    <NeedAuth roles={['ROLE_서기']}>
                      <SuspendedPage>
                        <ActiveMemberManage />
                      </SuspendedPage>
                    </NeedAuth>
                  ),
                },
                {
                  path: 'meritManage',
                  element: (
                    <NeedAuth roles={['ROLE_서기']}>
                      <SuspendedPage>
                        <MeritManage />
                      </SuspendedPage>
                    </NeedAuth>
                  ),
                },
                {
                  path: 'voteManage',
                  element: (
                    <NeedAuth>
                      <SuspendedPage>
                        <VoteMange />
                      </SuspendedPage>
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
                      <SuspendedPage>
                        <BoardWrite />
                      </SuspendedPage>
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
              path: 'duty',
              element: (
                <NeedLogin>
                  <Duty />
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
            {
              path: 'vote',
              element: (
                <NeedLogin>
                  <VoteList />
                </NeedLogin>
              ),
            },
            {
              path: 'vote/:voteId',
              element: (
                <NeedLogin>
                  <VotePageContainer />
                </NeedLogin>
              ),
            },
            {
              path: 'vote/:voteId/result',
              element: (
                <NeedLogin>
                  <VoteResult />
                </NeedLogin>
              ),
            },
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
                  <SuspendedPage>
                    <Game />
                  </SuspendedPage>
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
