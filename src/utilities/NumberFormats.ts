export function useFormattedNumber() {
  const formattedNumber = (number: number) => {
    return new Intl.NumberFormat('en-US').format(number);
  };

  return { formattedNumber };
}

export function useOrdinalNumber() {
  const ordinalNumber = (number: number) => {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const remainder = number % 100;
    const suffix = suffixes[(remainder - 20) % 10] || suffixes[remainder] || suffixes[0];

    return `${number}${suffix}`;
  };

  return { ordinalNumber };
}