import axios from 'axios'

const ApiClient = axios.create({
    baseURL: "https://hackthone1-zn3v.vercel.app/api",
    timeout: 10000,
    headers:{
        "Content-Type": "application/json"
    }
})


ApiClient.interceptors.response.use((res)=>{
    return res;
}, (error)=>{
    return error.message;
})

export default ApiClient;