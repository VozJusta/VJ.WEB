import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CaseMapStore {
  map: Record<string, string>;
  set: (reportId: string, caseId: string) => void;
  get: (reportId: string) => string | undefined;
}

export const useCaseMapStore = create<CaseMapStore>()(
  persist(
    (set, get) => ({
      map: {},
      set: (reportId, caseId) =>
        set((state) => ({ map: { ...state.map, [reportId]: caseId } })),
      get: (reportId) => get().map[reportId],
    }),
    { name: 'case-map' }
  )
);
