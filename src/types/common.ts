export interface PathParams {
  params: {
    parent?: string;
    sub?: string;
  };
}
export interface TOCItem {
  depth: number;
  slug: string;
  text: string;
  children?: TOCItem[];
}

export type CollectionType = "life" | "log" | "note" | "tech";
