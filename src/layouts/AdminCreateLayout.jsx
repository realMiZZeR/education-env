import { createContext, useState } from 'react';

export const SavedUsersContext = createContext(null);

export const AdminCreateLayout = ({ children }) => {

    const [ createdUsers, setCreatedUsers ] = useState([]);

    const saveUser = (user) => {
        setCreatedUsers([
            ...createdUsers,
            user
        ]);
    }

    const value = { createdUsers, saveUser }

    return (
        <SavedUsersContext.Provider value={value}>
            <div className='create-wrapper'>
                { children }
            </div>
        </SavedUsersContext.Provider>
        
    )
}