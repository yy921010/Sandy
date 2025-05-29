export type PostMetadata = {
  title: string;
  description: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
  comments?: boolean;
  draft?: boolean;
  year?: number;
  language?: string;
  toc?: boolean;
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
