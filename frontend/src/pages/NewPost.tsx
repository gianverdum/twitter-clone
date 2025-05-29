import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createPost } from "@/api/posts";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/auth/useAuth";
import { useState } from "react";

type PostFormInputs = {
  title: string;
  content: string;
};

export default function NewPost() {
  const { register, handleSubmit, formState: { errors } } = useForm<PostFormInputs>();
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  const onSubmit = async (data: PostFormInputs) => {
    try {
      await createPost(data.title, data.content, user!.id);
      navigate("/feed");
    } catch (err: any) {
      const msg = err?.response?.data?.message;
      setApiError(Array.isArray(msg) ? msg.join("\n") : "Error creating post");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          placeholder="Post title"
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}

        <Input
          placeholder="Type your post content here..."
          {...register("content", { required: "Content is required" })}
        />
        {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}

        {apiError && <div className="text-red-500 text-sm whitespace-pre-line">{apiError}</div>}

        <Button type="submit">Publish</Button>
      </form>
    </div>
  );
}