import http from './http-service';

const rootURL = '/api/bets/';

export const createBet = (data) => http.post(rootURL, data);
