import React, { useState } from 'react';
import { Table, TableBody, TableSortLabel, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Apartment } from '@/types/types';

interface ApartmentTableProps {
  apartments: Apartment[];
}

const ApartmentTable: React.FC<ApartmentTableProps> = ({ apartments }) => {
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState('monthlyPrice');

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedApartments = [...apartments].sort((a, b) => {
    if (orderBy === 'monthlyPrice') {
      return order === 'asc' ? a.monthlyPrice - b.monthlyPrice : b.monthlyPrice - a.monthlyPrice;
    }
    return 0;
  });
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Area</TableCell>
            <TableCell>Rooms No</TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'monthlyPrice'}
                direction={orderBy === 'monthlyPrice' ? order : 'asc'}
                onClick={() => handleRequestSort('monthlyPrice')}
              >
                Monthly Price
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedApartments.map((apartment) => (
            <TableRow key={apartment.uuid}>
              <TableCell>{apartment.title}</TableCell>
              <TableCell>{apartment.area} sq ft</TableCell>
              <TableCell>{apartment.roomsNo}</TableCell>
              <TableCell>${apartment.monthlyPrice}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ApartmentTable;
