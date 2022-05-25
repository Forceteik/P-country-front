import { Grid, Typography, useMediaQuery } from '@mui/material';

import useSettingsStyle from 'containers/modules/common/settings/style';

import IndividualRequisites from './IndividualRequisites';

const Requisites = (props) => {
  const { value = 0, index = 0 } = props;
  // const [active, setActive] = useState(0);
  const classes = useSettingsStyle();
  // const employer = useSession().currentUser.employer;

  // const handleSwitch = () => {
  //   if (active === 0) {
  //     setActive(1);
  //   } else {
  //     setActive(0);
  //   }
  // };

  // useEffect(() => {
  //   if (employer.company_type === 'entity') {
  //     setActive(1);
  //   }
  // }, []);

  const isMobile = useMediaQuery<any>((theme) => theme.breakpoints.down('sm'));
  return (
    <>
      {value === index && (
        <Grid container spacing={isMobile ? 3 : 4}>
          <Grid item xs={12}>
            <Grid container justifyContent="space-between" alignItems="center" spacing={isMobile ? 2 : 0}>
              <Grid item xs={12} sm={'auto'}>
                <Typography className={classes.sectionTitle} component="h2">
                  Реквизиты
                </Typography>
              </Grid>
              <Grid item xs={12} sm={'auto'}>
                {/*<DoubleSwitch*/}
                {/*  items={[{ label: "Юр.лицо" }, { label: "ИП" }]}*/}
                {/*  active={active}*/}
                {/*  className={classes.switch}*/}
                {/*  click={handleSwitch}*/}
                {/*/>*/}
              </Grid>
            </Grid>
          </Grid>
          <IndividualRequisites />
          {/*{active === 0 && <UrRequisites />}*/}
          {/*{active === 1 && <IndividualRequisites />}*/}
        </Grid>
      )}
    </>
  );
};

export default Requisites;
