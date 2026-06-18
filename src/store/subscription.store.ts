'use client';

import { create } from 'zustand';
import { getMySubscription, SubscriptionData } from '@/services/payment.service';

interface SubscriptionStore {
  subscription: SubscriptionData | null;
  isLoading: boolean;
  error: string | null;
  fetchSubscription: () => Promise<void>;
  clearSubscription: () => void;
}

export const useSubscriptionStore = create<SubscriptionStore>((set) => ({
  subscription: null,
  isLoading: false,
  error: null,

  fetchSubscription: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await getMySubscription();
      set({ subscription: data, isLoading: false });
    } catch (err) {
      set({
        subscription: null,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Erro ao buscar assinatura',
      });
    }
  },

  clearSubscription: () => set({ subscription: null, error: null }),
}));
