import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { IUser, IMembership } from '@/types/user.type';

/**
 * Auth Store: To store current logged-in user profile 
 * and their active mess membership.
 */

interface AuthState {
  user: IUser | null;
  myMembership: IMembership | null;
}

interface AuthActions {
  setAuth: (user: IUser | null, myMembership: IMembership | null) => void;
  resetAuth: () => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  devtools(
    (set) => ({
      user: null,
      myMembership: null,

      setAuth: (user, myMembership) => 
        set({ user, myMembership }, false, 'auth/set'),
        
      resetAuth: () => 
        set({ user: null, myMembership: null }, false, 'auth/reset'),
    }),
    { name: 'AuthStore' }
  )
);

// Advanced Selectors
export const useCurrentUser = () => useAuthStore((state) => state.user);
export const useMyMembership = () => useAuthStore((state) => state.myMembership);
export const useAuthActions = () => ({
  setAuth: useAuthStore((state) => state.setAuth),
  resetAuth: useAuthStore((state) => state.resetAuth),
});
