import { useState, useMemo } from "react";
import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";
import { CommentForm } from "./CommentForm";
import type { Comment } from "@/types/post";

type Props = {
  comments: Comment[];
  postId: string;
  depth?: number;
};

const COMMENTS_PER_PAGE = 5;

export function CommentList({ comments, postId, depth = 0 }: Props) {
  const [visibleCount, setVisibleCount] = useState(1);
  const [activeReply, setActiveReply] = useState<string | null>(null);

  const sortedComments = useMemo(() => {
    return [...comments].sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  }, [comments]);

  const visibleComments = sortedComments.slice(0, visibleCount);

  const showMore = () => {
    setVisibleCount((prev) => Math.min(prev + COMMENTS_PER_PAGE, comments.length));
  };

  return (
    <div
      className={`mt-4 space-y-4 ${
        depth > 0 ? "pl-4 border-l-2 border-gray-200" : ""
      }`}
    >
      {visibleComments.map((c) => (
        <div key={c.id} className="border rounded p-2 bg-white">
          {c.parent?.author?.name && (
            <p className="text-xs text-gray-600 mb-1">
              Replying to <strong>{c.parent.author.name}</strong>
            </p>
          )}

          <p className="text-sm text-gray-800">
            <strong>{c.author.name}</strong>: {c.comment}
          </p>

          <p className="text-xs text-gray-500">
            {formatDistanceToNow(new Date(c.createdAt), {
              addSuffix: true,
              locale: enUS,
            })}
          </p>

          <button
            onClick={() => setActiveReply((prev) => (prev === c.id ? null : c.id))}
            className="text-xs text-blue-600 hover:underline mt-1"
          >
            Reply
          </button>

          {activeReply === c.id && (
            <div className="mt-2 pl-4">
              <CommentForm
                postId={postId}
                parentId={c.id}
                onCommentCreated={() => {
                  setActiveReply(null);
                }}
              />
            </div>
          )}

          {depth < 2 && (c.replies?.length ?? 0) > 0 && (
            <CommentList
              comments={c.replies ?? []}
              postId={postId}
              depth={depth + 1}
            />
          )}
        </div>
      ))}

      <div className="space-y-1 mt-2">
        {visibleCount < comments.length && (
          <button
            onClick={showMore}
            className="text-blue-600 text-sm hover:underline"
          >
            {comments.length - visibleCount} more message
            {comments.length - visibleCount > 1 ? "s" : ""}
          </button>
        )}

        {visibleCount > 1 && (
          <button
            onClick={() => setVisibleCount(1)}
            className="text-blue-600 text-sm hover:underline block"
          >
            Show less
          </button>
        )}
      </div>
    </div>
  );
}