import React from 'react';
import CallList from '../CallList/CallList';
import TableFilters from '../TableFilters/TableFilters';
import TableHead from '../TableHead/TableHead';
import styles from './Table.module.scss';

const Table: React.FC = () => {
  return (
    <>
      <TableFilters />
      <div className={styles.table}>
        <TableHead />
        <CallList />
      </div>
    </>
  );
};

export default Table;
