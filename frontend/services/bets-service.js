import http from './http-service';

const rootURL = '/api/bets/';

export const getAllBets = () => http.get(rootURL);
export const getUserBets = (userId) => http.get(`${rootURL}${userId}`);
export const createBet = (data) => http.post(rootURL, data);
export const acceptBet = (betId) => http.put(`${rootURL}accept/${betId}`);
export const editBet = (betId, data) => http.put(`${rootURL}${betId}`, data);
