import { api } from "./api"

export const createPost = (title: string, content: string, authorId: number) => {
  return api.post("/posts", { title, content, authorId })
}

export const getPosts = () => {
  return api.get("/posts")
}