import axios from 'axios';
import React, { useEffect } from 'react';
import { createContext, useState } from 'react';

export const SavedUsersContext = createContext(null);

export const CreateUserProvider = ({ children }) => {

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
        localStorage.setItem('savedUsers', JSON.stringify(savedUsers));
    }

    // delete object in array savedUsers
    function deleteValue(arr, id) {
        arr.splice(id, 1);
        return arr;
    }

    const deleteUser = (id) => {
        setSavedUsers( arr => [
            ...deleteValue(arr, id),
        ]);
        localStorage.setItem('savedUsers', JSON.stringify(savedUsers));
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
            if(localStorage.getItem('savedUsers')) {
                setSavedUsers(JSON.parse(localStorage.getItem('savedUsers')));
            } else {
                addUser(formFields);
            }
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