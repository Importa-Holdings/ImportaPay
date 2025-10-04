import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type User = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setToken: (token) => set({ token }),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

// Create a hook to check if user is authenticated
export const useIsAuthenticated = () => {
  return useAuthStore((state) => state.isAuthenticated);
};

// Create a hook to get the current user
export const useCurrentUser = () => {
  return useAuthStore((state) => state.user);
};

// Create a hook to get the auth token
export const useAuthToken = () => {
  return useAuthStore((state) => state.token);
};
