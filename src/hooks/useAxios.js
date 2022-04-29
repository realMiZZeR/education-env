import { useEffect, useState } from 'react';
import axios from 'axios';

const useAxios = (config) => {
    axios.defaults.baseURL = 'http://server.selestia.ru';

    const [ response, setResponse ] = useState(null);
    const [ isError, setIsError ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        await axios.request(config)
        .then(response => setResponse(response))
        .catch(error => setIsError(error))
        .finally(() => setIsLoading(false));
    }

    return [response, isError, isLoading];
}

export { useAxios };