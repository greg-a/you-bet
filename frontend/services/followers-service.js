import http from "./http-service";

const rootURL = "/api/followers/";

export const getFollowList = () => http.get(rootURL);
export const followUser = (userId) => http.post(rootUrl + userId);
export const unfollowUser = (userId) => http.delete(rootUrl + userId);
