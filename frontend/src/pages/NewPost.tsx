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
      console.log("✅ Post created successfully")
      navigate("/feed")
    } catch (err: any) {
      console.error("❌ Error creating post:", err)
      const msg = err?.response?.data?.message
      setError(Array.isArray(msg) ? msg.join("\n") : "Erro ao criar post")
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Título do post"
          value={title}
          name="title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          placeholder="O que está acontecendo?"
          value={content}
          name="content"
          onChange={(e) => setContent(e.target.value)}
        />
        {error && <div className="text-red-500 text-sm whitespace-pre-line">{error}</div>}
        <Button type="submit">Publicar</Button>
      </form>
    </div>
  )
}