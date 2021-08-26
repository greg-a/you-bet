import http from './http-service';

const rootURL = '/api/bets/';

export const getAllBets = () => http.get(rootURL);
export const getUserBetById = (username, betId) => http.get(`${rootURL}${username}/bet/${betId}`);
export const createBet = (data) => http.post(rootURL, data);
export const acceptBet = (betId) => http.put(`${rootURL}accept/${betId}`);
export const editBet = (betId, data) => http.put(`${rootURL}${betId}`, data);
