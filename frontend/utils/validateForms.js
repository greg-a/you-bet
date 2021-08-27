export const validateBet = (betInfo) => {
  const { description, betAmount, endDate } = betInfo;
  if (description && betAmount && endDate) return true;
  return false;
};
