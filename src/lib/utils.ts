import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { format } from "date-fns";
import { toast } from "sonner";

// Success Toast
export const SuccessToast = (msg: string) => {
  toast.success(msg);
};

// Error Toast
export const ErrorToast = (msg: string) => {
  toast.error(msg);
};

// Warning Toast
export const WarningToast = (msg: string) => {
  toast.warning(msg);
};

// Info Toast
export const InfoToast = (msg: string) => {
  toast.info(msg);
};

// Get Initials
export const getInitials = (name: string) => {
  if (!name) return "NA";
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] || "N";
  const second = parts[1]?.[0] || parts[0]?.[1] || "A";
  return (first + second).toUpperCase();
};

// Format Date
export const formatDate = (dateString: string) => {
  if (!dateString) return "N/A";
  return format(new Date(dateString), "dd MMM yyyy");
};

// Time Ago
export const timeAgo = (createdAt: string) => {
  if (!createdAt) return "";
  const s = Math.floor((Date.now() - new Date(createdAt).getTime()) / 1000);
  if (s < 60) return "Just now";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
};

// Generate Slug
export const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special chars
    .replace(/[\s_-]+/g, "-") // Replace spaces/underscores with -
    .replace(/^-+|-+$/g, ""); // Always remove leading and trailing hyphens
};
