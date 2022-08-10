export type MediaType = "blog" | "music" | "image" | "video";

export type NewBlogInput = {
  title: string;
  tags: string[];
  cat: string;
  mediaType: MediaType;
  mediaSources: string;
  isTech: boolean;
};

export type Blog = {
  _id: string;
  title: string;
  content: string;
  cat: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  public: Boolean;
  isTech: Boolean;
  mediaType: MediaType;
  mediaSources: string[];
};
