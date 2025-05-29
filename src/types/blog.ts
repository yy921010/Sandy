export type PostMetadata = {
  title: string;
  description: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
  comment?: boolean;
  draft?: boolean;
  year?: number;
  lang?: string;
  toc?: boolean;
  subtitle?: string;
};

export type Post = {
  metadata: PostMetadata;
  slug: string;
  content: string;
  headings?: Heading[];
};

export interface Heading {
  depth: number;
  slug: string;
  text: string;
  children?: Heading[];
}

export interface ArticleItemProps {
  article: Post;
  showDescription?: boolean;
}
