export type Post = {
  id: string
  title: string
  content: string
  createdAt: string
  author: {
    name: string
  }
  comments: Comment[]
}

export type Comment = {
  id: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    name: string;
  };
  parent?: {
    id: string;
    author: {
      id: string;
      name: string;
    }
  }
}