import { useEffect, useState } from "react"
import { getPosts } from "@/api/posts"
import PostCard from "@/components/PostCard"
import type { Post } from "@/types/post"


export default function Feed() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    getPosts().then((res) => {
      setPosts(res.data as Post[])
    })
  }, [])

  return (
    <div className="max-w-xl mx-auto mt-8 space-y-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
