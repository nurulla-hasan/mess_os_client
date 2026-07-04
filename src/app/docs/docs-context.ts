export interface DocPageContext {
  title: string;
  description: string;
  keyTopics: string[];
}

/**
 * Extract a human-readable page name from any pathname.
 */
function getPageNameFromPath(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return "Home";

  // Skip known prefixes to get the meaningful page name
  const meaningful = segments.filter((s) => !["docs", "dashboard", "manager"].includes(s));

  if (meaningful.length === 0) {
    // It's a top-level route like /manager, /dashboard, /docs
    const top = segments[0];
    const names: Record<string, string> = {
      manager: "Manager Panel",
      dashboard: "Dashboard",
      docs: "Documentation",
      auth: "Authentication",
      profile: "My Profile",
    };
    return names[top] || top.charAt(0).toUpperCase() + top.slice(1);
  }

  // Convert kebab-case to Title Case
  return meaningful
    .map((s) =>
      s
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase())
    )
    .join(" > ");
}

/**
 * Detailed per-page context map for precise AI awareness.
 * Keys are path prefixes — the longest match wins.
 */
const pageSpecificContexts: Record<string, DocPageContext> = {
  // ── Manager Panel ──
  "/manager/dashboard": {
    title: "Manager Dashboard",
    description:
      "Main overview page for managers showing key metrics: total members, active members, today's meals, pending meal-off requests, recent expenses, upcoming market schedules, and recent notices.",
    keyTopics: [
      "Total vs active members count",
      "Today's meal overview",
      "Pending meal-off requests",
      "Recent expense summary",
      "Upcoming market schedules",
      "Recent notices and announcements",
      "Quick action shortcuts",
    ],
  },
  "/manager/menu-plan": {
    title: "Menu Plan Management",
    description:
      "Create, edit, and manage daily menu plans. Supports manual entry and AI-generated menu suggestions based on budget, member preferences, and current market prices.",
    keyTopics: [
      "Create new menu plans",
      "AI Generate suggested menus",
      "Breakfast, lunch, dinner categories",
      "Calendar and list view",
      "Edit or delete plans",
      "AI uses market prices for cost estimation",
    ],
  },
  "/manager/ai-shopping": {
    title: "AI Shopping List",
    description:
      "AI-powered shopping list generation from menu plans. Review, approve or reject AI-generated lists, then convert approved lists to market schedules. Uses market prices configured in Market Prices page for accurate budget estimation.",
    keyTopics: [
      "Generate shopping list from menu",
      "AI uses market prices for budget estimation",
      "Review AI-suggested items with quantities",
      "Approve or reject lists",
      "Convert approved list to schedule",
      "Item quantities and categories",
      "Market prices affect AI budget planning",
    ],
  },
  "/manager/market-schedule": {
    title: "Market Schedule",
    description:
      "Create and manage schedules for going to the market/bazar. Assign members, set budgets, and track shopping status.",
    keyTopics: [
      "Create manual schedules",
      "Create from AI Shopping list",
      "Assign members to shopping duty",
      "Set estimated budget",
      "Track status: pending/completed/void",
    ],
  },
  "/manager/market-prices": {
    title: "Market Prices",
    description:
      "Manage market prices for all common bazar items. These prices are used by AI for budget planning when generating menu plans and shopping lists. Managers can add, edit, delete, bulk update, and reset prices to defaults.",
    keyTopics: [
      "View all market prices with category and unit",
      "Add new items with name (Bangla), price (BDT), unit, and category",
      "Edit prices inline in the table",
      "Bulk update all prices at once with Save All",
      "Delete individual items",
      "Reset to default prices (25 pre-configured Bangladeshi market items)",
      "Categories: Bazar, Meat/Fish, Vegetables, Dairy, Spices, Other",
      "Units: KG, লিটার, ডজন, আঁটি, হালি, টুকরা, পিস",
      "Prices are used by AI to estimate shopping budgets",
      "Only managers can edit; members can view prices",
    ],
  },
  "/manager/expenses": {
    title: "Expense Tracking",
    description:
      "Track all mess expenses by category. Add, edit, filter expenses and view monthly totals.",
    keyTopics: [
      "Add new expense with receipt",
      "Filter by category and date",
      "Monthly expense summary",
      "Link expenses to schedules",
      "Edit or delete expenses",
    ],
  },
  "/manager/members": {
    title: "Member Management",
    description:
      "Manage mess members — view all members, add new ones, update roles, and manage active/inactive status.",
    keyTopics: [
      "View all members list",
      "Add new members",
      "Update roles (Manager/Member)",
      "Active vs inactive members",
      "Remove members",
    ],
  },
  "/manager/meal-off-requests": {
    title: "Meal Off Requests",
    description:
      "Review and manage member meal-off requests. Approve or reject requests that auto-adjust billing.",
    keyTopics: [
      "View pending requests",
      "Approve or reject requests",
      "View request history",
      "Auto billing adjustment",
    ],
  },
  "/manager/notices": {
    title: "Notice Board",
    description:
      "Post and manage announcements for all members. Supports markdown formatting and pinning.",
    keyTopics: [
      "Create new notice",
      "Edit or delete notices",
      "Pin important notices",
      "Markdown formatting",
    ],
  },
  "/manager/billing": {
    title: "Billing & Payments",
    description:
      "Generate monthly bills, track payment status, and manage payment gateway integration.",
    keyTopics: [
      "Generate monthly bills",
      "View paid/unpaid/overdue",
      "Bill breakdown details",
      "Payment gateway integration",
      "Send payment reminders",
    ],
  },
  "/manager/reports": {
    title: "Reports & Analytics",
    description:
      "Generate analytical reports with charts and graphs for expenses, meal participation, billing, and monthly comparisons.",
    keyTopics: [
      "Expense summary reports",
      "Meal participation analysis",
      "Billing report",
      "Monthly comparison",
      "Export reports",
    ],
  },
  "/manager/utility-bills": {
    title: "Utility Bills",
    description:
      "Track utility expenses (electricity, gas, water, internet) separate from meal costs. Shared among members in billing.",
    keyTopics: [
      "Add utility bills by type",
      "Mark bills as paid",
      "View all utility expenses",
      "Auto-share in billing",
    ],
  },

  // ── Member Panel ──
  "/dashboard": {
    title: "Member Dashboard",
    description:
      "Personal overview page for members showing today's menu, upcoming schedules, recent notices, expense summary, and meal-off status.",
    keyTopics: [
      "Today's meal menu",
      "Upcoming market schedules",
      "Recent notices",
      "Personal expense summary",
      "Meal-off request status",
    ],
  },
  "/dashboard/menu-plan": {
    title: "Menu Plan (Member View)",
    description:
      "View-only daily/weekly menu plans created by the manager. Browse meals by date in calendar or list format.",
    keyTopics: [
      "View breakfast, lunch, dinner plans",
      "Calendar and list view",
      "Read-only access",
    ],
  },
  "/dashboard/meal-off": {
    title: "Meal Off Request (Member)",
    description:
      "Submit meal-off requests with date range and reason. Track request status (pending/approved/rejected).",
    keyTopics: [
      "Submit new request",
      "Select date range",
      "View request history",
      "Check approval status",
    ],
  },
  "/dashboard/bills": {
    title: "My Bills (Member)",
    description:
      "View monthly bills, see breakdown, pay online via SSLCommerz payment gateway, and download receipts.",
    keyTopics: [
      "Monthly bill summary",
      "Bill breakdown",
      "Online payment",
      "Payment history",
      "Download receipt",
    ],
  },
  "/dashboard/notices": {
    title: "Notices (Member View)",
    description:
      "Read all notices and announcements posted by the manager, sorted by newest first.",
    keyTopics: [
      "View all notices",
      "Read markdown content",
      "Newest first sorting",
    ],
  },

  // ── Profile ──
  "/profile": {
    title: "My Profile",
    description:
      "Manage personal profile information, edit name and contact details, change password, and view account settings.",
    keyTopics: [
      "Edit personal info",
      "Change password",
      "Account settings",
    ],
  },

  // ── Auth ──
  "/auth/login": {
    title: "Login",
    description: "Login page for Mess OS. Users can sign in with their credentials to access the platform.",
    keyTopics: ["Login with credentials", "Access recovery"],
  },
  "/auth/register": {
    title: "Registration",
    description: "Create a new account to join or manage a mess on the Mess OS platform.",
    keyTopics: ["Create new account", "Join existing mess"],
  },
};

// ── Category fallbacks ──

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
    "Complete guide for mess managers covering all administrative features including menu planning, AI shopping list generation, expense tracking, member management, market schedule creation, market prices management, meal-off request management, notices, billing and payments, reports, and utility bills.",
  keyTopics: [
    "Dashboard and analytics overview",
    "Menu plan creation and AI-generated suggestions",
    "AI shopping list generation and approval workflow",
    "Market schedule creation with member assignment",
    "Market prices management for AI budget planning",
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

/**
 * Resolve the best context + page name for a given pathname.
 * Returns the most specific page context and a human-readable page title.
 */
export function getContextForPath(pathname: string): {
  context: DocPageContext | undefined;
  pageTitle: string;
} {
  const normalized = pathname.endsWith("/") && pathname.length > 1
    ? pathname.slice(0, -1)
    : pathname;

  // 1. Try exact match in page-specific contexts
  if (pageSpecificContexts[normalized]) {
    return { context: pageSpecificContexts[normalized], pageTitle: pageSpecificContexts[normalized].title };
  }

  // 2. Try prefix match (longest first)
  const prefixes = Object.keys(pageSpecificContexts).sort((a, b) => b.length - a.length);
  for (const prefix of prefixes) {
    if (normalized.startsWith(prefix)) {
      return { context: pageSpecificContexts[prefix], pageTitle: pageSpecificContexts[prefix].title };
    }
  }

  // 3. Fallback to category contexts
  if (normalized.startsWith("/manager")) {
    return { context: managerContext, pageTitle: getPageNameFromPath(normalized) };
  }
  if (normalized.startsWith("/dashboard")) {
    return { context: userContext, pageTitle: getPageNameFromPath(normalized) };
  }
  if (normalized.startsWith("/docs")) {
    return { context: overviewContext, pageTitle: getPageNameFromPath(normalized) };
  }

  // 4. Generic fallback — no specific context
  return { context: undefined, pageTitle: getPageNameFromPath(normalized) };
}
