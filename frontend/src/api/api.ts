import axios from "axios"

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
    console.log("🚀 Attaching token to request:", config.headers.Authorization)
  } else {
    console.warn("⚠️ No token found in localStorage")
  }
  return config
})
