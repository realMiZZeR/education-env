import { Route, Routes } from 'react-router-dom';
import React, { Suspense } from 'react';

// components
import Search from './Search';
import LoadingPage from './LoadingPage';
import { TaskInfoPage } from '../pages/TaskInfoPage';
import StudentAnswerPage from '../pages/StudentAnswerPage';

// hoc
import { TimetableProvider } from '../hoc/TimetableProvider';
import AuthController from '../hoc/AuthController';
import TeacherController from '../hoc/TeacherController';
import AdminController from '../hoc/AdminController';
import { ModalProvider } from '../hoc/ModalProvider';

// images
import hamburgerIcon from '../assets/images/icons/hamburger.svg';
import LeaderboardPage from '../pages/LeaderboardPage';

// pages
const Auth = React.lazy(() => import('../pages/Auth'));
const Home = React.lazy(() => import('../pages/Home'));
const MessagesPage = React.lazy(() => import('../pages/MessagesPage'));
const Timetable = React.lazy(() => import('../pages/Timetable'));
const Users = React.lazy(() => import('../pages/Users'));
const Tasks = React.lazy(() => import('../pages/Tasks'));
const Journal = React.lazy(() => import('../pages/Journal'));
const PageNotFound = React.lazy(() => import('../pages/PageNotFound'));
const Profile = React.lazy(() => import('../pages/Profile'));

// teacher pages
const CreateTaskPage = React.lazy(() => import('../pages/CreateTaskPage'));
const AnswersPage = React.lazy(() => import('../pages/AnswersPage'));

// admin pages
const CreateUserPage = React.lazy(() => import('../pages/CreateUserPage'));
const CreateDisciplinePage = React.lazy(() => import('../pages/CreateDisciplinePage'));
const CreateGroupPage = React.lazy(() => import('../pages/CreateGroupPage'));

export const MainContent = ({refHandler}) => {
    return (
        <div className='content'>
            <div className='container'>
                <header className='content-top'>
                    <div className='hamburger' onClick={refHandler}>
                        <img src={hamburgerIcon} alt='Hamburger'/>
                    </div>
                    <Search className='search search_sm' />
                </header>
                <ModalProvider>
                    <div className='content-main'>
                        <Suspense fallback={<LoadingPage />}>
                            <Routes>
                                <Route path='/' element={<Auth title='?????????? ????????????????????!' />} />
                                <Route path='/home' element={
                                    <AuthController>
                                        <Home title="??????????????" />
                                    </AuthController>
                                } />
                                <Route path='/timetable' element={
                                    <TimetableProvider>
                                        <Timetable title="????????????????????" />
                                    </TimetableProvider>
                                } />
                                <Route path='/messages' element={
                                    <AuthController>
                                        <MessagesPage title="??????????????????" />
                                    </AuthController>
                                }/>
                                <Route path='/profile/:id' element={
                                    <AuthController>
                                        <Profile title="???????????? ??????????????" />
                                    </AuthController>
                                } />
                                <Route path='/users' element={
                                    <AuthController>
                                        <Users title="?????? ????????????????????????" />
                                    </AuthController>
                                } />
                                <Route path='/tasks' element={
                                    <AuthController>
                                        <Tasks title="??????????????" />
                                    </AuthController>
                                } />
                                <Route path='/tasks/:id' element={
                                    <AuthController>
                                        <TaskInfoPage title="??????????????" />
                                    </AuthController>
                                } />
                                <Route path='/tasks/leaderboard/:id' element={
                                    <AuthController>
                                        <LeaderboardPage title="???????????? ??????????????" />
                                    </AuthController>
                                } />
                                <Route path='/journal' element={
                                    <AuthController>
                                        <Journal title="???????????? ????????????" />
                                    </AuthController>
                                } />
                                <Route path='*' element={<PageNotFound />} />

                                {/* teacher pages */}
                                <Route path='/create-task' element={
                                    <AuthController>
                                        <CreateTaskPage title='?????????? ??????????????' />
                                    </AuthController>

                                } />
                                <Route path='/tasks/:id/answers' element={
                                    <AuthController>
                                        <AnswersPage title='????????????' />
                                    </AuthController>
                                } />
                                <Route path='/tasks/:idTask/answers/:idUser' element={
                                    <AuthController>
                                        <StudentAnswerPage title='???????????????????? ????????????' />
                                    </AuthController>
                                } />

                                {/* admin pages */}

                                <Route path='/create-user' element={
                                    <AdminController>
                                        <CreateUserPage title="???????????????? ????????????????????????" />
                                    </AdminController>
                                } />
                                <Route path='/create-discipline' element={
                                    <AdminController>
                                        <CreateDisciplinePage title="???????????????? ????????????????????" />
                                    </AdminController>
                                } />
                                <Route path='/create-group' element={
                                    <AdminController>
                                        <CreateGroupPage title="???????????????? ????????????" />
                                    </AdminController>
                                } />
                            </Routes>
                        </Suspense>
                    </div>
                </ModalProvider>
            </div>
        </div>
    );
}