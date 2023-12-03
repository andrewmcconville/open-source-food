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
    const dateObj1: Date = new Date(date1);
    dateObj1.setHours(0, 0, 0, 0);
    const dateObj2: Date = new Date(date2);
    dateObj2.setHours(0, 0, 0, 0);
    const diffInTime: number = Math.abs(dateObj2.getTime() - dateObj1.getTime());
    const diffInDays: number = Math.ceil(diffInTime / (1000 * 60 * 60 * 24));

    return diffInDays + 1;
  };

  return { dayCount };
}

export function useDaysAgo() {
  const daysAgo = (date1: string, date2: string) => {
    const dateObj1: Date = new Date(date1);
    dateObj1.setHours(0, 0, 0, 0);
    const dateObj2: Date = new Date(date2);
    dateObj2.setHours(0, 0, 0, 0);
    const diffInTime: number = Math.abs(dateObj1.getTime() - dateObj2.getTime());
    const diffInDays: number = Math.ceil(diffInTime / (1000 * 60 * 60 * 24));

    return diffInDays;
  };

  return { daysAgo };
}
