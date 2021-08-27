import http from './http-service';

const rootURL = '/api/users/';

export const getProfileBets = (username) => http.get(`${rootURL}profile/${username}`);
