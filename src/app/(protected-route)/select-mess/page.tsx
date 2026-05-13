import { redirect } from "next/navigation";
import { getMe } from "@/services/auth.service";
import { getUsableMemberships } from "@/lib/auth-routing";
import SelectMessClient from "@/components/select-mess/select-mess-client";

export default async function SelectMessPage() {
  const response = await getMe();

  if (!response?.success || !response.data) {
    redirect("/auth/login");
  }

  const user = response.data;
  const memberships = user.memberships ?? [];
  const usableMemberships = getUsableMemberships(memberships);

  // If user doesn't have 2+ usable messes, they shouldn't be here
  if (usableMemberships.length < 2) {
    redirect("/get-started");
  }

  return <SelectMessClient usableMemberships={usableMemberships} />;
}
