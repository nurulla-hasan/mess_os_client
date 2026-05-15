import { IMemberParticipation } from "./member.type";

export type ComplaintStatus = "open" | "in_progress" | "resolved" | "rejected";

export interface IComplaint {
  _id: string;
  messId: string;
  messMemberId: {
    _id: string;
    messRole: string;
    status: string;
    participation: IMemberParticipation;
    user: {
      _id: string;
      fullName: string;
      email: string;
      phone: string;
      avatar: string;
    };
  };
  title: string;
  description: string;
  status: ComplaintStatus;
  resolvedNote?: string;
  createdAt: string;
  updatedAt: string;
}
