import axios from 'axios';
import { useEffect, createContext, useState } from "react";
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    const navigate = useNavigate();

    const [ user, setUser ] = useState(null);
    const [ isAdmin, setIsAdmin ] = useState(null);
    // const [ status, setStatus ] = useState(null);

    const signIn = ({user, callback, promise}) => {

        // checking for admin
        (user.login === 'admin') ? setIsAdmin(true) : setIsAdmin(false);

        // process of authorization
        const fetchData = async () => {
            let status = null;
            await axios.post(
                'http://server.selestia.ru/api/auth',
                {
                    login: user.login,
                    password: user.password
                }
            ).then(response => {
                status = response.status;
                if(response.status === 200) {
                    const { token, role, urlId } = response.data;

                    if(role === 2) setIsAdmin(true);
                    
                    setUser({
                        token: token,
                        urlId: urlId,
                        role: role
                    });

                    // remember me
                    if(user.rememberPassword) {
                        localStorage.setItem('token', token);
                    } 

                    callback();
                    
                } else {
                    throw new Error();
                }
            }).catch(error => {
                status = error.response.status;
            }).finally(() => (promise) ? promise.resolve(status) : '');
        }

        fetchData();
    }

    useEffect(() => {
        if(localStorage.getItem('token')) {
            const authToken = async () => {
                await axios.post(
                    'http://server.selestia.ru/api/authToken',
                    {
                        token: localStorage.getItem('token')
                    }
                ).then(response => {
                    const { token, role } = response.data;
                    setUser({
                        token: token,
                        role: role
                    });
    
                    navigate('/home', {replace: true});
                }).catch(error => console.dir(error));
            }
            if(!user) authToken();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const signOut = (callback) => {
        setUser(null);
        setIsAdmin(null);
        // forget me, if I was remembered :)
        if(localStorage.getItem('token')) {
            localStorage.removeItem('token');
        }
        callback();
    }

    const value = {user, signIn, signOut, isAdmin}

    return <AuthContext.Provider value={value}>
        { children }
    </AuthContext.Provider>
}