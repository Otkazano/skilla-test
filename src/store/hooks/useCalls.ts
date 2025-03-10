import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/index';
import { setCalls, Call } from '../reducers/calls';
import apiClient from '../../services/api/api';
import { RootState } from '..';

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
          dispatch(setCalls(response.results));
        }
      } catch (error) {
        console.error('Ошибка при загрузке звонков:', error);
        setError('Ошибка при загрузке звонков');
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
    error: error,
  };
};

export default useCalls;
