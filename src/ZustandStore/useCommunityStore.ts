import { create } from "zustand";

interface CommunityState {
  communityId: string | null;
  setCommunityId: (id: string) => void;
}

const useCommunityStore = create<CommunityState>((set) => ({
  communityId: null,
  setCommunityId: (id) => set({ communityId: id }),
}));

export default useCommunityStore;
