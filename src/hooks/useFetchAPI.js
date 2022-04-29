import axios from 'axios';
import { useEffect, useState } from 'react';

export const useFetchAPI = (initialUrl, initialData) => {
    const [ data, setData ] = useState(initialData);
    const [ url, setUrl ] = useState(initialUrl);
    const [ isError, setIsError ] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsError(false);

            try {
                const result = await axios(url)

                setData(result.data)
            } catch (error) {
                setIsError(true);
            }
        }

        fetchData();
    }, [url]);

    return [{ data, isError }, setUrl];
}
