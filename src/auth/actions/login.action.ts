import { signInWithEmailAndPassword, type UserCredential } from "firebase/auth";
import type { AuthResponse } from "../interface/AuhtResponse";
import { authFirebase } from "@/firebase";
import { momentsApi } from "@/api/moments.api";
import { logoutAction } from "./logout.action";

export const loginAction = async (email: string, password: string): Promise<AuthResponse> => {
    try {

        const userCredentials: UserCredential = await signInWithEmailAndPassword(
            authFirebase,
            email,
            password
        );
        console.log(userCredentials.user)
        const authCredentials = {
            accessToken: await userCredentials.user.getIdToken(),
            displayName: userCredentials.user.displayName ?? '',
            email: userCredentials.user.email ?? '',
            emailVerified: userCredentials.user.emailVerified,
            uid: userCredentials.user.uid
        } as AuthResponse;
        //auth backend
        try {
            const response = await authMomentsAction(authCredentials);
            if (response.status !== 200) {
                logoutAction();
                throw new Error('Error al authenticarse')
            }
        } catch {
            logoutAction();
            throw new Error('Error al authenticarse')
        }


        return authCredentials;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const authMomentsAction = async (auth: AuthResponse) => {
    try {
        return await momentsApi.post('/user/auth', {
            idToken: auth.accessToken
        });
    } catch (error) {
        throw new Error('Error al authenticarse')
    }
}