import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import useCalls from '../../store/hooks/useCalls';
import styles from './CallList.module.scss';
import CallItem from '../CallItem/CallItem';

const CallList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { calls, isLoadingCalls } = useCalls();

  return (
    <div className={styles.callList}>
      {isLoadingCalls ? (
        <p>Загрузка...</p>
      ) : (
        <div className={styles.callItems}>
          {calls.map((call) => (
            <CallItem key={call.id} call={call} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CallList;
