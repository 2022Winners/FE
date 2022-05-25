import axios from "axios";
import { config } from "vue/types/umd";

//Instance 생성
function createInstance() {
    return axios.create({});
}

export const api = createInstance();
api.interceptors.request.use(async function (config) {
    // Do something before request is sent
        config.headers["token"] = sessionStorage.getItem('access-token');
        return config;
    }, function(error){
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
let isTokenRefreshing = false;
let refreshSubscribers = [];

const onTokenRefreshed = (accessToken) => {
  refreshSubscribers.map((callback) => callback(accessToken));
};

const addRefreshSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;
    const originalRequest = config;
    if (status === 401) {
      if (!isTokenRefreshing) {
        // isTokenRefreshing이 false인 경우에만 token refresh 요청
        isTokenRefreshing = true;
        const refreshToken = await AsyncStorage.getItem("refreshToken");
        const { data } = await axios.post(
          `http://localhost:3000/refresh/token`, // token refresh api
          {
            refreshToken,
          }
        );
        // 새로운 토큰 저장
        const {
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        } = data;
        await AsyncStorage.multiSet([
          ["accessToken", newAccessToken],
          ["refreshToken", newRefreshToken],
        ]);
        isTokenRefreshing = false;
        axios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
        // 새로운 토큰으로 지연되었던 요청 진행
        onTokenRefreshed(newAccessToken);
      }
      // token이 재발급 되는 동안의 요청은 refreshSubscribers에 저장
      const retryOriginalRequest = new Promise((resolve) => {
        addRefreshSubscriber((accessToken) => {
          originalRequest.headers.Authorization = "Bearer " + accessToken;
          resolve(axios(originalRequest));
        });
      });
      return retryOriginalRequest;
    }
    return Promise.reject(error);
  }
);