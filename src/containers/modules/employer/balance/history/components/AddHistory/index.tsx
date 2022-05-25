import useAxios from 'axios-hooks';
import { toast } from 'react-toastify';
import { useState } from 'react';
import cx from 'classnames';

import {
  Grid,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Box,
  Hidden,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import { blueMain } from 'styles/colorPalette';
import Paper from 'components/icons/Paper';
import CustomPagination from 'components/CustomPagination';
import FilterUpDown from 'components/icons/FilterUpDown';
import { MadFormatter } from 'utils/formatters';
import { useTableStyles } from 'containers/modules/common/styles/tableStyles';

import { useBalanceTableStyles } from '../../tableStyles';
import Price from '../Price';

import MobileItems from './MobileItems';

const AddHistory = ({ items, pagination, sortOrder, onPageChange, onSortDirectionChange }) => {
  const classes = useBalanceTableStyles();
  const classesTable = useTableStyles();

  const [pdfDownloadingId, setPdfDownloadingId] = useState(null);

  const [, getPdf] = useAxios(
    {
      method: 'GET',
      responseType: 'blob',
    },
    { manual: true },
  );

  const handleDownloadPdf = (item) => () => {
    setPdfDownloadingId(item.id);
    if (item.status === 'processing') {
      getPdf({
        url: `/payment/transactions/${item.id}/download-bill`,
      })
        .then((data) => {
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(data.data);
          link.download = `p-strana_bill_${MadFormatter.toFormalRusDate(new Date(item.created_at))}.pdf`;
          link.click();
          setPdfDownloadingId(null);
        })
        .catch(() => {
          toast.error('Ошибка скачивания счета на оплату. Пожалуйста, обратитесь в поддержку');
          setPdfDownloadingId(null);
        });
      return;
    }

    toast.error('Ошибка скачивания счета на оплату. Пожалуйста, обратитесь в поддержку');
    setPdfDownloadingId(null);
    return;
  };

  return (
    <Grid container rowSpacing={{ xs: 2.5, sm: 4 }} className={cx(classesTable.table, classes.addHistory)}>
      <Hidden smDown>
        <Grid item xs={12}>
          <TableContainer component={'div'}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left" width={'100%'}>
                    Способ пополнения
                  </TableCell>
                  <TableCell align="left">
                    <Box className={classes.dataFilter} onClick={onSortDirectionChange}>
                      <Typography className={classes.headerCellText}>Дата</Typography>
                      <FilterUpDown reverse={sortOrder === 'desc'} />
                    </Box>
                  </TableCell>
                  <TableCell align="left">Сумма</TableCell>
                  <TableCell align="left">Скачать</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((row) => (
                  <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row" width={'100%'}>
                      {(row?.deposit_method === 'acquiring' ? 'Банковской картой' : 'По счёту') || 'Неизвестно'}
                    </TableCell>
                    <TableCell>{MadFormatter.toFormalRusDate(new Date(row.created_at))}</TableCell>
                    <TableCell>
                      <Price number={row.value} status={row.status} type={row.type} />
                    </TableCell>
                    <TableCell>
                      {row.deposit_method === 'cashless' && row.type === 'deposit' && row.status === 'processing' && (
                        <Box className={classes.download} onClick={handleDownloadPdf(row)}>
                          <Typography className={classes.downloadText}>Скачать</Typography>
                          {pdfDownloadingId === row.id ? (
                            <CircularProgress size={13.62} />
                          ) : (
                            <Paper color={blueMain} width="13.62" height="14.93" />
                          )}
                        </Box>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Hidden>

      <Hidden smUp>
        <Grid item xs={12}>
          <MobileItems items={items} />
        </Grid>
      </Hidden>

      {pagination.totalPages > 1 && (
        <Grid item xs={12}>
          <CustomPagination
            page={pagination.currentPage}
            count={pagination.totalPages}
            onChange={(e, val) => onPageChange(val)}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default AddHistory;
