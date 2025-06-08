export interface BlogCardProps {
  id: string;
  imageUrl: string;
  title: string;
  categoryName: string;
  author: string;
  date: string;
  showIndicator?: boolean;
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
}

