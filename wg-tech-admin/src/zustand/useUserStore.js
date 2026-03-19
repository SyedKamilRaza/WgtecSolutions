import { create } from "zustand";
import { persist } from "zustand/middleware";

// Very small in-memory cache for stable permission objects per path
const __permsCache = {};

const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      setUserData: (user) => set({ user }),
      clearUserData: () => {
        set({ user: null });
        localStorage.removeItem("userData");
        localStorage.removeItem("token");
      },
      // Simple helper: 1-liner usage anywhere
      // const perms = useUserStore(s => s.getRoutePermissions("/services"))
      getRoutePermissions: (path) => {
        const routes = get()?.user?.designation?.routes || [];
        const found = routes.find((r) => r.path === path);
        const next = {};
        for (const perm of found?.permissions || []) {
          for (const k in perm) {
            if (k !== "label" && k !== "key") next[k] = perm[k];
          }
        }
        const prev = __permsCache[path];
        if (
          prev &&
          Object.keys(next).length === Object.keys(prev).length &&
          Object.keys(next).every((k) => prev[k] === next[k])
        ) {
          return prev;
        }
        __permsCache[path] = next;
        return next;
      },

      // Easiest API: boolean checker, no objects, no confusion
      // Usage:
      //   const has = useUserStore(s => s.hasPermission)
      //   if (has("/services", "isView")) { ... }
      hasPermission: (path, key) => {
        const routes = get()?.user?.designation?.routes || [];
        const found = routes.find((r) => r.path === path);
        if (!found) return false;
        for (const perm of found.permissions || []) {
          if (Object.prototype.hasOwnProperty.call(perm, key)) {
            return Boolean(perm[key]);
          }
        }
        return false;
      },
    }),
    {
      name: "userData",
    }
  )
);

export default useUserStore;
