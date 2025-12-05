import axios from "axios"


const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    // baseURL: 'https://auth2-ecru.vercel.app/api',
    withCredentials: true,
    headers: {
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Expires: "0",
  },
});

export default api;