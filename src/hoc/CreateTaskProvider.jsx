import axios from "axios";
import { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useModal } from "../hooks/useModal";

export const TaskContext = createContext(null);

export const CreateTaskProvider = ({ children }) => {

    const { user } = useAuth();
    const { setModal } = useModal();
    const navigate = useNavigate();

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

            await axios.request({ 
                url:     'http://server.selestia.ru/api/teacher/createTask',
                method:  'post',
                data:     formData,
                headers:  {'Content-Type': 'multipart/form-data'}
            }
            ).then(response => setModal({status: response.status, type: 'CREATE'})
            ).catch(error => setModal({status: error.response.staus, type: 'CREATE'})
            ).finally(() => navigate('/create-task', {replace: true}));
        }

        fetchData();
    }

    const value = {
        formValues,
        setFormValues,
        saveTaskData
    }

    return (
        <TaskContext.Provider value={value}>
            <form onSubmit={saveTaskData} className='create-form'>
                { children }
            </form>
        </TaskContext.Provider>
    )
}