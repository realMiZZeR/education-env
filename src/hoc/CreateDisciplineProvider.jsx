import axios from 'axios';
import { useState, createContext } from "react";

export const DisciplineContext = createContext(null);

export const CreateDisciplineProvider = ({ children }) => {

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

        await axios.post(
            'http://server.selestia.ru/api/admin/createDist', 
            formValues
        ).catch(error => console.warn(error));
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
