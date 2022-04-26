import axios from 'axios';
import React, { useEffect } from 'react';
import { createContext, useState } from 'react';

export const SavedUsersContext = createContext(null);

export const AdminCreateLayout = ({ children }) => {

    const [ id, setId ] = useState(0);

    function incrementId() {
        setId(id + 1);
        return id;
    }

    const formFields = {
        id: id,
        login: '',
        password: '',
        fullname: '',
        isTeacher: false,
        group: null,
        idUser: '',
        email: ''   
    }

    const [ savedUsers, setSavedUsers ] = useState([]);

    const [ formValues, setFormValues ] = useState(formFields);

    const [ currentUser, setCurrentUser ] = useState(0);

    const addUser = () => {
        setSavedUsers( arr => [
            ...arr,
            {
                id: incrementId(),
                ...formFields
            }
        ]);
    }

    // replace object in array by form fields
    function replaceValue(arr, user) {
        arr[currentUser] = user;
        return arr;
    }

    // saving user in users list
    const saveUser = (user) => {
        setSavedUsers( arr => [
            ...replaceValue(arr, user)
        ]);
    }

    const deleteUser = (user) => {

    }

    function saveUsersData() {
        const fetchData = async () => {
            const result = await axios.post(
                'http://server.selestia.ru/api/admin/createUser', 
                savedUsers
            );
            
            console.log(result);
        }

        fetchData();
    }

    const value = { 
        addUser,
        savedUsers, 
        saveUser, 
        deleteUser,
        currentUser, 
        setCurrentUser, 
        formValues,
        setFormValues,
        incrementId,
        saveUsersData 
    }

    // loading first user on render
    useEffect(() => {
        return () => {
            addUser(formFields);
        }
    }, []);

    return (
        <SavedUsersContext.Provider value={value}>
            <div className='create-wrapper'>
                { children }
            </div>
        </SavedUsersContext.Provider>
        
    )
}