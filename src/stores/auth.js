import { defineStore } from "pinia";
import api from "../config/axios-config";

export const useAuthStore = defineStore("auth", () => {
  const apiUrl = "http://127.0.0.1:8000/api/v1";
  const login = async (email, password) => {
    try {
      const response = await api.post(`${apiUrl}/login`, {
        email,
        password,
      });
      const { token } = response.data.data;
      localStorage.setItem("token", token);
      return response;
    } catch (error) {
      return error;
    }
  };
  return { login };
});
