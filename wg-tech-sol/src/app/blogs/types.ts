export type BlogItem = {
  _id: string;
  title: string;
  subTitle: string;
  shortDescription: string;
  longDescription: string;
  image: string;
  type: string;
  postedOn: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type BlogListResponse = {
  status: number;
  data: {
    data: {
      blogs: BlogItem[];
    };
  };
};

export type BlogDetailResponse = {
  status: number;
  data: {
    data: {
      blog: BlogItem;
    };
  };
};

export interface BlogCardProps {
  blogData: BlogItem[];
  basePath?: string;
}
