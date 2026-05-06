import { AiShoppingList } from "./columns";

export const mockAiLists: AiShoppingList[] = [
  {
    id: "ai1",
    menuPlanDate: "2024-05-07T00:00:00Z",
    targetMarketDate: "2024-05-07T00:00:00Z",
    itemCount: 15,
    status: "approved",
    estimatedBudget: 3500,
  },
  {
    id: "ai2",
    menuPlanDate: "2024-05-08T00:00:00Z",
    targetMarketDate: "2024-05-08T00:00:00Z",
    itemCount: 12,
    status: "draft",
    estimatedBudget: 2800,
  },
  {
    id: "ai3",
    menuPlanDate: "2024-05-06T00:00:00Z",
    targetMarketDate: "2024-05-06T00:00:00Z",
    itemCount: 10,
    status: "converted",
    estimatedBudget: 2500,
  },
];
