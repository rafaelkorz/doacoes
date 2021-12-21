import axios from 'axios';
import jwt_decode from "jwt-decode";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
})

const RefreshToken = async () => {
  const user = JSON.parse(localStorage.getItem('user'))

  try {
    const res = await api.post("/refresh", { token: user.refreshToken });
    const data = {
      ...user,
      accessToken: res.data.accessToken,
      refreshToken: res.data.refreshToken,
    };

    localStorage.setItem('user' , JSON.stringify(data))
    
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

api.interceptors.request.use(
  async (config) => {
    const user = JSON.parse(localStorage.getItem('user'))
    let currentDate = new Date();
    if (config.url !== "/api/users/login") {
      const decodedToken = jwt_decode(user.accessToken);

      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        const data = await RefreshToken();
        config.headers["authorization"] = "Bearer " + data.accessToken;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
  

export default api;