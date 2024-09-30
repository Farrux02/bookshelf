export const truncate = (str: string, n: number = 18): string => {
  return str.length > n ? str.substring(0, n - 1).trim() + "..." : str;
};
