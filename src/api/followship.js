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

// * 追蹤特定使用者
export async function followUser(id) {
  try {
    const res = await axiosInstance.post(`${baseURL}/followships`, { id });
    return res.data;
  } catch (error) {
    console.error('[Follow User failed]: ', error);
  }
}

// * 取消追蹤特定使用者
export async function unfollowUser(id) {
  try {
    const res = await axiosInstance.delete(`${baseURL}/followships/${id}`);
    return res.data;
  } catch (error) {
    console.error('[Unfollow User failed]: ', error);
  }
}
