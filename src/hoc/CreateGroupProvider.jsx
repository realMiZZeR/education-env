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

    function saveGroupData() {
        const fetchData = async () => {
            const result = await axios.post(
                'http://server.selestia.ru/api/admin/createGroup', 
                formValues
            );
            
            console.log(result);
        }

        // fetchData();
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
            <div className='create-wrapper'>
                { children }
            </div>
        </GroupContext.Provider>
    )
}