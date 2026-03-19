// "use client";
// import { create } from "zustand";

// interface AuthUser {
//   _id: string;
//   fullname: string;
//   email: string;
//   nationalId?: string | null;
// }

// interface AuthStore {
//   user: AuthUser | null;
//   token: string | null;
//   setAuth: (data: { token: string; user: AuthUser }) => void;
//   clearAuth: () => void;
// }

// export const useAuthStore = create<AuthStore>((set) => ({
//   user: null,
//   token: null,
//   setAuth: (data) => set({ user: data.user, token: data.token }),
//   clearAuth: () => set({ user: null, token: null }),
// }));

"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthUser {
  _id: string;
  fullname: string;
  email: string;
  nationalId?: string | null;
}

interface AuthStore {
  user: AuthUser | null;
  token: string | null;
  setAuth: (data: { token: string; user: AuthUser }) => void;
  clearAuth: () => void;
}
interface AuthUser {
  _id: string;
  fullname: string;
  email: string;
  profilePicture?: string; // ✅ ADD
  nationalId?: string | null;
}
export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setAuth: (data) => set({ user: data.user, token: data.token }),
      clearAuth: () => set({ user: null, token: null }),
    }),
    {
      name: "auth-storage", // localStorage key
    }
  )
);