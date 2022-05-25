import { Line } from 'react-chartjs-2';
import useAxios from 'axios-hooks';
import moment from 'moment';
import { useRouter } from 'next/router';

import { Box, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import { blueMain } from 'styles/colorPalette';
import { SelectText } from 'components/Select';
import { OverlayLoader } from 'components/Loaders';

const maxOption = (numbers) => {
  const max = Math.max.apply(null, numbers);
  return max;
};

const prepareOptions = ({ max, labels, period, view }) => ({
  responsive: true,
  animation: { duration: 0 },
  maintainAspectRatio: false,
  layout: {
    padding: {
      top: 5,
    },
  },
  interaction: {
    intersect: false,
  },
  scales: {
    y: {
      grid: { display: false },
      display: false,
      suggestedMin: 0,
      suggestedMax: max == 0 ? 10 : max,
      grace: '5%',
    },
    x: {
      grid: { display: false, borderColor: 'transparent' },
      barPercentage: 0.9,
      categoryPercentage: 0.55,
      ticks: {
        autoSkip: false,
        maxRotation: 0,
        minRotation: 0,
      },
    },
  },
  elements: {
    point: {
      radius: 0.05,
      borderColor: 'transparent',
      hoverRadius: 6,
      hoverBorderWidth: 3,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      position: 'average',
      yAlign: 'bottom',
      backgroundColor: blueMain,
      padding: 12,
      cornerRadius: 10,
      displayColors: false,
      caretPadding: 3,
      callbacks: {
        label: function (tooltipItem) {
          if (view == 'employer') {
            if (period === 'month') {
              return `Откликов: ${tooltipItem.formattedValue} - ${labels[tooltipItem.dataIndex]}`;
            }
            return `Откликов: ${tooltipItem.formattedValue}`;
          }
          if (period === 'month') {
            return `Приглашений: ${tooltipItem.formattedValue} - ${labels[tooltipItem.dataIndex]}`;
          }
          return `Приглашений: ${tooltipItem.formattedValue}`;
        },
        title: function () {
          return;
        },
      },
    },
  },
});

const useStyles = makeStyles<any>((theme) => ({
  canvaxBox: {
    position: 'relative',
    backgroundColor: '#F8F9FC',
    borderRadius: 20,
    overflow: 'hidden',
    height: '100%',
    minHeight: 350,
  },
  canvas: {
    width: '100%',
    height: 277,
  },
  title: {
    fontSize: theme.typography.pxToRem(18),
    fontFamily: 'inter-bold',
  },
  labelBox: {
    'padding': '0px 10px',
    'display': 'flex',
    'position': 'absolute',
    'bottom': 8,
    'justifyContent': 'space-between',
    'width': '100%',
    '& p': {
      fontSize: theme.typography.pxToRem(12),
      color: '#797C8C',
    },
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingBottom: 0,
    marginBottom: 10,
  },
}));
//Это все надо для создания градиентного фона
const getData = (canvas, data, period) => {
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createLinearGradient(0, 50, 0, 230);
  gradient.addColorStop(0, '#C7D7FF');
  gradient.addColorStop(0.6, '#DCE5FC');
  gradient.addColorStop(1, '#F7F9FC');

  const gradientLine = ctx.createLinearGradient(0, 0, 780, 0);
  gradientLine.addColorStop(0, '#C7D7FF');
  gradientLine.addColorStop(0.3, '#3770FF');
  gradientLine.addColorStop(0.5, '#6B95FF');
  gradientLine.addColorStop(0.8, '#3770FF');
  gradientLine.addColorStop(1, '#C7D7FF');

  const numbers = data.map((item) => item.value);

  let labels = data.map((item) => moment(item.title).format('MMM'));
  let unfilteredLabels = [];

  if (period === 'month') {
    const nth = 3;
    unfilteredLabels = data.map((item) => moment(item.title).format('DD MMM'));
    labels = data.map((item, i) => (i % nth === nth - 1 ? moment(item.title).format('DD MMM') : ''));
  }

  if (period === 'week') {
    labels = data.map((item) => moment(item.title).format('ddd'));
  }

  return {
    chartData: {
      labels,
      datasets: [
        {
          fill: 'start',
          backgroundColor: gradient,
          borderColor: gradientLine,
          borderWidth: 3,
          data: numbers,
          cubicInterpolationMode: 'monotone',
        },
      ],
    },
    labels,
    numbers,
    unfilteredLabels,
  };
};

const filterOptions = [
  { value: 'year', label: 'Год' },
  { value: 'month', label: 'Месяц' },
  { value: 'week', label: 'Неделю' },
];

const Invites = ({ title = 'Общая статистика приглашений', view = 'employer' }) => {
  const classes = useStyles();
  const router: any = useRouter();

  const { period } = router.query;
  const periodValue = period || 'year';

  const [{ data, loading }] = useAxios(`/profile/statistics/responses?period=${periodValue}`);

  const handleChange = (e) => {
    router.push({ query: { period: e.target.value } });
  };

  if (loading) {
    return <OverlayLoader />;
  }
  const canvas = document.createElement('canvas');
  const chart = getData(canvas, data.data, periodValue);
  const options = prepareOptions({
    max: maxOption(chart.numbers),
    labels: chart.unfilteredLabels,
    period: periodValue,
    view: view,
  });
  return (
    <Box className={classes.canvaxBox}>
      <Box className={classes.header}>
        <Typography className={classes.title}>{title}</Typography>
        <SelectText
          label={'Сортировать за'}
          options={filterOptions}
          selectedValue={periodValue}
          onChange={handleChange}
        />
      </Box>
      <Box className={classes.canvas}>
        {/*@ts-ignore*/}
        <Line data={chart.chartData} type="line" options={options} />
      </Box>
    </Box>
  );
};

export default Invites;
