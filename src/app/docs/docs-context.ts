export interface DocPageContext {
  title: string;
  description: string;
  keyTopics: string[];
}

export const overviewContext: DocPageContext = {
  title: "Overview",
  description:
    "Introduction to Mess OS platform, its purpose, and core features overview. Covers the basic concepts of automated mess management.",
  keyTopics: [
    "What is Mess OS",
    "Platform overview and architecture",
    "Getting started guide",
    "User roles: Manager vs Member",
  ],
};

export const managerContext: DocPageContext = {
  title: "Manager Complete Guide",
  description:
    "Complete guide for mess managers covering all administrative features including menu planning, AI shopping list generation, expense tracking, member management, market schedule creation, meal-off request management, notices, billing and payments, reports, and utility bills.",
  keyTopics: [
    "Dashboard and analytics overview",
    "Menu plan creation and AI-generated suggestions",
    "AI shopping list generation and approval workflow",
    "Market schedule creation with member assignment",
    "Daily and monthly expense tracking",
    "Member management and meal status",
    "Meal-off request approval workflow",
    "Notice board announcements",
    "Monthly billing and payment management",
    "Reports and data analytics",
    "Utility bill tracking",
  ],
};

export const userContext: DocPageContext = {
  title: "Member Complete Guide",
  description:
    "Guide for mess members covering personal features like viewing menu plans, submitting meal-off requests, making payments through the gateway, viewing personal expenses, and managing their profile.",
  keyTopics: [
    "Viewing daily and weekly menu plans",
    "Submitting meal-off requests",
    "Making payments via payment gateway",
    "Viewing personal expense history",
    "Profile and account settings",
    "Reading notices and announcements",
  ],
};
