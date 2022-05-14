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
    },
    mark: ''
}

export const AnswerContext = createContext(null);

const StudentAnswerPage = (props) => {
    
    // load title from Route in MainContent
    useEffect(() => {
        updateTitle(`${props.title}`);
    }, [props.title]);

    const params = useParams();

    const [ idTask, setIdTask ] = useState(null);
    useEffect(() => {
        setIdTask(params.idTask);
    }, [params.idTask]);

    const [ idUser, setIdUser ] = useState(null);
    useEffect(() => {
        setIdUser(params.idUser);
    }, [params.idUser]);

    const [ data, setData ] = useState(taskFields);
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        const getAnswer = async () => {
            await axios.get(
                'http://server.selestia.ru/api/teacher/getAnswerStudent',
                {params: { idTask: idTask, idUser: idUser } }
            ).then(response => {
                setData(response.data);
            }
            ).catch(error => console.warn(error)
            ).finally(() => setIsLoading(false));
        }

        if(idTask && idUser) getAnswer();
    }, [idTask, idUser]);

    const value ={
        data,
        idTask,
        idUser
    }

    return (
        <div className='tasks-wrapper'>
            {isLoading ? (
                <LoadingPage />
            ) : (
                <AnswerContext.Provider value={value}>
                    <TaskContent />
                    <TaskAside task={data} />
                </AnswerContext.Provider>
            )}
            
        </div>
    );
}

export default StudentAnswerPage