import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { IMember } from '@/types/member.type';

/**
 * Senior Structure: Define State and Actions as separate interfaces
 * for better readability and maintainability.
 */

interface MemberState {
  members: IMember[];
  isLoading: boolean;
  error: string | null;
}

interface MemberActions {
  setMembers: (members: IMember[]) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  resetMembers: () => void;
}

// Combine for the store type
type MemberStore = MemberState & MemberActions;

export const useMemberStore = create<MemberStore>()(
  devtools(
    (set) => ({
      // State initial values
      members: [],
      isLoading: false,
      error: null,

      // Actions with descriptive names for DevTools
      setMembers: (members) => 
        set(
          { members, isLoading: false, error: null }, 
          false, 
          'members/set'
        ),

      setLoading: (isLoading) => 
        set({ isLoading }, false, 'members/setLoading'),

      setError: (error) => 
        set({ error, isLoading: false }, false, 'members/setError'),

      resetMembers: () => 
        set(
          { members: [], isLoading: false, error: null }, 
          false, 
          'members/reset'
        ),
    }),
    { name: 'MemberStore', enabled: process.env.NODE_ENV !== 'production' }
  )
);

/**
 * Senior Practice: Export specific selectors to avoid unnecessary re-renders.
 * Instead of: const members = useMemberStore(s => s.members)
 * Use: const members = useActiveMembers()
 */

export const useActiveMembers = () => useMemberStore((state) => state.members);
export const useMemberStoreLoading = () => useMemberStore((state) => state.isLoading);
export const useMemberStoreError = () => useMemberStore((state) => state.error);
export const useMemberActions = () => {
  const setMembers = useMemberStore((state) => state.setMembers);
  const resetMembers = useMemberStore((state) => state.resetMembers);
  const setLoading = useMemberStore((state) => state.setLoading);
  const setError = useMemberStore((state) => state.setError);

  return { setMembers, resetMembers, setLoading, setError };
};
