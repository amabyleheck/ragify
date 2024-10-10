import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

interface SessionStorageState {
  sessionId: string | null;
  initializeId: () => string | null;
}

const useSessionStorageId = create(
  persist<SessionStorageState>(
    (set, get) => ({
      sessionId: null,
      initializeId: () => {
        const storedId = get().sessionId;
        if (!storedId) {
          const newId = uuidv4();
          set({ sessionId: newId });
          return newId;
        }
        return storedId;
      }
    }),
    {
      name: "session-storage-id"
    }
  )
);

export default useSessionStorageId;
