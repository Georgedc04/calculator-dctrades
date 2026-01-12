export const getSymbol = (c: string) =>
  c === "USD" ? "$" : c === "EUR" ? "€" : c === "GBP" ? "£" : "";
