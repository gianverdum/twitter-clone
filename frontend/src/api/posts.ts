import { api } from "./api"
import type { Post } from "@/types/post";

export const createPost = (title: string, content: string, authorId: number) => {
  return api.post("/posts", { title, content, authorId })
}

export const getPosts = () => {
  return api.get("/posts")
}

export async function getPostById(postId: string): Promise<Post> {
  const response = await api.get<Post>(`/posts/${postId}`);
  return response.data;
}