export interface INotice {
  _id: string;
  messId: string;
  title: string;
  content: string;
  isPinned: boolean;
  status: "active" | "archived";
  createdBy: {
    _id: string;
    fullName: string;
    email: string;
    phone: string;
    avatar: string;
  };
  createdAt: string;
  updatedAt: string;
}
export interface INoticeUpdatePayload {
  title?: string;
  content?: string;
  isPinned?: boolean;
  status?: "active" | "archived";
}
