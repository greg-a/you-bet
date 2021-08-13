import http from './http-service';

const rootURL = '/api/counters/';

export const createCounterOffer = (data) => http.post(rootURL, data);
