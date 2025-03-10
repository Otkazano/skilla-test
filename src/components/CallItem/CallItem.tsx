import React, { useState } from 'react';
import { Call } from '../../store/reducers/calls';
import styles from './CallItem.module.scss';
import AudioPlayer from '../AudioPlayer/AudioPlayer';

interface CallItemProps {
  call: Call;
}

const getRandomRating = () => Math.floor(Math.random() * 5) + 1;

const CallItem: React.FC<CallItemProps> = ({ call }) => {
  const [rating] = useState(getRandomRating());

  return (
    <div className={styles.callItem}>
      <div className={styles.callHeader}>
        <span className={styles.callDirection}>
          {call.in_out === 0 ? '📥 Входящий' : '📤 Исходящий'}
        </span>
        <span className={styles.callStatus}>
          {call.status === 'Дозвонился' ? '✅' : '❌'}
        </span>
      </div>

      <div className={styles.callDetails}>
        <div>
          <strong>С:</strong> {call.from_number}{' '}
          {call.from_extension && `(${call.from_extension})`}
        </div>
        <div>
          <strong>На:</strong> {call.to_number}{' '}
          {call.to_extension && `(${call.to_extension})`}
        </div>
        <div>
          <strong>Длительность:</strong> {call.time} сек
        </div>
        <div>
          <strong>Оценка:</strong> {'⭐'.repeat(rating)}
        </div>
      </div>

      {/* {call.record && (
        <AudioPlayer record={call.record} partnershipId={call.partnership_id} />
      )} */}

      {call.abuse && (
        <div className={styles.callAbuse}>
          <strong>Жалоба:</strong> {call.abuse.message}
        </div>
      )}
    </div>
  );
};

export default CallItem;
