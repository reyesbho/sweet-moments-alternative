import { authFirebase } from "@/firebase";
import type { AuthResponse } from "../interface/AuhtResponse";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { authMomentsAction } from "./login.action";
import { logoutAction } from "./logout.action";

export const registerAction = async (email: string, password: string, fullName: string): Promise<AuthResponse> => {
    try {
        const userCredentials = await createUserWithEmailAndPassword(
            authFirebase,
            email,
            password
        );

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