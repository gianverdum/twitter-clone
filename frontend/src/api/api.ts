import axios from "axios"

export const api = axios.create({
  baseURL: "http://localhost:3000", // ou URL do seu backend no Docker
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    if (config.headers) {
        config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})
