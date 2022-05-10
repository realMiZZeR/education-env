import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import getTypeTask from '../assets/js/getTypeTask';
import { useAuth } from '../hooks/useAuth';

import publishedIcon from '../assets/images/icons/tasks/published.png';
import deadlineIcon from '../assets/images/icons/tasks/deadline.png';
import isEmptyUserImage from '../assets/js/isEmptyUserImage';
import attachIcon from '../assets/images/icons/attach_file.svg';
import sendIcon from '../assets/images/icons/send.svg';
import getDisciplineImage from '../assets/js/getDisciplineImage';


const defaultIcon = 'http://server.selestia.ru/userAvatar/standartUser.png';

const baseUrl = 'http://server.selestia.ru'

const TaskAside = ({ task, idTask }) => {

    const { user } = useAuth();

    const TaskAttribute = ({ title, image, value }) => {
        return (
            <div className='task-attributes__item'>
                <h4 className='task-attributes__heading'>{ title }:</h4>
                <div className='task-attributes__value'>
                    <div className='task-attributes__image'>
                        <img src={image} />
                    </div>
                    <p className='task-attributes__text' title={value}>{ value }</p>
                </div>
            </div>
        );
    }

    const replyFields = {
        reply: '',
        files: [],
    }

    const [ replyValues, setReplyValues ] = useState(replyFields);

    const replyFormChangeHandler = (e) => {
        const { name, value } = e.target;

        setReplyValues({
            ...replyValues,
            [name]: value
        });
    }

    const replyFormFilesHandler = (e) => {
        setReplyValues({
            ...replyValues,
            ['files']: [
                ...e.target.files
            ]
        })
    }

    // send images to the server
    useEffect(() => {
        const sendFiles = async () => {
            let formData = new FormData();
            for(let i = 0; i < replyValues.files.length; i++) {
                formData.append('files', replyValues.files[i]);
            }
            const result = await axios.request({ 
                url:     'http://server.selestia.ru/api/loadFileTask',
                method:  'post',
                data:     formData,
                headers:  {'Content-Type': 'multipart/form-data'}
            });

        }

        if(replyValues.files.length > 0) sendFiles();
    }, [replyValues.files]);
    
    // submit reply form
    const replyFormSubmitHandler = (e) => {
        e.preventDefault();

        const fetchData = async () => {
            let formData = new FormData();
            for(let key in replyValues) {
                if(key === 'files') {
                    for(let i = 0; i < replyValues.files.length; i++) {
                        formData.append('files', replyValues.files[i]);
                    }
                } else {
                    formData.append([key], replyValues[key]);
                }
            }
            formData.append('token', user.token);
            formData.append('idTask', idTask);

            console.log(...formData);
    
            const result = await axios.request({ 
                url:     'http://server.selestia.ru/api/student/postAnswer',
                method:  'post',
                data:     formData,
                headers:  {'Content-Type': 'multipart/form-data'}
            });
            
            console.log(result);
        }

        fetchData();
    }

    const correctDateFormat = (date) => {
        return new Date(date).toLocaleDateString();
    }

    return (
        <aside className='task-aside'>
            <div className='task-attributes'>
                <TaskAttribute 
                    title='Дисциплина'
                    image={getDisciplineImage({type: task.discipline.type})}
                    value={task.discipline.name}  
                />
                <TaskAttribute 
                    title='Тип задания'
                    image={getTypeTask({type: task.taskType.type})}
                    value={task.taskType.name}  
                />
                <TaskAttribute 
                    title='Опубликовано'
                    image={publishedIcon}
                    value={correctDateFormat(task.published)}  
                />
                <TaskAttribute 
                    title='Срок сдачи'
                    image={deadlineIcon}
                    value={correctDateFormat(task.dateTo)}  
                />
                <footer className='task-attributes__footer'>
                    <Link to={`/profile/${task.author.id}`} className='task-attributes-author link'>
                        <div className={`task-attributes-author__image ${isEmptyUserImage(task.author.image, 'task-attributes-author__image')}`}>
                            <img src={(task.author.image) ? task.author.image : defaultIcon} alt='Аватарка' />
                        </div>
                        <div className='task-attributes-author__info'>
                            <h4 className='task-attributes-author__heading'>Создатель:</h4>
                            <p className='task-attributes-author__fullname' title={task.author.fullname}>{ task.author.fullname }</p>
                        </div>
                    </Link>
                </footer>
            </div>
            <div className='reply'>
                <div className={`reply-description ${(!task.reply.description) ? 'reply-description_empty' : ''}`}>
                    <h4 className='reply-description__heading'>
                        Ваш ответ: <span>{(!task.reply.description) ? 'отсутствует' : '' }</span>
                    </h4>
                    <p className='reply-description__text'>
                        { (task.reply.description) ? task.reply.description : '' }
                    </p>
                </div>
                {task.reply.files.length > 0 && <div className='reply-files'>
                    <h4 className='reply-files__heading'>Прикреплённые файлы</h4>
                    <ul className='reply-files__list'>
                    { task.reply?.files.map(file => {
                        return (
                            <li key={file.id} className='reply-files__item'>
                                <a href={`${baseUrl}/${file.file}`} className='reply-files__link link' download>
                                    <img src={`${baseUrl}/${file.file}`} alt='Файл' />
                                </a>
                                <p className='reply-files__name'>{ file.name }</p>
                            </li>
                        )
                    }) }
                    </ul>
                </div>
                }
                <form onSubmit={replyFormSubmitHandler} encType='multipart/form-data' className='reply-form'>
                    <label htmlFor='reply' className='reply-form__label'>
                        <input 
                            type='text' 
                            name='reply'
                            onChange={replyFormChangeHandler}
                            className='reply-form__input input' 
                            placeholder='Напишите здесь ответ'
                        />
                        <label htmlFor='files' className='reply-form__attach' style={{cursor: 'pointer'}}>
                            <img src={attachIcon} alt='Прикрепить файл' />
                            <input 
                                type='file' 
                                name='files' 
                                onChange={replyFormFilesHandler} 
                                multiple
                            />
                        </label>
                    </label>
                    <button type='submit' className='reply-form__submit button'>
                        <img src={sendIcon} alt='Отправить '/>
                    </button>
                </form>
                {replyValues.files.length > 0 && (
                <div className='reply-files reply-files_attach'>
                    <ul className='reply-files__list'>
                    { replyValues.files.map((file, index) => {
                        return (
                            <li key={index} className='reply-files__item'>
                                <a href={file.name} className='reply-files__link link' download>
                                    <img src={URL.createObjectURL(file)} alt='Файл' />
                                </a>
                                <p className='reply-files__name'>{ file.name }</p>
                            </li>
                        )
                    }) }
                    </ul>
                </div>
                )}
            </div>
        </aside>
    );
}

export default TaskAside;