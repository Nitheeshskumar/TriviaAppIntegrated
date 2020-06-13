import axios from 'axios'
import React from 'react'
const backendUrl = 'http://localhost:3333'
const API = {
    listquestions:async()=> await axios.get(backendUrl+'/api/checknoder/questions'),
    checkanswer:async(body)=> await axios.post(backendUrl+'/api/checknoder/questions/checkanswer',body),
    updateScore:async(body)=> await axios.post(backendUrl+'/api/checknoder/user/update',body),
    userlogin:async(body)=> await axios.post(backendUrl+'/api/checknoder/user/login',body),
    listdashboard: async()=> await axios.get(backendUrl+'/api/checknoder/user/dashboard'),
    createQn: async(body)=> await axios.post(backendUrl+'/api/checknoder/questions/create',body),
    createUser: async(body)=> await axios.post(backendUrl+'/api/checknoder/admin/user/create',body),
}

export default API;

export const UserContext = React.createContext(null)
