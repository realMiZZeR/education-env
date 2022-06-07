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
        if(token) socket.current = new WebSocket(url);
    }, [url, token])

    // websocket
    // connect, onmessage, onclose, onerror
    function connect() {
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
    
        socket.current.onmessage = (response) => {
            const data = JSON.parse(response.data);
            setMessages(data)
        }
    
        socket.current.onclose = () => {
            setError('Server has been closed!');
            setHasConnect(false);
    
            // reconnect
            setTimeout(() => {
                console.log('Reconnected');
                connect();
            }, 1000);
        }
    
        socket.current.onerror = () => {
            setError('Server gets an error');
            // setTimeout(() => {
            //     connect();
            // }, 5000);
        }
    }

    // validate socket and it closing
    useEffect(() => {
        if(socket.current === null) {
            return;
        }

        connect();

        return () => {
            if(socket.current === null) {
                return;
            }
            socket.current.close();
        }
    }, [socket.current]);

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
        setToken: setToken,
        socket: socket,
        error: error,
        hasConnect: hasConnect,
        messages: messages,
        sendMessage: sendMessage,
        messages: messages,
        closeWebsocket: closeWebsocket,
    }

    return context;
}