import axios from 'axios';

export const HTTP = axios.create({
    baseURL: `https://62943b3fa7203b3ed064edab.mockapi.io/api/v1/`,
    headers: {
        // Authorization: 'Bearer'
    }
})