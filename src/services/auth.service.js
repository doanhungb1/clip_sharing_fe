import axios from "axios";
import authHeader from './auth-header';

const API_URL = "http://localhost:3001/users/";

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "sign_in", {
        user: { email, password }
      })
      .then(response => {
        if (response.headers.authorization) {
          localStorage.setItem("user", JSON.stringify(response.data));
          localStorage.setItem("jwt-token", response.headers.authorization);
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("jwt-token");
  }

  register( email, password) {
    return axios.post(API_URL, {
      user: { email, password }
    })
    .then(response => {
      if (response.headers.authorization) {
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("jwt-token", response.headers.authorization);
      }

      return response.data;
    });
    ;
  }

  getCurrentUser() {
    return axios.get(API_URL + 'current_user', { headers: authHeader() });
  }
}

export default new AuthService();