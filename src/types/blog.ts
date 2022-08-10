export type NewBlogInput = {
  title: string;
  tags: string[];
  cat: string;
  mediaType: "blog" | "music" | "image" | "video";
  mediaSources: string;
  isTech: boolean;
};
