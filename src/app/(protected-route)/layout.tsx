import { getCurrentUserRole } from "@/services/auth.service";
import { UserProvider } from "@/providers/user-provider";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const role = await getCurrentUserRole();

  return (
    <UserProvider role={role}>
      {children}
    </UserProvider>
  );
}
