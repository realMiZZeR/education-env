import React, { useEffect, useState } from 'react';

import { useAxios } from '../../hooks/useAxios';

import { useTask } from '../../hooks/useTask';

import FormSelect from '../FormSelect';
import DisciplinesList from '../DisciplinesList';

import createTaskIcon from '../../assets/images/icons/teacher/create_task.svg';
import axios from 'axios';

const CreateTaskAside = () => {

    const { formValues, setFormValues } = useTask();

    const [ groups, setGroups ] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(
                `http://server.selestia.ru/api/teacher/getGroupDiscipline?id=${formValues.discipline}`
            );

            console.log(result)
            setGroups(result.data);
        }

        if(formValues.discipline !== '') fetchData();
    }, [formValues.discipline]);

    const [ types, setTypes ] = useState([]);

    const [ typesAxios, isErrorTypes, isLoadingTypes ] = useAxios({
        url: '/api/teacher/getTypeTask',
        method: 'get'
    });

    useEffect(() => {
        if(typesAxios && typesAxios.data) setTypes(typesAxios.data);
    }, [typesAxios]);

    const formInputChangeHandler = (e) => {
        const { name, value } = e.target;

        setFormValues({
            ...formValues,
            [name]: value
        });
    }

    const selectGroupHandler = (id) => {
        setFormValues({
            ...formValues,
            ['group']: id
        });
    }

    const taskTypeHandler = (id) => {
        setFormValues({
            ...formValues,
            ['type']: id
        });
    }

    return (
        <aside className='create-form__aside'>
            <h2 className='create-form__heading'>&nbsp;</h2>
            <div className='create-form-section create-form-section_full'>
                <FormSelect title='Выбор группы' handler={selectGroupHandler} options={groups} />
                <FormSelect title='Тип задания' handler={taskTypeHandler} options={types} />
                <div className='create-form-section__grouping'>
                    <label htmlFor='dateFrom' className='input-effect'>
                        <input 
                        name='dateFrom'
                        value={formValues.dateFrom} 
                        onChange={formInputChangeHandler}
                        type='date' 
                        className='input-effect__input input' 
                        placeholder='&nbsp;' />
                        <span>От</span>
                    </label>
                    <label htmlFor='dateTo' className='input-effect'>
                        <input 
                        name='dateTo'
                        value={formValues.dateTo} 
                        onChange={formInputChangeHandler}
                        type='date' 
                        className='input-effect__input input' 
                        placeholder='&nbsp;' />
                        <span>До</span>
                    </label>
                </div>
                <DisciplinesList />
            </div>
            <button type='submit' className='create-form-button button'>
                <div className='create-form-button__image'>
                    <img src={createTaskIcon} alt='Создать' />
                </div>
                <p className='create-form-button__text'>Создать</p>
            </button>
        </aside>
    );
}

export default CreateTaskAside;