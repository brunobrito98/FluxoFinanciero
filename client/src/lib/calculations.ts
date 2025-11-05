import { Client } from "@shared/schema";
import { addMonths, format, startOfMonth, isBefore, isAfter, parseISO } from "date-fns";

export interface MonthlyRevenue {
  month: string;
  value: number;
}

export function calculateMonthlyProjections(clients: Client[]): MonthlyRevenue[] {
  const projections: MonthlyRevenue[] = [];
  const today = new Date();
  
  for (let i = 0; i < 12; i++) {
    const targetMonth = addMonths(startOfMonth(today), i);
    const monthName = format(targetMonth, 'MMM');
    
    let monthRevenue = 0;
    
    clients.forEach(client => {
      const renewalDate = parseISO(client.renewalDate);
      const value = parseFloat(client.monthlyValue);
      
      if (isBefore(renewalDate, targetMonth) || format(renewalDate, 'yyyy-MM') === format(targetMonth, 'yyyy-MM')) {
        monthRevenue += value;
      }
    });
    
    projections.push({
      month: monthName,
      value: monthRevenue,
    });
  }
  
  return projections;
}

export function calculateMRR(clients: Client[]): number {
  return clients.reduce((sum, client) => {
    return sum + parseFloat(client.monthlyValue);
  }, 0);
}

export function calculateARR(mrr: number): number {
  return mrr * 12;
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export function parseCurrencyInput(value: string): string {
  const numbers = value.replace(/\D/g, '');
  const numberValue = parseFloat(numbers) / 100;
  return numberValue.toFixed(2);
}

export function formatCurrencyInput(value: string): string {
  if (!value) return '';
  
  const numbers = value.replace(/\D/g, '');
  const numberValue = parseFloat(numbers) / 100;
  
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(numberValue);
}
