import { create } from "zustand";

interface User {
  userId: string;
  userName: string;
}

interface CommunityState {
  users: User[];
  setUsers: (users: User[]) => void;
  addUser: (user: User) => void;
  removeUser: (userId: string) => void;
}

const useOnlineStore = create<CommunityState>((set) => ({
  users: [],
  setUsers: (users) => set({ users }),
  addUser: (user) =>
    set((state) => ({ users: [...state.users, user] })),
  removeUser: (userId) =>
    set((state) => ({
      users: state.users.filter((u) => u.userId !== userId),
    })),
}));

export default useOnlineStore;
