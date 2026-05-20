import { getPostLoginRoute } from "@/lib/auth-routing";
import { getActiveMessIdFromCookies, getMe } from "@/services/auth.service";

export async function getPublicAuthState() {
  const [userRes, activeMessId] = await Promise.all([
    getMe(),
    getActiveMessIdFromCookies(),
  ]);

  const user = userRes.success ? userRes.data : null;

  return {
    isAuthenticated: Boolean(user),
    appHref: user ? getPostLoginRoute(user, activeMessId) : "/auth/login",
  };
}
