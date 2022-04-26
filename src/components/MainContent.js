import { Route, Routes } from 'react-router-dom';
import React, { Suspense } from 'react';
import LoadingPage from './LoadingPage';
import Search from './Search';

// images
import hamburgerIcon from '../assets/images/icons/hamburger.svg';
import AuthController from '../hoc/AuthController';
import { AuthProvider } from '../hoc/AuthProvider';
import AdminController from '../hoc/AdminController';
import CreateUserPage from '../pages/CreateUserPage';

const Auth = React.lazy(() => import('../pages/Auth'));
const Home = React.lazy(() => import('../pages/Home'));
const Messanger = React.lazy(() => import('../pages/Messanger'));
const Timetable = React.lazy(() => import('../pages/Timetable'));
const Users = React.lazy(() => import('../pages/Users'));
const Tasks = React.lazy(() => import('../pages/Tasks'));
const Journal = React.lazy(() => import('../pages/Journal'));
const PageNotFound = React.lazy(() => import('../pages/PageNotFound'));
const Profile = React.lazy(() => import('../pages/Profile'));



export default function MainContent() {
    return (
        <div className='content'>
            <div className='container'>
                <header className='content-top'>
                    <div className='hamburger'>
                        <img src={hamburgerIcon} alt='Hamburger'/>
                    </div>
                    <Search className='search search_sm' />
                </header>
                <div className='content-main'>
                    <Suspense fallback={<LoadingPage />}>
                        <Routes>
                            <Route path='/load' element={<LoadingPage />} />
                            <Route path='/' element={<Auth title='Добро пожаловать!' />} />
                            <Route path='/home' element={
                                <AuthController>
                                    <Home title="Главная" />
                                </AuthController>
                            } />
                            <Route path='/timetable' element={<Timetable title="Расписание" />} />
                            <Route path='/messanger' element={
                                <AuthController>
                                    <Messanger title="Сообщения" />
                                </AuthController>
                            }/>
                            <Route path='/profile/:login' element={
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
                            <Route path='/journal' element={
                                <AuthController>
                                    <Journal title="Журнал оценок" />
                                </AuthController>
                            } />
                            <Route path='*' element={<PageNotFound />} />

                            {/* admin pages */}

                            <Route path='/create-user' element={
                                <AdminController>
                                    <CreateUserPage title="Создание пользователя" />
                                </AdminController>
                            } />
                        </Routes>
                    </Suspense>
                </div>
            </div>
        </div>
    );
}