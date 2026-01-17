import { useAuthStore } from '@/auth/store/auth.store';
import axios from 'axios'

const momentsApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
})

// RESPONSE (AQUÍ va el logout)
momentsApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const {logout} = useAuthStore()
    if (error.response?.status === 401) {
      await logout();
    }

    return Promise.reject(error);
  }
);
export { momentsApi };
