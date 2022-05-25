import cx from 'classnames';

import { Grid, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Box, Typography } from '@mui/material';

import CustomPagination from 'components/CustomPagination';
import FilterUpDown from 'components/icons/FilterUpDown';
import { MadFormatter } from 'utils/formatters';
import { useTableStyles } from 'containers/modules/common/styles/tableStyles';

import { useBalanceTableStyles } from '../tableStyles';

import Price from './Price';

const SubtractHistory = ({ items, pagination, sortOrder, onPageChange, onSortDirectionChange }) => {
  const classes = useBalanceTableStyles();
  const classesTable = useTableStyles();

  return (
    <Grid container rowSpacing={4} className={cx(classesTable.table, classes.addHistory)}>
      <Grid item xs={12}>
        <TableContainer component={'div'}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left" width={'100%'}>
                  Название услуги
                </TableCell>
                <TableCell align="left">
                  <Box className={classes.dataFilter} onClick={onSortDirectionChange}>
                    <Typography className={classes.headerCellText}>Дата</Typography>
                    <FilterUpDown reverse={sortOrder === 'desc'} />
                  </Box>
                </TableCell>
                <TableCell align="left">Сумма</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((row) => (
                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row" width={'100%'}>
                    {row.purchase_tariff?.name || 'Неизвестно'}
                  </TableCell>
                  <TableCell>{MadFormatter.toFormalRusDate(new Date(row.created_at))}</TableCell>
                  <TableCell>
                    <Price number={row.value} status={row.status} type={row.type} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={12}>
        <CustomPagination
          page={pagination.currentPage}
          count={pagination.totalPages}
          onChange={(e, val) => onPageChange(val)}
        />
      </Grid>
    </Grid>
  );
};

export default SubtractHistory;
