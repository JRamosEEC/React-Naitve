import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetch = (url) => {
    const [data, setData] = useState<any>();
    const [fetchLoading, setFetchLoading] = useState<any>(true);
    const [fetchError, setFetchError] = useState<any>(undefined);
   
    useEffect(() => {
        const getData = async () => {
            setFetchError(undefined);
            setFetchLoading(true);

            try {
                const response = await axios.get(`${url}`);
                setData(response.data);
            } catch (error) {
                setFetchError(error)
            } finally {
                setFetchLoading(false);
            }
        };
   
        getData();
    }, [url]);

    return { data, fetchLoading, fetchError };
}
