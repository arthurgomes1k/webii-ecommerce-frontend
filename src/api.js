import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/api',
});

instance.interceptors.request.use(
  (config) => {
    // Verifica se o token está presente no localStorage
    const token = localStorage.getItem('token');

    // Se o token estiver presente, adiciona ao cabeçalho de autorização
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;