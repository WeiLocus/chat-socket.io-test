/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';

const baseURL = 'https://murmuring-plains-40389.herokuapp.com/api';

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error(error);
  }
);

// * 將特定推文加入喜歡
export async function likeTweet(id) {
  try {
    const res = await axiosInstance.post(`${baseURL}/tweets/${id}/like`);
    return res.data;
  } catch (error) {
    console.error('[Like Tweet failed]: ', error);
  }
}

// * 將特定推文移除喜歡
export async function unLikeTweet(id) {
  try {
    const res = await axiosInstance.post(`${baseURL}/tweets/${id}/unlike`);
    return res.data;
  } catch (error) {
    console.error('[Unlike Tweet failed]: ', error);
  }
}
