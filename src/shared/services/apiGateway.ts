import axios from 'axios';

const apiGateway = axios.create({
  baseURL: 'https://ecommerce.eflorista.com.br/api/v1',
  // baseURL: 'http://localhost:3222/api/v1',
  headers: {
    credentials: 'STORE_7431e723-90ad-406c-b98a-1a8c9818023d'
  }
});

export default apiGateway;
