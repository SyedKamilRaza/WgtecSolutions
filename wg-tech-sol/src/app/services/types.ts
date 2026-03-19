export type SubService = {
  _id: string;
  title: string;
  description?: string;
  image?: string;
};

export type OurServiceType = {
  _id: string;
  title?: string;
  description?: string;
  image?: string;
  subServices?: SubService[];
};

