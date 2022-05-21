import axios from "axios";
import { useState, createContext, useEffect } from "react";

export const GroupContext = createContext(null);

export const CreateGroupProvider = ({ children }) => {

    const formFields = {
        title: '',
        entrance: '',
        expiration: '',
        teacher: '',
        faculty: '',
        students: []
    }

    const [ formValues, setFormValues ] = useState(formFields);

    const saveGroupData = (e) => {
        e.preventDefault();

        const fetchData = async () => {
            await axios.post(
                'http://server.selestia.ru/api/admin/createGroup', 
                formValues
            ).then(response => console.log(response)
            ).catch(error => console.dir(error));
        }

        fetchData();
    }


    const value = {
        formValues,
        setFormValues,
        saveGroupData
    }
    
    useEffect(() => {
        console.log(formValues);
    }, [formValues]);

    return (
        <GroupContext.Provider value={value}>
            <form onSubmit={saveGroupData} className='create-form'>
                { children }
            </form>
        </GroupContext.Provider>
    )
}