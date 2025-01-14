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
