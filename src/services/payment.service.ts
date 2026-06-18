import { apiFetch } from '@/lib/api-client';
import { API } from '@/lib/api';

export interface SubscriptionData {
  id: string;
  status: 'active' | 'past_due' | 'canceled' | 'unpaid' | 'inactive';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  interviewsUsed: number;
  simulationsUsed: number;
  leadsUsed: number;
  plan: {
    id: string;
    name: string;
    type: string;
    billingType: 'Monthly' | 'One_Time';
    maxInterviews: number;
    maxSimulation: number;
    maxLeads: number;
    hasIaPetitions: boolean;
    hasAnalytics: boolean;
  };
}

export async function createCheckoutSession(planType: string): Promise<{ url: string }> {
  const response = await apiFetch(API.ENDPOINTS.PAYMENTS.CHECKOUT_SESSION, {
    method: 'POST',
    body: JSON.stringify({ planType }),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.message || 'Erro ao criar sessão de checkout');
  }

  return response.json();
}

export async function getMySubscription(): Promise<SubscriptionData> {
  const response = await apiFetch(API.ENDPOINTS.PAYMENTS.SUBSCRIPTION_ME);

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.message || 'Nenhuma assinatura encontrada');
  }

  return response.json();
}

export async function createBillingPortal(): Promise<{ url: string }> {
  const response = await apiFetch(API.ENDPOINTS.PAYMENTS.BILLING_PORTAL, {
    method: 'POST',
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.message || 'Erro ao abrir portal de assinatura');
  }

  return response.json();
}
