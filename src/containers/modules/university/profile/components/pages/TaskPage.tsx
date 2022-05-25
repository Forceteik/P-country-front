import cx from 'classnames';

import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { HugButton } from 'components/Button';
import { useTableStyles } from 'containers/modules/common/styles/tableStyles';

import PageTitle from '../PageTitle';

const useStyles = makeStyles(() => ({
  taskPage: {
    width: '100%',
    maxWidth: 1500,
  },
  taskPageTable: {
    '& .MuiTableContainer-root': {
      backgroundColor: '#fff',
      borderRadius: '8px',
    },
  },
}));

const tableData = [
  {
    id: 1,
    name: 'Ознакомьтесь с контентом для продвижения ОУ среди обучающихся',
    btnName: 'Просмотреть',
    btnLink: 'https://docs.google.com/document/d/1NQRnFPOorpc7wTCWL1C_c2Jdv6f-XeUs-BafFD8O1pg/edit',
    linkProps: { target: '_blank' },
  },
  {
    id: 2,
    name: 'Заполните основную информацию об образовательном учреждении',
    btnName: 'Заполнить',
    btnLink: '#',
    linkProps: null,
  },
];

const TaskPage = () => {
  const classesTable = useTableStyles();
  const classes = useStyles();

  return (
    <Box className={classes.taskPage}>
      <Grid container rowSpacing={4}>
        <Grid item xs={12}>
          <PageTitle text="Список задач" />
        </Grid>
        <Grid item xs={12} className={cx(classesTable.table, classes.taskPageTable)}>
          <TableContainer component={'div'}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Название задачи</TableCell>
                  <TableCell align="left">Действие</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((item) => (
                  <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {item.name}
                    </TableCell>
                    <TableCell sx={{ width: '230px' }}>
                      <HugButton fullWidth nextLink linkProps={{ href: item.btnLink }} nativelinkprops={item.linkProps}>
                        {item.btnName}
                      </HugButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TaskPage;
