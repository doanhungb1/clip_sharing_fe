import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3001/shared_clips/';

class SharedClipService {
  getAll(page, per) {
    return axios.get(API_URL + `?page=${page}&per=${per}`, { headers: authHeader() });
  }

  get(id) {
    return axios.get(API_URL + `${id}`, { headers: authHeader() });
  }

  create(data) {
    return axios.post(API_URL, data, { headers: authHeader() });
  }

}

export default new SharedClipService();