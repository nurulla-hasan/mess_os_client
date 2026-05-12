import { Loader2 } from "lucide-react";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";

export default function GlobalPanelLoading() {
  return (
    <DashboardPageLayout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] w-full p-6 animate-in fade-in duration-700">
        <div className="relative flex items-center justify-center mb-6">
          <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full animate-pulse" />
          <div className="h-20 w-20 bg-background/50 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-2xl border border-primary/10 relative z-10">
            <Loader2 className="h-10 w-10 text-primary animate-spin" />
          </div>
        </div>
        <div className="space-y-2 text-center">
          <h3 className="text-xl font-bold  text-foreground">
            Loading Data
          </h3>
          <p className="text-sm font-medium text-muted-foreground/70 animate-pulse">
            Please wait while we fetch the latest information...
          </p>
        </div>
      </div>
    </DashboardPageLayout>
  );
}
