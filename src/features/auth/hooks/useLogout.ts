import { useAuthStore } from "../store/authStore";
import { authService } from "../services/authService";
import { queryClient } from "@/lib/queryClient";

export function useLogout() {
  const logout = useAuthStore((s) => s.logout);

  return async () => {
    await authService.logout();
    logout();
    queryClient.clear();
  };
}
