import { useAuthStore } from '@/auth/store/auth.store';
import axios from 'axios'

const momentsApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
})

// RESPONSE (AQUÍ va el logout)
// useAuthStore.getState() en lugar de useAuthStore() porque los interceptores
// de Axios no son componentes React y no pueden llamar hooks directamente
momentsApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const { logout } = useAuthStore.getState();
      await logout();
    }

    return Promise.reject(error);
  }
);
export { momentsApi };
