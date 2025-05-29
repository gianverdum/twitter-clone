import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createComment } from "@/api/comments";
import { useAuth } from "@/auth/useAuth";
import { useState } from "react";

type Props = {
  postId: string;
  parentId?: string;
  onCommentCreated: () => void;
};

type CommentFormInputs = {
  comment: string;
};

export function CommentForm({ postId, parentId, onCommentCreated }: Props) {
  const { user } = useAuth();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CommentFormInputs>();
  const [apiError, setApiError] = useState("");

  const onSubmit = async (data: CommentFormInputs) => {
    if (!user) return;

    try {
      await createComment(data.comment, postId, user.id, parentId ?? null)
      reset();
      onCommentCreated()
    } catch (err: any) {
      const msg = err?.response?.data?.message;
      setApiError(Array.isArray(msg) ? msg.join("\n") : "Failed to create comment");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-2">
      <Input
        placeholder="Write a comment..."
        {...register("comment", { required: "Comment is required" })}
      />
      {errors.comment && <p className="text-red-500 text-sm">{errors.comment.message}</p>}
      {apiError && <p className="text-red-500 text-sm whitespace-pre-line">{apiError}</p>}
      <Button type="submit" className="self-end">Reply</Button>
    </form>
  );
}