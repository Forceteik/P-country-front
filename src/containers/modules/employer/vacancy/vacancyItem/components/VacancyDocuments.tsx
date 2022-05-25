import { Grid, Typography } from '@mui/material';

import TaskItem from 'containers/modules/employer/profile/Tasks/TaskItem';
import ShowTaskModal from 'containers/modules/common/modals/ShowTaskModal';

import { useStyles } from '../styles';

const VacancyDocuments = ({ vacancy, setOpenTaskShow, openTaskShow }) => {
  const classes = useStyles();
  return (
    <>
      <Grid item xs={12}>
        <Typography component="h2" className={classes.blockTitle}>
          Материалы для соискателя
        </Typography>
        <TaskItem item={vacancy.document} setOpenTaskShow={setOpenTaskShow} vacancy guest={true} />
        <ShowTaskModal item={vacancy.document} openTaskShow={openTaskShow} setOpenTaskShow={setOpenTaskShow} />
      </Grid>
    </>
  );
};
export default VacancyDocuments;
