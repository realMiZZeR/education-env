import axios from 'axios';
import React, { useEffect } from 'react';
import { createContext, useState } from 'react';

import { useModal } from '../hooks/useModal';
import { useAuth } from '../hooks/useAuth';

export const SavedUsersContext = createContext(null);

export const CreateUserProvider = ({ children }) => {

    const { user } = useAuth();
    const { setModal } = useModal();

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
        idUser: 0,
        email: ''   
    }

    const [ savedUsers, setSavedUsers ] = useState([]);
    const [ formValues, setFormValues ] = useState(formFields);
    const [ currentUser, setCurrentUser ] = useState(0);
    const [ invalidUsers, setInvalidUsers ] = useState([]);

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
        arr.forEach((item, index) => {
            if(item.id === user.id) arr[index] = user
        });
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
        const newUsers = arr.filter(user => user.id !== id);
        return newUsers;
    }

    const deleteUser = (id) => {
        setSavedUsers( arr => [
            ...deleteValue(arr, id),
        ]);
        localStorage.setItem('savedUsers', JSON.stringify(savedUsers));
    }

    // save users in the server
    function saveUsersData(e) {
        e.preventDefault();
        
        const fetchData = async (callback) => {
            let status = null;
            await axios.post(
                'http://server.selestia.ru/api/admin/createUser', 
                savedUsers,
                {headers: {token: user.token}}
            ).then(response => status = response.status
            ).catch(error => {
                console.dir(error)
                setInvalidUsers(error.response.data);
                status = error.response.status;
            }
            ).finally(() => callback(status))
        }

        new Promise((resolve, reject) => {
            fetchData(resolve);
        }).then(status => setModal({status: status, type: 'CREATE'}));
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
        saveUsersData ,
        invalidUsers,
        setInvalidUsers
    }

    // loading first user on render
    useEffect(() => {
        return () => {
            if(localStorage.getItem('savedUsers')) {
                const savedUsersStorage = JSON.parse(localStorage.getItem('savedUsers'));
                savedUsersStorage.forEach(user => {
                    if(user.id >= id) setId(user.id + 1);
                });
                setSavedUsers(savedUsersStorage);
            } else {
                addUser(formFields);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <SavedUsersContext.Provider value={value}>
            <form onSubmit={saveUsersData} className='create-form'>
                { children }
            </form>
        </SavedUsersContext.Provider>
        
    )
}