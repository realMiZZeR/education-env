import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import updateTitle from "../assets/js/updateTitle";
import TaskAside from '../components/TaskAside';
import TaskContent from '../components/TaskContent';
import LoadingPage from '../components/LoadingPage'
import { useAuth } from '../hooks/useAuth';

const taskFields = {
    id: '',
    title: '',
    description: '',
    files: [],
    discipline: {
        name: '',
        type: '',
    },
    taskType: {
        name: '',
        type: '',
    },
    published: '',
    dateTo: '',
    author: {
        id: '',
        fullname: '',
        image: ''
    },
    reply: {
        description: '',
        files: []
    }
}

export const TaskContext = createContext(null);

export const TaskInfoPage = (props) => {

    const [ task, setTask ] = useState(taskFields);
    
    // load title from Route in MainContent
    useEffect(() => {
        updateTitle(`${props.title} «${task?.title}»`);
    }, [props.title, task]);

    const { user } = useAuth();

    const [ idTask, setIdTask ] = useState(null);

    const params = useParams();

    useEffect(() => {
        setIdTask(params.id);
    }, [params]);

    const [ isLoading, setIsLoading ] = useState(false);

    useEffect(() => {
        const userData = async () => {
            setIsLoading(true);
            await axios.get(
                `http://server.selestia.ru/api/task/getMainInfo`, {
                    params: { 
                        token :  user.token, 
                        idTask:  idTask 
                    }
                }
            )
            .then(response => setTask(response.data))
            .catch(error => console.warn(error))
            .finally(setIsLoading(false));
        }

        if(idTask) userData()
    }, [idTask]);

    const value = {
        task, idTask
    }

    return (
        <div className='tasks-wrapper'>
            {isLoading ? (
                <LoadingPage />
            ) : (
                <TaskContext.Provider value={value}>
                    <TaskContent />
                    <TaskAside task={task} />
                </TaskContext.Provider>
            )}
            
        </div>
    );
}