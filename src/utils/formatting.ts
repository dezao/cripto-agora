export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  }).format(value);
};

export const formatPercentage = (value: number) => {
  return (
    new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value) + "%"
  );
};

export const parseDecimalInput = (value: string): number => {
  // Replace comma with dot for proper number parsing
  const normalizedValue = value.replace(",", ".");
  const parsed = parseFloat(normalizedValue);
  return isNaN(parsed) ? 0 : parsed;
};
