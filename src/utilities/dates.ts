import { useDateFormat } from '@vueuse/core';
export function useFormattedDate() {
  const formattedDate = (date: string, format = 'MMMM D, YYYY') => {
    const dateObj: Date = new Date(date);
    return useDateFormat(dateObj, format).value;
  };

  return { formattedDate };
}

import { useTimeAgo } from '@vueuse/core';
export function useFriendlyDate() {
  const friendlyDate = (date: string) => {
    const dateObj: Date = new Date(date);
    return useTimeAgo(dateObj).value;
  };

  return { friendlyDate };
}

export function useDayCount() {
  const dayCount = (date1: string, date2: string) => {
    const dateObj1 = new Date(date1);
    const dateObj2 = new Date(date2);
    const diffInTime = Math.abs(dateObj2.getTime() - dateObj1.getTime());
    const diffInDays = Math.ceil(diffInTime / (1000 * 60 * 60 * 24));
    return diffInDays;
  };

  return { dayCount };
}
