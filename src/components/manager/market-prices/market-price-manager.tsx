"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Trash2,
  Save,
  ShoppingCart,
  DollarSign,
  RotateCcw,
} from "lucide-react";
import {
  upsertMarketPrice,
  bulkUpsertMarketPrices,
  resetMarketPrices,
  deleteMarketPrice,
} from "@/services/market-price.service";
import type { IMarketPrice, IMarketPriceFormData, MarketPriceCategory } from "@/types/market-price.type";
import { SuccessToast, ErrorToast } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface MarketPriceManagerProps {
  messId: string;
  initialPrices: IMarketPrice[];
}

const CATEGORY_LABELS: Record<MarketPriceCategory, string> = {
  bazar: "Bazar",
  meat: "Meat/Fish",
  vegetables: "Vegetables",
  dairy: "Dairy",
  spices: "Spices",
  other: "Other",
};

const CATEGORY_COLORS: Record<MarketPriceCategory, string> = {
  bazar: "bg-amber-100 text-amber-800 hover:bg-amber-200",
  meat: "bg-red-100 text-red-800 hover:bg-red-200",
  vegetables: "bg-green-100 text-green-800 hover:bg-green-200",
  dairy: "bg-blue-100 text-blue-800 hover:bg-blue-200",
  spices: "bg-purple-100 text-purple-800 hover:bg-purple-200",
  other: "bg-gray-100 text-gray-800 hover:bg-gray-200",
};

export function MarketPriceManager({ messId, initialPrices }: MarketPriceManagerProps) {
  const router = useRouter();
  const [prices, setPrices] = useState<IMarketPrice[]>(initialPrices);
  const [loading, setLoading] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [newItem, setNewItem] = useState<IMarketPriceFormData>({
    itemName: "",
    price: 0,
    unit: "KG",
    category: "other",
  });

  const handlePriceChange = (itemName: string, newPrice: number) => {
    setPrices((prev) =>
      prev.map((p) => (p.itemName === itemName ? { ...p, price: newPrice } : p))
    );
  };

  const handleCategoryChange = (itemName: string, newCategory: MarketPriceCategory) => {
    setPrices((prev) =>
      prev.map((p) => (p.itemName === itemName ? { ...p, category: newCategory } : p))
    );
  };

  const handleUnitChange = (itemName: string, newUnit: string) => {
    setPrices((prev) =>
      prev.map((p) => (p.itemName === itemName ? { ...p, unit: newUnit } : p))
    );
  };

  const saveAllChanges = async () => {
    setLoading(true);
    const items = prices.map((p) => ({
      itemName: p.itemName,
      price: p.price,
      unit: p.unit,
      category: p.category as MarketPriceCategory,
    }));
    const res = await bulkUpsertMarketPrices(messId, items);
    if (res.success) {
      SuccessToast("All market prices updated successfully");
      router.refresh();
    } else {
      ErrorToast(res.message);
    }
    setLoading(false);
  };

  const handleReset = async () => {
    setResetting(true);
    const res = await resetMarketPrices(messId);
    if (res.success) {
      setPrices(res.data);
      SuccessToast("Market prices reset to defaults");
      router.refresh();
    } else {
      ErrorToast(res.message);
    }
    setResetting(false);
  };

  const handleDelete = async (itemName: string) => {
    const res = await deleteMarketPrice(messId, itemName);
    if (res.success) {
      setPrices((prev) => prev.filter((p) => p.itemName !== itemName));
      SuccessToast(`"${itemName}" deleted`);
      router.refresh();
    } else {
      ErrorToast(res.message);
    }
  };

  const handleAddItem = async () => {
    if (!newItem.itemName.trim()) {
      ErrorToast("Item name is required");
      return;
    }
    if (newItem.price <= 0) {
      ErrorToast("Price must be greater than 0");
      return;
    }
    setLoading(true);
    const res = await upsertMarketPrice(messId, newItem);
    if (res.success) {
      setPrices((prev) => [...prev, res.data]);
      setNewItem({ itemName: "", price: 0, unit: "KG", category: "other" });
      SuccessToast(`"${newItem.itemName}" added`);
      router.refresh();
    } else {
      ErrorToast(res.message);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Stats Card */}
      <Card className="shadow-sm border-primary/10">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            <ShoppingCart className="h-4 w-4 text-primary" />
            Price Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 text-sm">
            <span className="text-muted-foreground">
              Total items: <strong className="text-foreground">{prices.length}</strong>
            </span>
            <span className="text-muted-foreground">
              Cheapest:{" "}
              <strong className="text-green-600">
                {prices.length > 0
                  ? `${prices.reduce((min, p) => (p.price < min.price ? p : min), prices[0]).itemName} (${prices.reduce((min, p) => (p.price < min.price ? p : min), prices[0]).price} BDT)`
                  : "N/A"}
              </strong>
            </span>
            <span className="text-muted-foreground">
              Most expensive:{" "}
              <strong className="text-red-600">
                {prices.length > 0
                  ? `${prices.reduce((max, p) => (p.price > max.price ? p : max), prices[0]).itemName} (${prices.reduce((max, p) => (p.price > max.price ? p : max), prices[0]).price} BDT)`
                  : "N/A"}
              </strong>
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Add New Item */}
      <Card className="shadow-sm border-primary/10">
        <CardHeader>
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            <Plus className="h-4 w-4 text-primary" />
            Add New Item
          </CardTitle>
          <CardDescription>Add a new item to the market price list.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-end gap-3">
            <div className="space-y-1 flex-1 min-w-45">
              <Label htmlFor="new-name">Item Name (Bangla)</Label>
              <Input
                id="new-name"
                placeholder="e.g. মুরগি, চাল, ডাল"
                value={newItem.itemName}
                onChange={(e) => setNewItem({ ...newItem, itemName: e.target.value })}
              />
            </div>
            <div className="space-y-1 w-24">
              <Label htmlFor="new-price">Price (BDT)</Label>
              <Input
                id="new-price"
                type="number"
                min={0}
                placeholder="0"
                value={newItem.price || ""}
                onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-1 w-24">
              <Label htmlFor="new-unit">Unit</Label>
              <Select
                value={newItem.unit}
                onValueChange={(val) => setNewItem({ ...newItem, unit: val })}
              >
                <SelectTrigger id="new-unit" className="w-24">
                  <SelectValue placeholder="Unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="KG">KG</SelectItem>
                  <SelectItem value="লিটার">লিটার</SelectItem>
                  <SelectItem value="ডজন">ডজন</SelectItem>
                  <SelectItem value="আঁটি">আঁটি</SelectItem>
                  <SelectItem value="হালি">হালি</SelectItem>
                  <SelectItem value="টুকরা">টুকরা</SelectItem>
                  <SelectItem value="পিস">পিস</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1 w-32">
              <Label htmlFor="new-category">Category</Label>
              <Select
                value={newItem.category}
                onValueChange={(val: MarketPriceCategory) =>
                  setNewItem({ ...newItem, category: val })
                }
              >
                <SelectTrigger id="new-category" className="w-32">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleAddItem} disabled={loading} className="mb-0.5">
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Price Table */}
      <Card className="shadow-sm border-primary/10">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-primary" />
              Price List
            </CardTitle>
            <CardDescription>
              Edit prices inline and save all changes at once. These are used by AI for budget planning.
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              disabled={resetting}
            >
              <RotateCcw className={`h-4 w-4 mr-1 ${resetting ? "animate-spin" : ""}`} />
              Reset to Defaults
            </Button>
            <Button size="sm" onClick={saveAllChanges} disabled={loading}>
              <Save className="h-4 w-4 mr-1" />
              Save All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {prices.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <ShoppingCart className="h-12 w-12 mx-auto mb-3 opacity-20" />
              <p>No market prices configured yet.</p>
              <p className="text-sm">Click &quot;Reset to Defaults&quot; to load default prices or add items manually.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-50">Item Name</TableHead>
                    <TableHead className="w-30">Price (BDT)</TableHead>
                    <TableHead className="w-25">Unit</TableHead>
                    <TableHead className="w-32.5">Category</TableHead>
                    <TableHead className="w-15 text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {prices.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell className="font-medium">{item.itemName}</TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          min={0}
                          value={item.price}
                          onChange={(e) => handlePriceChange(item.itemName, Number(e.target.value))}
                          className="h-8 w-24"
                        />
                      </TableCell>
                      <TableCell>
                        <Select
                          value={item.unit}
                          onValueChange={(val) => handleUnitChange(item.itemName, val)}
                        >
                          <SelectTrigger className="h-8 w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="KG">KG</SelectItem>
                            <SelectItem value="লিটার">লিটার</SelectItem>
                            <SelectItem value="ডজন">ডজন</SelectItem>
                            <SelectItem value="আঁটি">আঁটি</SelectItem>
                            <SelectItem value="হালি">হালি</SelectItem>
                            <SelectItem value="টুকরা">টুকরা</SelectItem>
                            <SelectItem value="পিস">পিস</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={item.category}
                          onValueChange={(val: MarketPriceCategory) =>
                            handleCategoryChange(item.itemName, val)
                          }
                        >
                          <SelectTrigger className="h-8 w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                              <SelectItem key={key} value={key}>
                                <Badge
                                  variant="secondary"
                                  className={`${CATEGORY_COLORS[key as MarketPriceCategory]} text-xs`}
                                >
                                  {label}
                                </Badge>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => handleDelete(item.itemName)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
