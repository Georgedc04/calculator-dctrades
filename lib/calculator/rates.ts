export const rates = {
  USD: 1,
  EUR: 1.167,
  GBP: 1.206,
} as const;

export type Currency = keyof typeof rates;
