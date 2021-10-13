import http from './http-service';

const rootURL = '/api/users/';

export const getProfileBets = (username) => http.get(`${rootURL}profile/${username}`);
export const userSearch = (searchInput) => http.get(`${rootURL}search/${searchInput}`);
export const changePassword = (data) => http.put(`${rootURL}password-reset`, data);
