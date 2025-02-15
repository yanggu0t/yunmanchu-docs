export type AnnouncementRequest = {
  visible?: boolean;
  announcement: string;
};

export type AnnouncementResponse = {
  announcement: string;
  createdAt: string;
  updatedAt: string;
  visible: boolean;
  __v: number;
  _id: string;
};
