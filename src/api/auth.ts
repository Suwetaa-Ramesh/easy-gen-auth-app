import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 

export const signUp = async (data: { name: string; email: string; password: string }) => {
  return axios.post(`${API_BASE_URL}/signup`, data);
};

export const signIn = async (data: { email: string; password: string }) => {
  return axios.post(`${API_BASE_URL}/signin`, data, { withCredentials: true });
};

export const getUser = async () => {
  return axios.get(`${API_BASE_URL}/user`, { withCredentials: true });
};

export const logout = async () => {
  return axios.post(`${API_BASE_URL}/logout`, {}, { withCredentials: true });
};
