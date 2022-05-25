import Axios from 'axios';
import { makeUseAxios } from 'axios-hooks';

import config from 'config';

export const useCustomAxios = makeUseAxios({
  axios: Axios.create({
    baseURL: config.DATATA_URI,
    headers: {
      'Content-Type': 'application/json',
      'authorization': 'Token ' + config.DADATA_API_KEY,
      'X-Secret': config.DADATA_SECRET_KEY,
    },
  }),
});

export const useVKAxios = makeUseAxios({
  axios: Axios.create({
    baseURL: 'http://localhost:8010/proxy/method',
  }),
});
