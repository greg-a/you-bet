import axios from 'axios';

axios.defaults.headers.common['Authorization'] = null;

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
  cancel: axios.CancelToken,
};
