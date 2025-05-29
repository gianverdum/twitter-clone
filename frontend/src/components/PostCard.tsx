import type { Post } from "@/types/post"
import { formatDistanceToNow } from "date-fns"
import { enUS } from "date-fns/locale"

export default function PostCard({ post }: { post: Post }) {
  return (
    <div className="border rounded-xl p-4 bg-white shadow-sm space-y-2">
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
  )
}