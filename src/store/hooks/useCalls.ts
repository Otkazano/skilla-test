import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setCalls, Call } from '../reducers/calls';
import apiClient from '../../services/api/api';
import { RootState } from '..';
import { groupCallsByDate } from '../../services/utils/callUtils';

const useCalls = () => {
  const dispatch = useAppDispatch();
  const calls = useAppSelector((state: RootState) => state.calls.items);
  const filters = useAppSelector((state: RootState) => state.callFilters);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    setIsLoading(true);
    setError('');

    const getCalls = async () => {
      try {
        const queryString = new URLSearchParams(
          Object.entries(filters).reduce<Record<string, string>>(
            (acc, [key, value]) => {
              if (value !== undefined) {
                acc[key] = Array.isArray(value)
                  ? value.join(',')
                  : String(value);
              }
              return acc;
            },
            {},
          ),
        ).toString();

        const response = await apiClient.request<{ results: Call[] }>({
          url: `https://api.skilla.ru/mango/getList?${queryString}`,
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
          },
        });

        if (isMounted.current) {
          dispatch(setCalls(groupCallsByDate(response.results, filters)));
          setError('');
        }
      } catch (err) {
        console.error('Ошибка при загрузке звонков:', err);
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

  return { calls, isLoadingCalls: isLoading, error };
};

export default useCalls;
