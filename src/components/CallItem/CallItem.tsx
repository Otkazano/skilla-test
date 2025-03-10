import React, { useState } from 'react';
import { Call } from '../../store/reducers/calls';
import styles from './CallItem.module.scss';
import failedCallIcon from '../../assets/icons/calls/failed-call.svg';
import incomingCallIcon from '../../assets/icons/calls/incoming-call.svg';
import missedCallIcon from '../../assets/icons/calls/missed-call.svg';
import outgoingCallIcon from '../../assets/icons/calls/outgoing-call.svg';
import noAvatarIcon from '../../assets/icons/no-avatar-icon.svg';
// import AudioPlayer from '../AudioPlayer/AudioPlayer';

interface CallItemProps {
  call: Call;
}

enum Ratings {
  Bad = 'Плохо',
  Good = 'Хорошо',
  Excellent = 'Отлично',
  ScriptNotUsed = 'Скрипт не использован',
}

const RATING_CLASS_MAP: Record<Ratings, string> = {
  [Ratings.Bad]: styles.bad,
  [Ratings.Good]: styles.good,
  [Ratings.Excellent]: styles.excellent,
  [Ratings.ScriptNotUsed]: styles.notUsed,
};

const getRandomRating = (): Ratings => {
  const values = Object.values(Ratings);
  return values[Math.floor(Math.random() * values.length)] as Ratings;
};

const getCallIcon = (status: string, in_out: number | null) => {
  switch (in_out) {
    case 0:
      return status === 'Дозвонился' ? outgoingCallIcon : failedCallIcon;
    case 1:
      return status === 'Дозвонился' ? incomingCallIcon : missedCallIcon;
    default:
      return failedCallIcon;
  }
};

const CallItem: React.FC<CallItemProps> = ({ call }) => {
  const [rating] = useState(getRandomRating());

  return (
    <div className={styles.callItem}>
      <img
        src={getCallIcon(call.status, call.in_out)}
        alt="направление звонка"
        className={styles.callIcon}
      />
      <div className={styles.callTime}>
        {new Date(call.date).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </div>
      <div className={styles.callAvatar}>
        <img
          src={call.person_avatar || noAvatarIcon}
          alt="avatar"
          className={styles.avatar}
        />
      </div>
      <div className={styles.callNumber}>{call.from_number}</div>
      <div className={styles.callSource}>{call.source || ''}</div>

      <div className={`${styles.callRating} ${RATING_CLASS_MAP[rating]}`}>
        {rating}
      </div>

      {call.status === 'Дозвонился' ? (
        <div className={styles.callDuration}>
          {new Date(call.time * 1000).toISOString().substr(14, 5)}
        </div>
      ) : (
        <div></div>
      )}

      <div className={styles.callAudio}>
        {/* {call.record && (
          <AudioPlayer
            record={call.record}
            partnershipId={call.partnership_id}
          />
        )} */}
      </div>
    </div>
  );
};

export default CallItem;
