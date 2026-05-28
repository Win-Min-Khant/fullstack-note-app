import axios from "axios";

const API_URL = import.meta.env.VITE_MODE === 'production' ? import.meta.env.VITE_API_URL : import.meta.env.VITE_LOCAL_API_URL;

export const registerUser = async (username: string, email: string, password: string) => {
  const { data } = await axios.post(`${API_URL}/users/register`, { username, email, password });
  return data;
};