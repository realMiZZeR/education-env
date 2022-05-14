import React from 'react';
import { useAuth } from '../hooks/useAuth';

import TaskUser from './TaskUser';
import TaskTeacher from './TaskTeacher';
import ErrorPage from './ErrorPage';

const TaskContent = () => {

    const { user } = useAuth();

    if(user.role === 0) {
        return <TaskUser />
    }

    if(user.role === 1) {
        return <TaskTeacher />
    }

    return <ErrorPage />
}

export default TaskContent;