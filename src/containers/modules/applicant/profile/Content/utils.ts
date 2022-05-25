import { blueLight, blueMain, greenMain, orangeMain, pinkMain } from 'styles/colorPalette';

// у теста result = null когда статус теста = process
export const generateAbilityData = (ability) => {
  if (!ability) {
    return [];
  }

  return ability.map((item) => ({
    name: item.test.name,
    progress: item.result?.percent_points || 0,
    status: item.status,
    color: generatePercentColor(item.result?.percent_points || 0),
  }));
};

// у теста result = null когда статус теста = process
export const generateIQData = (iq) => {
  if (!iq) {
    return [];
  }
  return iq.map((item) => ({
    name: item.test.name,
    progress: item.result?.percent_points || 0,
    status: item.status,
    color: generatePercentColor(item.result?.percent_points || 0),
  }));
};

// у теста result = null когда статус теста = process
export const generateSocialData = (social) => {
  if (!social) {
    return [];
  }

  return social.map((item) => ({
    name: item.test.name,
    progress: item.result?.points_percent || 0,
    status: item.status,
    color: generatePercentColor(item.result?.points_percent || 0),
  }));
};

export const generatePercentColor = (value) => {
  if (value <= 30) {
    return pinkMain;
  }
  if (value > 30 && value <= 80) {
    return orangeMain;
  }

  if (value > 80) {
    return greenMain;
  }
  return blueMain;
};

export const generateRadarData = (items) => {
  const labels = [];
  const datasets = [
    {
      label: '',
      data: [],
      backgroundColor: blueLight,
      borderColor: blueMain,
      borderWidth: 2,
    },
  ];
  items
    .filter((item) => item.role !== 'yn') // remove universal
    .forEach((item) => {
      labels.push(item.data.name);
      datasets[0].data.push(item.value);
    });

  return {
    labels,
    datasets,
  };
};
