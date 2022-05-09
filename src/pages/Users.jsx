import React, { useState, useEffect } from 'react';
import Search from '../components/Search';
import { UsersCards } from '../components/UsersCards';

import updateTitle from '../assets/js/updateTitle';
import { useAxios } from '../hooks/useAxios';
import LoadingPage from '../components/LoadingPage';
import ErrorPage from '../components/ErrorPage';

const Users = (props) => {

    useEffect(() => {
        updateTitle(props.title);
    }, [props.title]);

    const [ response, isError, isLoading ] = useAxios(
        `http://server.selestia.ru/api/user/getAll`
    )

    const [ users, setUsers ] = useState([]);

    useEffect(() => {
        if(response && response.data) setUsers(response.data);
    }, [response]);

    console.log(response)

    const [ students, setStudents ] = useState([]);

    useEffect(() => {
        setStudents(users.filter(user => user.isTeacher === false));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [response]);

    const [ teachers, setTeachers ] = useState([]);

    useEffect(() => {
        setTeachers(users.filter(user => user.isTeacher === true));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [response]);

    return (
        <article className='users'>
            <div className='users-unit'>
                <div className='users-unit__heading'>
                    <h2 className='users-unit__title'>Преподаватели</h2>
                    <Search className='users-unit__search search search_sm' />
                </div>
                {isLoading ? (
                    <LoadingPage />
                ) : (
                    <>
                        {!isError ? (
                            <UsersCards users={teachers}  />
                        ) : (
                            <ErrorPage message='no' />
                        )}
                    </>
                )}
            </div>
            <div className='users-unit'>
                <div className='users-unit__heading'>
                    <h2 className='users-unit__title'>Студенты</h2>
                    <Search className='users-unit__search search search_sm' />
                </div>
                {isLoading ? (
                    <LoadingPage />
                ) : (
                    <>
                        {!isError ? (
                            <UsersCards users={students}  />
                        ) : (
                            <ErrorPage message='no' />
                        )}
                    </>
                )}
            </div>
        </article>
    );
}

export default Users;