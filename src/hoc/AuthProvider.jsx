import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    const [ user, setUser ] = useState(null);
    const [ isAdmin, setIsAdmin ] = useState(null);

    const signIn = (newUser, callback) => {
        setUser(newUser);
        (newUser.login === 'admin') ? setIsAdmin(true) : setIsAdmin(false);
        if(newUser.rememberPassword) {
            localStorage.setItem('login', newUser.login);
            console.log(localStorage.getItem('login'));
        }
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