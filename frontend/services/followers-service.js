import http from './http-service';

const rootURL = '/api/followers/';

export const getFollowList = () => http.get(rootURL);
export const followUser = (id) => http.post(rootURL, { id });
