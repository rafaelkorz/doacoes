import axios from 'axios';
import jwt_decode from "jwt-decode";

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
})

export const apiJWT = axios.create({
  baseURL: process.env.REACT_APP_API_URL
})

const refreshToken = async () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'))

    const res = await api.post("/api/authentication/refresh", { token: user.refreshToken });

    user.accessToken = res.data.accessToken;
    user.refreshToken = res.data.refreshToken;

    localStorage.setItem('user' , JSON.stringify(user))
    
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

apiJWT.interceptors.request.use(
  async (config) => {
    const user = JSON.parse(localStorage.getItem('user'))

    config.headers["authorization"] = "Bearer " + user.accessToken;

    let currentDate = new Date();
    const decodedToken = jwt_decode(user.accessToken);
    
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      const data = await refreshToken();
      console.log(data)
      if (data?.accessToken) {
        config.headers["authorization"] = "Bearer " + data.accessToken;
      } else {
        localStorage.removeItem('user');
        window.location.href='/login'
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);