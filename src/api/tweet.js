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

// * 取得所有推文
export async function getTweets() {
  try {
    const res = await axiosInstance.get(`${baseURL}/tweets`);
    return res.data;
  } catch (error) {
    console.error('[Get Tweets failed]: ', error);
  }
}

// * 取得單一推文
export async function getSingleTweet(id) {
  try {
    const res = await axiosInstance.get(`${baseURL}/tweets/${id}`);
    return res.data;
  } catch (error) {
    console.error('[Get Single Tweet failed]: ', error);
  }
}

// * 新增推文
export async function addTweet(payload) {
  const { description } = payload;
  try {
    const res = await axiosInstance.post(`${baseURL}/tweets`, { description });
    return res.data;
  } catch (error) {
    console.error('[Create Tweets failed]: ', error);
    return error.response.data.status;
  }
}

// * 取得特定貼文的所有回覆
export async function getReplies(id) {
  try {
    const res = await axiosInstance.get(`${baseURL}/tweets/${id}/replies`);
    return res.data;
  } catch (error) {
    console.error('[Get Replies failed]: ', error);
  }
}

// * 在特定貼文新增回覆
export async function addReply(payload) {
  const { id, comment } = payload;
  try {
    const res = await axiosInstance.post(`${baseURL}/tweets/${id}/replies`, {
      comment,
    });
    return res.data;
  } catch (error) {
    console.error('[Create Reply failed]: ', error);
  }
}
