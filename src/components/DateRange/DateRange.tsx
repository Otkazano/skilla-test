import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './DateRange.module.scss';
import { useAppSelector } from '../../store/hooks';
import { setFilters } from '../../store/reducers/callFilters';
import { ReactComponent as Calendar } from '../../assets/icons/filters/calendar.svg';

export const DateRangeContent: React.FC = () => {
  const dispatch = useDispatch();
  const { date_start, date_end } = useAppSelector((state) => state.callFilters);

  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);
  const [isStartClicked, setIsStartClicked] = useState(false);
  const [isEndClicked, setIsEndClicked] = useState(false);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(setFilters({ [name]: value }));
  };

  return (
    <div className={styles.container}>
      <p>Указать даты</p>
      <div className={styles.buttons} style={{ padding: 0 }}>
        <div
          className={styles.dateWrapper}
          onClick={() => {
            setIsStartClicked(true);
            startDateRef.current?.showPicker();
          }}
          style={{ padding: 0 }}
        >
          <input
            ref={startDateRef}
            className={styles.hiddenInput}
            type="date"
            name="date_start"
            value={date_start || ''}
            onChange={handleDateChange}
          />
          <span className={styles.displayDate}>
            {isStartClicked ? date_start || '__.__.__' : '__.__.__'}
          </span>
        </div>
        <span className={styles.divider}>-</span>
        <div
          className={styles.dateWrapper}
          onClick={() => {
            setIsEndClicked(true);
            endDateRef.current?.showPicker();
          }}
          style={{ padding: 0 }}
        >
          <input
            ref={endDateRef}
            className={styles.hiddenInput}
            type="date"
            name="date_end"
            value={date_end || ''}
            onChange={handleDateChange}
          />
          <span className={styles.displayDate}>
            {isEndClicked ? date_end || '__.__.__' : '__.__.__'}
          </span>
        </div>
        <button className={styles.applyBtn}>
          <Calendar />
        </button>
      </div>
    </div>
  );
};
