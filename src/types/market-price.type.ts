export interface IMarketPrice {
  _id: string;
  messId: string;
  itemName: string;
  price: number;
  unit: string;
  category: MarketPriceCategory;
}

export type MarketPriceCategory = 'bazar' | 'meat' | 'vegetables' | 'dairy' | 'spices' | 'other';

export interface IMarketPriceFormData {
  itemName: string;
  price: number;
  unit: string;
  category: MarketPriceCategory;
}
