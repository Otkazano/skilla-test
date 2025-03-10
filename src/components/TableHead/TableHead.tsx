import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import styles from './TableHead.module.scss';
import { setFilters } from '../../store/reducers/callFilters';
import { ReactComponent as ArrowDown } from '../../assets/icons/filters/arrow-down.svg';

const TableHead: React.FC = () => {
  const dispatch = useDispatch();
  const { sort_by, order } = useSelector(
    (state: RootState) => state.callFilters,
  );

  const handleSortChange = (field: 'date' | 'duration') => {
    dispatch(
      setFilters({
        sort_by: field,
        order: sort_by === field && order === 'DESC' ? 'ASC' : 'DESC',
      }),
    );
  };

  const getArrowClass = (field: 'date' | 'duration') => {
    return `${styles.sortIcon} ${
      sort_by === field ? (order === 'ASC' ? styles.asc : styles.desc) : ''
    }`;
  };

  return (
    <div className={styles.tableHead}>
      <div>Тип</div>
      <div
        className={styles.sortButton}
        onClick={() => handleSortChange('date')}
      >
        <span>Время</span>
        <span className={getArrowClass('date')}>
          <ArrowDown />
        </span>
      </div>
      <div>Сотрудник</div>
      <div>Звонок</div>
      <div>Источник</div>
      <div>Оценка</div>
      <div
        className={styles.sortButton}
        onClick={() => handleSortChange('duration')}
      >
        <span>Длительность</span>
        <span className={getArrowClass('duration')}>
          <ArrowDown />
        </span>
      </div>
    </div>
  );
};

export default TableHead;
