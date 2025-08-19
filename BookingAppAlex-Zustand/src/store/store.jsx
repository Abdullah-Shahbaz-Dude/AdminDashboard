// store.js
import { create } from "zustand";
const useStore = create((set) => ({
  users: [],
  selected: [],
  user: null,
  linkVisible: false,
  setUsers: (users) => set({ users }),
  //   setSelected: (updater) =>
  //     set((state) => ({
  //       selected:
  //         typeof updater === "function" ? updater(state.selected) : updater,
  //     })),
  setSelected: (arr) => set({ selected: arr }),
  setUser: (user) => set({ user }),
  // setLinkVisible: (visible) => set({ linkVisible }),
  setLinkVisible: (visible) => set({ linkVisible: visible }),
}));
export default useStore;
