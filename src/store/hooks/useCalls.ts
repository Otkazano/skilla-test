import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/index';
import { setCalls, Call } from '../reducers/calls';
import apiClient from '../../services/api/api';
import { RootState } from '..';

const formatDate = (date: Date) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === yesterday.toDateString()) {
    return 'Вчера';
  } else {
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
  }
};

const groupCallsByDate = (calls: Call[], filters: Record<string, any>) => {
  const grouped: (Call | { type: 'header'; date: string; count: number })[] =
    [];
  const callCounts: Record<string, number> = {};
  const today = new Date().toDateString();
  let lastDate = '';

  const isSortByActive =
    filters.sort_by !== undefined &&
    filters.sort_by !== null &&
    filters.sort_by !== '';

  calls.forEach((call) => {
    const callDate = new Date(call.date).toDateString();
    callCounts[callDate] = (callCounts[callDate] || 0) + 1;
  });

  calls.forEach((call) => {
    const callDate = new Date(call.date);
    const callDateString = callDate.toDateString();
    const formattedDate = formatDate(callDate);

    // Добавляем "Сегодня", если активен sort_by
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

const useCalls = () => {
  const dispatch = useAppDispatch();
  const calls = useAppSelector((state: RootState) => state.calls);
  const filters = useAppSelector((state: RootState) => state.callFilters);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const isMounted = React.useRef(true);

  React.useEffect(() => {
    isMounted.current = true;
    setIsLoading(true);
    setError('');

    const getCalls = async () => {
      try {
        const queryString = new URLSearchParams(
          Object.entries(filters).reduce(
            (acc, [key, value]) => {
              if (value !== undefined) {
                acc[key] = Array.isArray(value)
                  ? value.join(',')
                  : String(value);
              }
              return acc;
            },
            {} as Record<string, string>,
          ),
        ).toString();

        const response = (await apiClient.request({
          url: `https://api.skilla.ru/mango/getList?${queryString}`,
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
          },
        })) as { results: Call[] };

        if (isMounted.current) {
          const groupedCalls = groupCallsByDate(response.results, filters);
          dispatch(setCalls(groupedCalls));
          setError('');
        }
      } catch (error) {
        console.error('Ошибка при загрузке звонков:', error);
        if (isMounted.current) {
          dispatch(setCalls([]));
          setError('Ошибка при загрузке звонков');
        }
      } finally {
        if (isMounted.current) {
          setIsLoading(false);
        }
      }
    };

    getCalls();

    return () => {
      isMounted.current = false;
    };
  }, [filters, dispatch]);

  return {
    calls: calls.items,
    isLoadingCalls: isLoading,
    error,
  };
};

export default useCalls;
