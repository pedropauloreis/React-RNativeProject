import axios from 'axios';
const localVars = require('../config/localVars')

const api = axios.create({
    baseURL: `${localVars.backend.local}:${localVars.backend.port}`,
});

export default api;