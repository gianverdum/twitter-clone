import type { Post } from "@/types/post"

export default function PostCard({ post }: { post: Post }) {
  return (
    <div className="border rounded p-4 space-y-2">
      <p className="text-sm text-gray-700">{post.content}</p>
      <p className="text-xs text-muted-foreground">Postado por {post.author.name}</p>
    </div>
  )
}