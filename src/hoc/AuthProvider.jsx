import axios from 'axios';
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    const [ user, setUser ] = useState(null);
    const [ isAdmin, setIsAdmin ] = useState(null);
    const [ isError, setIsError ] = useState(false);

    const signIn = (user, callback) => {

        setIsError(false);

        // checking for admin
        (user.login === 'admin') ? setIsAdmin(true) : setIsAdmin(false);

        // process of authorization
        const fetchData = async () => {
            await axios.post(
                'http://server.selestia.ru/api/auth',
                {
                    login: user.login,
                    password: user.password
                }
            ).then(response => {
                if(!isError && response.status === 200) {
                    const { token, role } = response.data;

                    switch(role) {
                        case 0:
                            break;
                        case 1:
                            break;
                        case 2:
                            break;
                    }

                    if(role === 2) setIsAdmin(true);
                    
                    setUser({
                        ...user,
                        token: token,
                        role: role
                    });

                    callback();
                }
            }).catch(error => console.log(error.toJSON()));
        }

        fetchData();
    }
    const signOut = (callback) => {
        setUser(null);
        setIsAdmin(null);
        callback();
    }

    const value = {user, signIn, signOut, isAdmin}

    return <AuthContext.Provider value={value}>
        { children }
    </AuthContext.Provider>
}