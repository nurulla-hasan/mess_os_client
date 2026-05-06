import { MenuPlan } from "./columns";

export const mockMenuPlans: MenuPlan[] = [
  {
    id: "mp1",
    date: "2024-05-06T00:00:00Z",
    breakfast: "Paratha, Fried Egg, Daal",
    lunch: "Rice, Beef Curry, Mixed Veg, Daal",
    dinner: "Rice, Fish Fry, Spinach, Daal",
    isAiGenerated: true,
    status: "published",
  },
  {
    id: "mp2",
    date: "2024-05-07T00:00:00Z",
    breakfast: "Khichuri, Omelette",
    lunch: "Rice, Chicken Jhal Fry, Potato Vorta",
    dinner: "Rice, Egg Curry, Cabbage",
    isAiGenerated: false,
    status: "draft",
  },
  {
    id: "mp3",
    date: "2024-05-05T00:00:00Z",
    breakfast: "Roti, Vegetable Sabji",
    lunch: "Rice, Mutton Rezala, Cucumber Salad",
    dinner: "Rice, Scrambled Egg, Lentils",
    isAiGenerated: true,
    status: "archived",
  },
];
