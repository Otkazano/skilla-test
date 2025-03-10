import React, { useState, useEffect, useRef, forwardRef } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { useAppSelector } from '../../store/hooks';
import { setFilters } from '../../store/reducers/callFilters';
import styles from './TableFilters.module.scss';
import { ReactComponent as ArrowLeft } from '../../assets/icons/filters/arrow-left.svg';
import { ReactComponent as ArrowRight } from '../../assets/icons/filters/arrow-right.svg';
import { ReactComponent as ArrowDown } from '../../assets/icons/filters/arrow-down.svg';
import { ReactComponent as Calendar } from '../../assets/icons/filters/calendar.svg';
import { ReactComponent as Cross } from '../../assets/icons/filters/reset-filters-icon.svg';
import { DateRangeContent } from '../DateRange/DateRange';

const PRESETS = [
  { label: '3 дня', value: 3 },
  { label: 'Неделя', value: 7 },
  { label: 'Месяц', value: 30 },
  { label: 'Год', value: 365 },
];

enum inOutCallsTypes {
  undefined = 'Все типы',
  inCall = 'Входящие',
  outCall = 'Исходящие',
}

const initialFilters = {
  date_start: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0],
  date_end: new Date().toISOString().split('T')[0],
  in_out: undefined,
  sort_by: undefined,
};

const TableFilters: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const filters = useAppSelector((state) => state.callFilters);
  const [isDateOpen, setDateOpen] = useState(false);
  const [isTypeOpen, setTypeOpen] = useState(false);
  const [selectedDays, setSelectedDays] = useState(3);
  const typeDropdownRef = useRef<HTMLDivElement>(null);
  const dateDropdownRef = useRef<HTMLDivElement>(null);

  const getDaysLabel = (days: number) => {
    return `${days} ${days === 1 ? 'день' : days < 5 ? 'дня' : 'дней'}`;
  };

  useEffect(() => {
    const start = new Date(filters.date_start);
    const end = new Date(filters.date_end);
    const diffDays = Math.round(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24) + 1,
    );

    if (diffDays >= 1) {
      setSelectedDays(diffDays);
    }
  }, [filters.date_start, filters.date_end]);

  const handlePresetClick = (days: number) => {
    setSelectedDays(days);
    const endDate = new Date();
    const startDate = new Date();

    if (days === 1) {
      startDate.setDate(endDate.getDate());
    } else {
      startDate.setDate(endDate.getDate() - (days - 1));
    }

    dispatch(
      setFilters({
        date_start: startDate.toISOString().split('T')[0],
        date_end: endDate.toISOString().split('T')[0],
      }),
    );
  };

  const changeDays = (increment: number) => {
    const newDays = Math.max(1, selectedDays + increment);
    setSelectedDays(newDays);
    handlePresetClick(newDays);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setTypeOpen(false);
      setDateOpen(false);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      typeDropdownRef.current &&
      !typeDropdownRef.current.contains(event.target as Node)
    ) {
      setTypeOpen(false);
    }

    if (
      dateDropdownRef.current &&
      !dateDropdownRef.current.contains(event.target as Node)
    ) {
      setDateOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleResetFilters = () => {
    dispatch(setFilters(initialFilters));
  };

  const filtersAreDefault =
    filters.date_start === initialFilters.date_start &&
    filters.date_end === initialFilters.date_end &&
    filters.in_out === initialFilters.in_out &&
    filters.sort_by === initialFilters.sort_by;

  const CustomInput = forwardRef<
    HTMLButtonElement,
    { value?: string; onClick?: () => void; placeholder?: string }
  >(({ value, onClick, placeholder }, ref) => (
    <button className={styles.customInput} onClick={onClick} ref={ref}>
      {value && value !== 'Invalid Date' ? value : placeholder}
    </button>
  ));

  CustomInput.displayName = 'CustomInput';

  return (
    <div className={styles.tableFilters}>
      <div className={styles.filterItem} ref={typeDropdownRef}>
        <button
          className={styles.typeButton}
          onClick={() => setTypeOpen(!isTypeOpen)}
        >
          <span>
            {filters.in_out === undefined
              ? inOutCallsTypes.undefined
              : filters.in_out === 1
                ? inOutCallsTypes.inCall
                : inOutCallsTypes.outCall}
          </span>
          <ArrowDown
            className={`${styles.typeArrow} ${isTypeOpen && styles.typeArrowActive}`}
          />
        </button>
        {isTypeOpen && (
          <div className={styles.dropdownTypes}>
            <div
              onClick={() => dispatch(setFilters({ in_out: undefined }))}
              className={
                filters.in_out === undefined ? styles.dropdownActive : ''
              }
            >
              {inOutCallsTypes.undefined}
            </div>
            <div
              onClick={() => dispatch(setFilters({ in_out: 1 }))}
              className={filters.in_out === 1 ? styles.dropdownActive : ''}
            >
              {inOutCallsTypes.inCall}
            </div>
            <div
              onClick={() => dispatch(setFilters({ in_out: 0 }))}
              className={filters.in_out === 0 ? styles.dropdownActive : ''}
            >
              {inOutCallsTypes.outCall}
            </div>
          </div>
        )}
      </div>
      {!filtersAreDefault && (
        <button onClick={handleResetFilters} className={styles.resetButton}>
          <span>Сбросить фильтры</span> <Cross />
        </button>
      )}
      <div className={styles.filterItem} ref={dateDropdownRef}>
        <button onClick={() => changeDays(-1)} className={styles.arrow}>
          <ArrowLeft />
        </button>

        <button
          onClick={() => setDateOpen(!isDateOpen)}
          className={styles.dateButton}
        >
          <Calendar />
          <span className={styles.dateButtonText}>
            {getDaysLabel(selectedDays)}
          </span>
        </button>

        <button onClick={() => changeDays(1)} className={styles.arrow}>
          <ArrowRight />
        </button>

        {isDateOpen && (
          <div className={styles.dropdownDate}>
            {PRESETS.map((preset) => (
              <div
                key={preset.value}
                onClick={() => handlePresetClick(preset.value)}
                className={
                  selectedDays === preset.value ? styles.dropdownActive : ''
                }
              >
                {preset.label}
              </div>
            ))}
            <DateRangeContent />
          </div>
        )}
      </div>
    </div>
  );
};

export default TableFilters;
