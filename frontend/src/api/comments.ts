import { api } from "./api";

export async function createComment(
  comment: string,
  postId: string,
  authorId: string,
  parentId: string | null = null
) {
  console.log("🚀 Sending comment payload:", { comment, postId, authorId, parentId });
  
  const response = await api.post("/comments", {
    comment,
    postId,
    authorId,
    parentId
  });

  return response.data;
}