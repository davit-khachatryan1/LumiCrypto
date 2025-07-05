import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  if (price >= 1000000) {
    return `$${(price / 1000000).toFixed(2)}M`;
  } else if (price >= 1000) {
    return `$${(price / 1000).toFixed(2)}K`;
  } else if (price >= 1) {
    return `$${price.toFixed(2)}`;
  } else {
    return `$${price.toFixed(6)}`;
  }
}

export function formatPercentage(percentage: number): string {
  const formatted = percentage.toFixed(2);
  return `${percentage >= 0 ? '+' : ''}${formatted}%`;
}

export function formatMarketCap(marketCap: number): string {
  if (marketCap >= 1000000000) {
    return `$${(marketCap / 1000000000).toFixed(2)}B`;
  } else if (marketCap >= 1000000) {
    return `$${(marketCap / 1000000).toFixed(2)}M`;
  } else if (marketCap >= 1000) {
    return `$${(marketCap / 1000).toFixed(2)}K`;
  } else {
    return `$${marketCap.toFixed(2)}`;
  }
}

export function truncateAddress(address: string, start = 6, end = 4): string {
  if (address.length <= start + end) return address;
  return `${address.slice(0, start)}...${address.slice(-end)}`;
}

export function generateRiskScore(): number {
  return Math.floor(Math.random() * 100) + 1;
}

export function getRiskColor(score: number): string {
  if (score >= 80) return 'text-red-400';
  if (score >= 60) return 'text-yellow-400';
  if (score >= 40) return 'text-orange-400';
  return 'text-green-400';
}

export function getRiskLabel(score: number): string {
  if (score >= 80) return 'High Risk';
  if (score >= 60) return 'Medium-High Risk';
  if (score >= 40) return 'Medium Risk';
  if (score >= 20) return 'Low-Medium Risk';
  return 'Low Risk';
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

export function generateSparklineData(): number[] {
  const data: number[] = [];
  let currentValue = 100;
  
  for (let i = 0; i < 20; i++) {
    const change = (Math.random() - 0.5) * 10;
    currentValue += change;
    data.push(Math.max(0, currentValue));
  }
  
  return data;
} 