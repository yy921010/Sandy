export type PostMetadata = {
  title: string;
  description: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
  comments?: boolean;
  draft?: boolean;
  year: number;
};

export type Post = {
  metadata: PostMetadata;
  slug: string;
  content: string;
};
