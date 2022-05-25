import { useEffect, useState } from 'react';
import useAxios from 'axios-hooks';
import { toast } from 'react-toastify';

import { Typography, Grid } from '@mui/material';

import Button from 'components/Button';
import TextField, { NumberFormatCustom } from 'components/TextField';
import DangerBlock from 'containers/modules/employer/balance/components/Danger';
import Autocomplete from 'components/Autocomplete';
import { darkGray } from 'styles/colorPalette';
import { Rules } from 'utils/validators';

import { useItemStyles } from '../../styles';
import AddInn from '../AddInn';

const companyInit = {
  label: '',
  value: {
    id: null,
    name: '',
    inn: 0,
    kpp: 0,
  },
};

const CheckStep = ({
  addMoney,
  onMoneyChange,
  openAddInnBlock,
  handleAddInn,
  setOpenAddInnBlock,
  setPage,
  userEmail,
}) => {
  const classes = useItemStyles();

  const [companiesOptions, setCompaniesOptions] = useState([companyInit]);
  const [selectedCompany, setSelectedCompany] = useState(companyInit);

  const [, getUserCompanies] = useAxios({ url: '/companies/my', method: 'get' }, { manual: true });
  const [, deleteUserCompany] = useAxios({ method: 'delete' }, { manual: true });
  const [{ loading: depositPaymentLoading }, depositPayment] = useAxios(
    { url: 'payment/cashless/deposit', method: 'post' },
    { manual: true },
  );

  useEffect(() => {
    getUserCompaniesAndSelect({ inn: null, kpp: null });
  }, []);

  const getUserCompaniesAndSelect = ({ inn, kpp }) => {
    handleGetUserCompanies().then((companiesOptionsFromServer) => {
      companiesOptionsFromServer.forEach((item) => {
        if ((!inn || !kpp) && item.value.id === null) {
          setSelectedCompany(item);
          return;
        }

        if (item.value.inn == inn && item.value.kpp == kpp) {
          setSelectedCompany(item);
        }
      });
    });
  };

  const handleDeleteUserCompany = (id) => {
    deleteUserCompany({ url: `/companies/${id}` }).then(() => {
      getUserCompaniesAndSelect({ inn: null, kpp: null });
    });
  };

  const handleGetUserCompanies = () => {
    return getUserCompanies().then(({ data }) => {
      if (data.data) {
        const mutatedData = data.data.map((item) => {
          return {
            label: item.registration_number + ' - ' + item.name,
            value: {
              id: item.id,
              name: item.name,
              inn: item.registration_number,
              kpp: item.additional_registration_number,
            },
            onOptionRemove: () => handleDeleteUserCompany(item.id),
          };
        });

        setCompaniesOptions(mutatedData);

        // Возвращаем промис и мутированные данные, чтобы в дальнейших then мы могли их использовать не дожидаясь выполнения setCompaniesOptions
        return mutatedData;
      }
    });
  };

  const handleAddInnSubmit = ({ inn, kpp }) => {
    getUserCompaniesAndSelect({ inn: inn, kpp: kpp });
  };

  const handleCompanyChange = (e, option) => {
    if (option) {
      setSelectedCompany(option);
    } else {
      setSelectedCompany(companyInit);
    }
  };

  const handleSubmit = () => {
    depositPayment({
      data: {
        sum: addMoney.value,
        company_id: selectedCompany.value.id,
      },
    })
      .then(() => {
        setPage('success');
      })
      .catch(() => {
        toast.error('Ошибка при формировании счёта. Пожалуйста, попробуйте позже или обратитесь в поддержку');
      });
  };

  return (
    <Grid container rowSpacing={3}>
      <Grid item xs={12}>
        <TextField
          small
          name="addMoney"
          label="Вы пополняете"
          placeholder="₽"
          fullWidth
          value={addMoney.value}
          rules={[[Rules.GT, 0], [Rules.LT, 999999999999], Rules.REQUIRED]}
          onChange={onMoneyChange}
          InputProps={{ inputComponent: NumberFormatCustom }}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12}>
        <DangerBlock
          text={
            'В целях сокращения нагрузки на бухгалтерию рекомендуем проводить оплаты корпоративной картой, привязанной к расчетному счету. Вместо закрывающих документов вам автоматически придет кассовый чек.'
          }
        />
      </Grid>
      <Grid item xs={12}>
        <Grid container rowSpacing={2}>
          <Grid item xs={12}>
            <Typography className={classes.boldDescr}>
              Выберите реквизиты организации, на которую выставить счет
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.mainDescr} textAlign="left">
              Будет сформирован счёт на оплату по реквизитам компании, которые вы укажете. Средства будут зачислены на
              ваш баланс только после обработки платежа по счету.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container rowSpacing={3}>
          {!openAddInnBlock && (
            <Grid item xs={6}>
              <Autocomplete
                small
                value={selectedCompany}
                onChange={handleCompanyChange}
                autoHighlight
                options={companiesOptions}
                column={1}
                clearIcon={null}
                label="Организации"
                noOptionsText={'Организация не найдена. Пожалуйста, проверьте правильность введенных данных'}
                disabled={companiesOptions.length === 1 && selectedCompany.value.id === null}
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <AddInn
              handleAddInn={handleAddInn}
              onSubmit={handleAddInnSubmit}
              openAddInnBlock={openAddInnBlock}
              setOpenAddInnBlock={setOpenAddInnBlock}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography color={darkGray} fontSize={14} textAlign={'left'}>
          Копия счёта будет отправлена на Email {userEmail}
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Button
          fullWidth
          small
          loading={depositPaymentLoading}
          onClick={handleSubmit}
          disabled={!selectedCompany.value.inn || !addMoney.value}
        >
          Сформировать счет
        </Button>
      </Grid>
    </Grid>
  );
};

export default CheckStep;
