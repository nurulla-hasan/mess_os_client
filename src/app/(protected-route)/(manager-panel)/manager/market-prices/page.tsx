import DashboardPageHeader from "@/components/ui/custom/dashboard-page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { getActiveMessIdFromCookies } from "@/services/auth.service";
import { getMarketPrices } from "@/services/market-price.service";
import { MarketPriceManager } from "@/components/manager/market-prices/market-price-manager";

export default async function ManagerMarketPricesPage() {
  const messId = await getActiveMessIdFromCookies();

  if (!messId) {
    return (
      <DashboardPageLayout>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>No active mess found. Please select a mess first.</AlertDescription>
        </Alert>
      </DashboardPageLayout>
    );
  }

  const pricesRes = await getMarketPrices(messId);
  const prices = pricesRes.success ? pricesRes.data : [];

  return (
    <DashboardPageLayout>
      <DashboardPageHeader
        title="Market Prices"
        description="Manage current market prices used by AI for budget-aware meal planning and shopping list generation."
      />

      <MarketPriceManager messId={messId} initialPrices={prices} />
    </DashboardPageLayout>
  );
}
