import React from 'react';
import CallList from '../CallList/CallList';
import TableFilters from '../TableFilters/TableFilters';

const Tabel: React.FC = () => {
  return (
    <>
      <TableFilters />
      <CallList />
    </>
  );
};

export default Tabel;
