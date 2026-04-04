
const DashboardPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col md:min-h-[calc(100vh-128px)] p-1">
      <div className="grid gap-6">{children}</div>
    </div>
  );
};

export default DashboardPageLayout;