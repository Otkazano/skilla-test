import { Call } from '../../store/reducers/calls';

export const formatDate = (date: Date): string => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === yesterday.toDateString()) {
    return 'Вчера';
  }
  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
};

export const groupCallsByDate = (
  calls: Call[],
  filters: Record<string, any>,
): (Call | { type: 'header'; date: string; count: number })[] => {
  const grouped: (Call | { type: 'header'; date: string; count: number })[] =
    [];
  const callCounts: Record<string, number> = {};
  const today = new Date().toDateString();
  let lastDate = '';

  calls.forEach((call) => {
    const callDate = new Date(call.date).toDateString();
    callCounts[callDate] = (callCounts[callDate] || 0) + 1;
  });

  calls.forEach((call) => {
    const callDate = new Date(call.date);
    const callDateString = callDate.toDateString();
    const formattedDate = formatDate(callDate);
    const isSortByActive = Boolean(filters.sort_by);

    if (isSortByActive && callDateString === today && lastDate !== 'Сегодня') {
      grouped.push({
        type: 'header',
        date: 'Сегодня',
        count: callCounts[callDateString],
      });
      lastDate = 'Сегодня';
    }

    if (callDateString !== today && formattedDate !== lastDate) {
      grouped.push({
        type: 'header',
        date: formattedDate,
        count: callCounts[callDateString],
      });
      lastDate = formattedDate;
    }

    grouped.push(call);
  });

  return grouped;
};
