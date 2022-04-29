import axios from 'axios';
import { useState, createContext, useEffect } from "react";

export const DisciplineContext = createContext(null);

export const CreateDisciplineProvider = ({ children }) => {

    const formFields = {
        number: '',
        type: '',
        title: '',
        teacher: '',
        group: ''
    }

    const [ formValues, setFormValues ] = useState(formFields);
    
    function saveDisciplineData() {
        const fetchData = async () => {
            const result = await axios.post(
                'http://server.selestia.ru/api/admin/createUser', 
                formValues
            );
            
            console.log(result);
        }

        fetchData();
    }

    const value = {
        formValues,
        setFormValues,
        saveDisciplineData
    }

    useEffect(() => {
        console.log(formValues);
    }, [formValues.type]);

    return (
        <DisciplineContext.Provider value={value}>
            <div className='create-wrapper'>
                { children }
            </div>
        </DisciplineContext.Provider>
    );
}
