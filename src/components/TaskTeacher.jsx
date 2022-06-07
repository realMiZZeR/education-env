import React, { useContext } from 'react';
import { AnswerContext } from '../pages/StudentAnswerPage';
import LoadingPage from '../components/LoadingPage';

const baseUrl = 'http://server.selestia.ru'

const TaskTeacher = () => {

    const { data } = useContext(AnswerContext);

    return (
        <>
            {data ? (
            <div className='task-content'>
                <article className='task'>
                    <div className='task-description'> 
                        <h3 className='task-description__heading'>Ответ на задание:</h3>
                        <p className='task-description__text'>{ data.reply.description }</p>
                    </div>
                    {data.reply.files.length > 0 && <div className='task-files'>
                        <h3 className='task-files__heading'>Прикреплённые файлы:</h3>
                        <ul className='task-files__list'>
                            { data.reply.files.map(file => {
                                {console.log(file)}
                                return (
                                    <li key={file.id} className='task-files__item'>
                                        <a href={`${baseUrl}/${file.src}`} className='task-files__link link' download>
                                            <img src={`${baseUrl}/${file.src}`} alt='Файл' />
                                        </a>
                                        <p className='task-files__name' title={file.originalName}>{ file.originalName }</p>
                                    </li>
                                )
                            }) }
                        </ul>
                    </div>
                    }
                </article>
            </div>
        ) : (
            <LoadingPage />
        )}
        </>

        
    );
}

export default TaskTeacher;