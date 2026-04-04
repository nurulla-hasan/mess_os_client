export default function BlockedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold">Account Blocked</h1>
        <p className="text-muted-foreground">
          Your account has been blocked. Please contact support for assistance.
        </p>
      </div>
    </div>
  );
}
