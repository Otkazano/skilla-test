import React, { useState } from 'react';
import { Call } from '../../store/reducers/calls';
import styles from './CallItem.module.scss';
import failedCallIcon from '../../assets/icons/calls/failed-call.svg';
import incomingCallIcon from '../../assets/icons/calls/incoming-call.svg';
import missedCallIcon from '../../assets/icons/calls/missed-call.svg';
import outgoingCallIcon from '../../assets/icons/calls/outgoing-call.svg';
import noAvatarIcon from '../../assets/icons/no-avatar-icon.svg';
import AudioPlayer from '../AudioPlayer/AudioPlayer';
import { Ratings } from '../../services/constants';

interface CallItemProps {
  call: Call;
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

const getCallIcon = (status: string, in_out: number | null): string => {
  if (in_out === 0)
    return status === 'Дозвонился' ? outgoingCallIcon : failedCallIcon;
  if (in_out === 1)
    return status === 'Дозвонился' ? incomingCallIcon : missedCallIcon;
  return failedCallIcon;
};

const CallIcon: React.FC<{ status: string; in_out: number | null }> = ({
  status,
  in_out,
}) => (
  <img
    src={getCallIcon(status, in_out)}
    alt="направление звонка"
    className={styles.callIcon}
  />
);

const Avatar: React.FC<{ avatarUrl: string | null }> = ({ avatarUrl }) => (
  <div className={styles.callAvatar}>
    <img
      src={avatarUrl || noAvatarIcon}
      alt="avatar"
      className={styles.avatar}
    />
  </div>
);

const RatingBadge: React.FC<{ rating: Ratings }> = ({ rating }) => (
  <div className={`${styles.callRating} ${RATING_CLASS_MAP[rating]}`}>
    {rating}
  </div>
);

const CallItem: React.FC<CallItemProps> = ({ call }) => {
  const [rating] = useState(getRandomRating());
  const [audioShown, setAudioShown] = useState(false);

  return (
    <div className={styles.callItem}>
      <CallIcon status={call.status} in_out={call.in_out} />
      <div className={styles.callTime}>
        {new Date(call.date).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </div>
      <Avatar avatarUrl={call.person_avatar} />
      <div className={styles.callNumber}>{call.from_number}</div>
      <div className={styles.callSource}>{call.source || ''}</div>
      <RatingBadge rating={rating} />

      {call.status === 'Дозвонился' && (
        <div
          className={`${styles.callDuration} ${audioShown ? styles.callDurationHidden : ''}`}
        >
          {new Date(call.time * 1000).toISOString().substr(14, 5)}
        </div>
      )}

      {call.record && (
        <div
          className={`${styles.callAudio} ${audioShown ? styles.callAudioShown : ''}`}
        >
          <AudioPlayer
            record={call.record}
            partnershipId={call.partnership_id}
            onOpen={() => setAudioShown(true)}
            onClose={() => setAudioShown(false)}
          />
        </div>
      )}
    </div>
  );
};

export default CallItem;
