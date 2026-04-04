export default function PendingApprovalPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4 max-w-md">
        <h1 className="text-2xl font-bold">Pending Approval</h1>
        <p className="text-muted-foreground">
          Your request to join the mess is pending approval. Please wait for the manager to approve your request.
        </p>
      </div>
    </div>
  );
}
