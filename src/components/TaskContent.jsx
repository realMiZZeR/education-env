import React from 'react';
import { useAuth } from '../hooks/useAuth';

import TaskUser from './TaskUser';
import TaskTeacher from './TaskTeacher';
import ErrorPage from './ErrorPage';

const baseUrl = 'http://server.selestia.ru'

const TaskContent = ({ task }) => {

    const { user } = useAuth();

    if(user.role === 0) {
        return <TaskUser task={task} />
    }

    if(user.role === 1) {
        return <TaskTeacher task={task} />
    }

    return <ErrorPage />
}

export default TaskContent;