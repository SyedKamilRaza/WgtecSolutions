export type EventImage = {
  name: string;
  url: string;
  _id: string;
};

export type EventVideo = {
  name: string;
  url: string;
  _id: string;
};

export type EventItem = {
  _id: string;
  title: string;
  subTitle: string;
  shortDescription: string;
  longDescription?: string;
  image: EventImage[];
  video: EventVideo[];
  eventDate?: string;
  location?: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
