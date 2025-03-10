import React from 'react';
import styles from './CallHeader.module.scss';

interface CallHeaderProps {
  date: string;
  count: number;
}

const CallHeader: React.FC<CallHeaderProps> = ({ date, count }) => {
  return (
    <>
      <p className={styles.text}>
        {date}&nbsp;
        <span className={styles.count}>{count}</span>
      </p>
    </>
  );
};

export default CallHeader;
