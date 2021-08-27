import http from './http-service';

const rootURL = '/api/login/';

export const userLogin = (data) => http.post(rootURL, data);
export const checkJWToken = () => http.get(`${rootURL}token/`);
export const userLogout = () => http.get('/api/logout');
export const createAccount = (data) => http.post('/api/users', data);
