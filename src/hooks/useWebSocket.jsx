import { useEffect, useRef, useState } from 'react';

// avaiable methods on the server
const method = {
    setToken: 'setToken',
}

export const useWebSocket = (url = 'ws://websocket.selestia.ru') => {
    const socket = useRef(null);

    const [ token, setToken ] = useState(null);
    const [ messages, setMessages ] = useState(null);
    const [ hasConnect, setHasConnect ] = useState(false);
    const [ error, setError ] = useState(null);

    useEffect(() => {
        if(token && !hasConnect) socket.current = new WebSocket(url);
    }, [url, token, hasConnect]) 

    // websocket
    // connect, onmessage, onclose, onerror
    function connect() {
        // onopen
        socket.current.onopen = () => {
            setHasConnect(true); 
    
            const message = {
                method: method.setToken,
                body: {
                    token: token
                }
            }
    
            if(socket.current.readyState === 1) {
                socket.current.send(JSON.stringify(message));
            }
        }
    
        // onmessage
        socket.current.onmessage = (response) => {
            const data = JSON.parse(response.data);
            setMessages(data);
        }
    
        // onclose
        socket.current.onclose = () => {
            setError('Server has been closed!');
            setHasConnect(false);
        }
    
        // onerror
        socket.current.onerror = () => {
            setError('Server gets an error');
            setHasConnect(false);
        }
    }

    useEffect(() => {
        if(socket.current) connect();
    }, [token, socket.current]);

    const sendMessage = (message) => {
        socket.current.send(JSON.stringify(message));
    }

    const closeWebsocket = () => {
        socket.current.close();
        socket.current = null;
    }

    // avaiable methods and variables
    // of the hook
    const context = {
        token: token,
        setToken: setToken,
        socket: socket,
        error: error,
        hasConnect: hasConnect,
        messages: messages,
        sendMessage: sendMessage,
        closeWebsocket: closeWebsocket,
    }

    return context;
}