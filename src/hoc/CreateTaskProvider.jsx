import axios from "axios";
import { useState, createContext, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

export const TaskContext = createContext(null);

export const CreateTaskProvider = ({ children }) => {

    const { user } = useAuth();

    const formFields = {
        title: '',
        description: '',
        group: '',
        type: '',
        dateFrom: '',
        dateTo: '',
        discipline: '',
        files: []
    }

    const [ formValues, setFormValues ] = useState(formFields);

    const saveTaskData = (e) => {
        e.preventDefault();

        const fetchData = async () => {

            let formData = new FormData();
            for(let key in formValues) {
                if(key === 'files') {
                    for(let i = 0; i < formValues.files.length; i++) {
                        formData.append('files', formValues.files[i]);
                    }
                } else {
                    formData.append(key, formValues[key]);
                }
            }
            formData.append('token', user.token);

            const result = await axios.request({ 
                url:     'http://server.selestia.ru/api/teacher/createTask',
                method:  'post',
                data:     formData,
                headers:  {'Content-Type': 'multipart/form-data'}
            });
            
            console.log(result);
        }

        fetchData();
    }

    const value = {
        formValues,
        setFormValues,
        saveTaskData
    }
    
    useEffect(() => {
        console.log(formValues);
    }, [formValues.title]);

    return (
        <TaskContext.Provider value={value}>
            <form onSubmit={saveTaskData} className='create-form'>
                { children }
            </form>
        </TaskContext.Provider>
    )
}