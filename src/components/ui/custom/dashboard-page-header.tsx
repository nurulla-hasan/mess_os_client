

"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../button";

const DashboardPageHeader = ({
  title,
  description,
  length,
  showBack,
}: {
  title: string;
  description: string;
  length?: number;
  showBack?: boolean;
}) => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-start gap-4">
        {showBack && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
          >
            <ArrowLeft />
          </Button>
        )}
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <h1 className="text-lg md:text-2xl uppercase tracking-wider font-medium text-primary">
              {title}
            </h1>
            {length && (
              <span className="text-xs inline-flex items-center justify-center rounded-full bg-primary/10 px-2.5 py-0.5 font-medium text-primary border border-primary/20">
                {length}
              </span>
            )}
          </div>
          <p className="text-sm md:text-base text-muted-foreground max-w-150 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPageHeader