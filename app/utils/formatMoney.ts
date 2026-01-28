export const formatMoney = (money: number): string => {
  return money.toLocaleString("PT-BR", {
    style: "currency",
    currency: "BRL",
  });
};
