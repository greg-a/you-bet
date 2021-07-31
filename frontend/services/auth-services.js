import http from './http-service';

const rootURL = '/api/login/';

export const userLogin = (data) => http.post(rootURL, data);
