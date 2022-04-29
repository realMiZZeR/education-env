import axios from 'axios';
import { createContext, useState } from "react";
import { useFetchAPI } from "../hooks/useFetchAPI";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    const [ user, setUser ] = useState(null);
    const [ isAdmin, setIsAdmin ] = useState(null);

    const signIn = (user, callback) => {
        // checking for admin
        (user.login === 'admin') ? setIsAdmin(true) : setIsAdmin(false);

        // authorization
        // const fetchData = async () => {
        //     const result = await axios.post('http://server.selestia.ru/api/auth', {
        //         login: user.login,
        //         password: user.password
        //     });

        //     console.log(result);
        // }

        // fetchData();

        // remember me
        if(user.rememberPassword) {
            
        }

        setUser(user);
        callback();
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