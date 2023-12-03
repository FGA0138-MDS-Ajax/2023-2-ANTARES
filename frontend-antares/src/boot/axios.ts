import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

// const api = axios.create({ baseURL: 'httpnpm ://localhost:9999/api/' });

const api = axios.create({ baseURL: 'https://backend-antares-deploy.onrender.com/api/' });

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
});

export { api };
