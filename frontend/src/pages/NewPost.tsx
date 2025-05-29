import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { createPost } from "@/api/posts"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/auth/useAuth"

export default function NewPost() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const { user } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("📝 Content to post:", content)
    console.log("👤 Author ID:", user?.id)

    try {
      await createPost(title, content, user!.id)
      navigate("/feed")
    } catch (err: any) {
      const msg = err?.response?.data?.message
      setError(Array.isArray(msg) ? msg.join("\n") : "Error creating post")
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Post title"
          value={title}
          name="title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          placeholder="Type your post content here..."
          value={content}
          name="content"
          onChange={(e) => setContent(e.target.value)}
        />
        {error && <div className="text-red-500 text-sm whitespace-pre-line">{error}</div>}
        <Button type="submit">Publish</Button>
      </form>
    </div>
  )
}