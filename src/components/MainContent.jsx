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

export const MainContent = () => {
    return (
        <div className='content'>
            <div className='container'>
                <header className='content-top'>
                    <div className='hamburger'>
                        <img src={hamburgerIcon} alt='Hamburger'/>
                    </div>
                    <Search className='search search_sm' />
                </header>
                <ModalProvider>
                    <div className='content-main'>
                        <Suspense fallback={<LoadingPage />}>
                            <Routes>
                                <Route path='/' element={<Auth title='Добро пожаловать!' />} />
                                <Route path='/home' element={
                                    <AuthController>
                                        <Home title="Главная" />
                                    </AuthController>
                                } />
                                <Route path='/timetable' element={
                                    <TimetableProvider>
                                        <Timetable title="Расписание" />
                                    </TimetableProvider>
                                } />
                                <Route path='/messages' element={
                                    <AuthController>
                                        <MessagesPage title="Сообщения" />
                                    </AuthController>
                                }/>
                                <Route path='/profile/:id' element={
                                    <AuthController>
                                        <Profile title="Личный кабинет" />
                                    </AuthController>
                                } />
                                <Route path='/users' element={
                                    <AuthController>
                                        <Users title="Все пользователи" />
                                    </AuthController>
                                } />
                                <Route path='/tasks' element={
                                    <AuthController>
                                        <Tasks title="Задания" />
                                    </AuthController>
                                } />
                                <Route path='/tasks/:id' element={
                                    <AuthController>
                                        <TaskInfoPage title="Задание" />
                                    </AuthController>
                                } />
                                <Route path='/journal' element={
                                    <AuthController>
                                        <Journal title="Журнал оценок" />
                                    </AuthController>
                                } />
                                <Route path='*' element={<PageNotFound />} />

                                {/* teacher pages */}
                                <Route path='/create-task' element={
                                    <AuthController>
                                        <CreateTaskPage title='Новое задание' />
                                    </AuthController>

                                } />
                                <Route path='/tasks/:id/answers' element={
                                    <AuthController>
                                        <AnswersPage title='Ответы' />
                                    </AuthController>
                                } />
                                <Route path='/tasks/:idTask/answers/:idUser' element={
                                    <AuthController>
                                        <StudentAnswerPage title='Содержимое ответа' />
                                    </AuthController>
                                } />

                                {/* admin pages */}

                                <Route path='/create-user' element={
                                    <AdminController>
                                        <CreateUserPage title="Создание пользователя" />
                                    </AdminController>
                                } />
                                <Route path='/create-discipline' element={
                                    <AdminController>
                                        <CreateDisciplinePage title="Создание дисциплины" />
                                    </AdminController>
                                } />
                                <Route path='/create-group' element={
                                    <AdminController>
                                        <CreateGroupPage title="Создание группы" />
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