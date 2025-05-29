import axios from "axios"
import { logoutAndRedirect } from "@/auth/logoutHandler"

export const api = axios.create({
  baseURL: "http://localhost:3000",
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${String(token)}`,
    }
  }

  return config
})

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      logoutAndRedirect
    }
    return Promise.reject(error)
  }
)