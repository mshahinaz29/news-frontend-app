import Axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

const axios = Axios.create({
    baseURL: BASE_URL ?? 'http://localhost',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true
})

export default axios