/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';

const baseURL = 'https://murmuring-plains-40389.herokuapp.com/api';

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error(error);
  }
);

// * 後台取得所有貼文
export async function adminGetTweets() {
  try {
    const res = await axiosInstance.get(`${baseURL}/admin/tweets`);
    return res.data;
  } catch (error) {
    console.error('[Admin Get Tweets failed]: ', error);
  }
}

// * 刪除特定推文
export async function deleteTweet
(id) {
  try {
    const res = await axiosInstance.delete(`${baseURL}/admin/tweets/${id}`);
    const { data, status } = res;
    return { data, status };
  } catch (error) {
    console.error('[Admin Delete Tweet failed]: ', error);
  }
}

// * 後台的所有使用者資訊
export async function adminGetAllUsers() {
  try {
    const res = await axiosInstance.get(`${baseURL}/admin/users`);
    return res.data;
  } catch (error) {
    console.error('[Admin Delete Tweet failed]: ', error);
  }
}
