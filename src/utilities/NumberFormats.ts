export function useFormattedNumber() {
  const formattedNumber = (number: number) => {
    return new Intl.NumberFormat('en-US').format(number);
  };

  return { formattedNumber };
}
