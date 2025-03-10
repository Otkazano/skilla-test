import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import useCalls from '../../store/hooks/useCalls';
import styles from './CallList.module.scss';
import CallItem from '../CallItem/CallItem';
import CallHeader from '../CallHeader/CallHeader';
import Loader from '../Loader/Loader';

const CallList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { calls, isLoadingCalls, error } = useCalls();
  console.log(calls);

  return (
    <div className={styles.callList}>
      {error && !isLoadingCalls && <p className={styles.error}>{error}</p>}
      {isLoadingCalls ? (
        <Loader />
      ) : (
        <div className={styles.callItems}>
          {calls.map((item, index) =>
            'type' in item ? (
              <CallHeader
                key={`header-${index}`}
                date={item.date}
                count={item.count}
              />
            ) : (
              <CallItem key={item.id} call={item} />
            ),
          )}
        </div>
      )}
    </div>
  );
};

export default CallList;
