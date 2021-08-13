import http from './http-service';

const rootURL = '/api/messages/';

export const newMessage = (data) => http.post(rootURL, data);
