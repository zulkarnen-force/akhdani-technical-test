export const calculateDays = (
  arrivalDate: string,
  departureDate: string,
): number => {
  const start = new Date(departureDate);
  const end = new Date(arrivalDate);
  const diffTime = end.getTime() - start.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays >= 0 ? diffDays : 0;
};
