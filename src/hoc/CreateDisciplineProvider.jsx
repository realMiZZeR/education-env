import axios from 'axios';
import { useState, createContext } from "react";
import { useModal } from '../hooks/useModal';

export const DisciplineContext = createContext(null);

export const CreateDisciplineProvider = ({ children }) => {

    const { setModal } = useModal();

    const formFields = {
        number: '',
        type: '',
        title: '',
        teacher: [],
        group: []
    }

    const [ formValues, setFormValues ] = useState(formFields);
    
    const saveDisciplineData = async (e) => {
        e.preventDefault();

        const fetchData = async (callback) => {
            let status = null;
            console.log(formValues)
            await axios.post(
                'http://server.selestia.ru/api/admin/createDist', 
                formValues
            ).then(response => status = response.status
            ).catch(error => {
                status = error.response.status;
            }
            ).finally(() => callback(status))
        }

        new Promise((resolve, reject) => {
            fetchData(resolve);
        }).then(status => setModal({status: status, type: 'CREATE'}));
    }

    const value = {
        formValues,
        setFormValues,
        saveDisciplineData
    }

    return (
        <DisciplineContext.Provider value={value}>
            <form onSubmit={saveDisciplineData} className='create-form'>
                { children }
            </form>
        </DisciplineContext.Provider>
    );
}
