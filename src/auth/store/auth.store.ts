
import { create } from 'zustand'
import { loginAction } from '../actions/login.action'
import { checkAuthAction } from '../actions/check-auth.action';
import { registerAction } from '../actions/register.action';
import type { User } from '../interface/user.interface';
import { logoutAction } from '../actions/logout.action';

type AuthStatus = 'Authenticated' | 'not-authenticated' | 'checking';

type Auth = {
    //properties
    user: User | null,
    token: string | null,
    authStatus: AuthStatus,
    
    //getters
    isAdmin: () => boolean,

    //actions
    register: (email: string, password: string, fullName: string) => Promise<boolean>,
    login: (email: string, password: string) => Promise<boolean>,
    logout: () => void,
    checkAuthStatus: () => Promise<boolean>
}

export const useAuthStore = create<Auth>()((set, get) => ({
    user: null,
    token: null,
    authStatus: 'checking',
    // TODO cambiar 
    isAdmin: () => true,
    // isAdmin: () => {
    //     const roles = get().user?.roles || [];
    //     return roles.includes('admin');
    // },
    register: async (email: string, password: string, fullName) => {
        try {
            const data = await registerAction(email, password, fullName);
            set({ user: {email, displayName: fullName}, token: data.accessToken, authStatus: 'Authenticated'});
            return true;
        } catch (error) {
            set({ user: null, token: null, authStatus: 'not-authenticated'});
            localStorage.removeItem('token')
            return false;
        }
    },
    login: async (email: string, password: string) => {
        try {
            const data = await loginAction(email, password);
            set({ user: {email, displayName: data.displayName}, token: data.accessToken, authStatus: 'Authenticated'});
            return true;
        } catch (error) {
            set({ user: null, token: null, authStatus: 'not-authenticated'});
            localStorage.removeItem('token')
            return false;
        }
    },
    logout: async() => {
        await logoutAction();
        set({ user: null, token: null, authStatus:'not-authenticated'});
    },
    checkAuthStatus: async() => {
        try{
            const {accessToken} = await checkAuthAction();
            set({ user:get().user , token: accessToken, authStatus: 'Authenticated'});
            return true;
        }catch(error){
            set({ user: undefined, token: undefined, authStatus: 'not-authenticated'});
            return false;
        }
    }
}))
