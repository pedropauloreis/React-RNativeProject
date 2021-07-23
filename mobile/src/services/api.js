import axios from 'axios';
import LocalVars from '../config/localVars'

const api = axios.create({
    baseURL: `${LocalVars.backend.local}:${LocalVars.backend.port}`,
});

 export default api;