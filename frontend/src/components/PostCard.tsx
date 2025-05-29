import { useState } from "react";
import type { Post } from "@/types/post"
import { formatDistanceToNow } from "date-fns"
import { enUS } from "date-fns/locale"
import { CommentList } from "./CommentList"
import { CommentForm } from "./CommentForm"
import { getPostById } from "@/api/posts"


export default function PostCard({ post }: { post: Post }) {
  const [comments, setComments] = useState(post.comments || [])

  const handleNewComment = async () => {
    const updatedPost = await getPostById(post.id)
    setComments(updatedPost.comments)
  }

  return (
    <div className="border rounded-xl p-4 bg-white shadow-sm space-y-4">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-gray-800">{post.title}</h2>
        <p className="text-gray-700">{post.content}</p>
        <div className="text-sm text-gray-500">
          Posted by {post.author.name} ·{" "}
          {formatDistanceToNow(new Date(post.createdAt), {
            addSuffix: true,
            locale: enUS,
          })}
        </div>
      </div>

      <CommentList comments={comments} postId={post.id} />

      <CommentForm postId={post.id} onCommentCreated={handleNewComment} />
    </div>
  )
}