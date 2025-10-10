export interface BlogCardProps {
  id: string;
  imageUrl: string;
  title: string;
  categoryName: string;
  author: string;
  author_name: string;
  date: string;
  showIndicator?: boolean;
  categoryIcon?: React.ReactNode;

  tags: string[];
  content?: string;
  videoUrl?: string;
}

export interface Comment {
  id: any;
  author: string;
  date: string;
  content: string;
  isOwner?: boolean;
  avatarUrl?: string;
  replies?: Comment[];
  replyingTo?: string;
}

// app/lib/types.ts
export type CommentNew = {
  id: number;
  authorName: string;
  authorAvatarUrl: string;
  date: string;
  text: string;
  replyingTo?: string; // Optional: The name of the person being replied to
  replies?: CommentNew[]; // An array of nested comments (replies)
};
