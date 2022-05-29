import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';

import attachIcon from '../assets/images/icons/attach_file.svg';
import sendIcon from '../assets/images/icons/send.svg';
import { useAuth } from '../hooks/useAuth';
import { TaskContext } from '../pages/TaskInfoPage';

const baseUrl = 'http://server.selestia.ru'

const ReplyUser = () => {

    const { user } = useAuth();
    const { task, idTask } = useContext(TaskContext);

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
            files: [
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
    
            const result = await axios.request({ 
                url:     'http://server.selestia.ru/api/student/postAnswer',
                method:  'post',
                data:     formData,
                headers:  {'Content-Type': 'multipart/form-data'}
            });
        }

        fetchData();
    }

    return (
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
    )
}

export default ReplyUser;