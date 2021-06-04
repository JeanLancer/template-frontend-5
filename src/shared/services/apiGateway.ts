import axios from 'axios';
import config from '../config/index';

const apiGateway = axios.create({
  baseURL: 'https://ecommerce.eflorista.com.br/api/v1',
  // baseURL: 'http://localhost:3222/api/v1',
  headers: {
    credentials: `STORE_${config.KEY}`
  }
});

export const apiEflorista = axios.create({
  baseURL: 'https://app.eflorista.com.br/api/v1',
  // baseURL: 'http://localhost:3222/api/v1',
  headers: {
    store_id: config.KEY
  }
});

export default apiGateway;
