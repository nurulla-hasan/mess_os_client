import { cn } from "@/lib/utils";


interface PageLayoutProps {
  children: React.ReactNode;
  pagination?: React.ReactNode;
  className?: string;
  paddingSize?: "default" | "small" | "none" | "zero"; // | "compact"
}

const PageLayout = ({ children, pagination, className, paddingSize = "default" }: PageLayoutProps) => {
  const paddingMap = {
    // compact: "px-5 pt-5 pb-12 lg:pb-18 min-h-[calc(100vh-248px)] relative",
    default: "px-5 py-12 lg:py-18",
    small: "px-5 pt-5 pb-12 lg:pb-18",
    none: "px-5 pb-12 lg:pb-18",
    zero: "px-5",
  };

  return (
    <div className={cn("container max-w-7xl mx-auto", paddingMap[paddingSize], className)}>
      <div className="grow lg:mb-0">
        {children}
      </div>
      {pagination}
    </div>
  );
};

export default PageLayout;