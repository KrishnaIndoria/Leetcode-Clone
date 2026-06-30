import axios from "axios"

const axiosClient = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true,  //means attach cookies with requests
    headers: {
        'Content-Type': 'application/json'
    }
});

export default axiosClient;