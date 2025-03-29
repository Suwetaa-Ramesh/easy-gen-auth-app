import axios from "axios";
import axiosInstance from "./axiosInstance";

const API_BASE_URL = 'http://localhost:3000'; 

export const signUp = async (data: { name: string; email: string; password: string }) => {
  return axios.post(`${API_BASE_URL}/auth/signup`, data);
};

export const signIn = async (data: { email: string; password: string }) => {
  return axios.post(`${API_BASE_URL}/auth/signin`, data, { withCredentials: true });
};

export const getUser = async () => {
  return axiosInstance.get(`users`);
};

export const loggingOut = async () => {
  return axiosInstance.post(`/auth/logout`, {});
};
