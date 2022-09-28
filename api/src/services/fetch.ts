import axios from 'axios';

export const fetchData = (url:string) =>{
    // create a promise from axios
    const promise = axios.get(url)
    // Promise which extracts the data
    const dataPromise = promise.then((response) => response.data)
    return dataPromise
}