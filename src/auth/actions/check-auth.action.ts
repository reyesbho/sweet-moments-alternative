import type { AuthResponse } from "../interface/AuhtResponse";
import { onAuthStateChanged } from "firebase/auth";
import { authFirebase } from "@/firebase";
import { authMomentsAction } from "./login.action";
import { logoutAction } from "./logout.action";

export const checkAuthAction = async (): Promise<AuthResponse> => {
    return new Promise((resolve, reject) => {
        try {
            onAuthStateChanged(authFirebase, async (user) => {
                if (user) {
                    const authUser = {
                        accessToken: await user.getIdToken(),
                        displayName: user.displayName ?? '',
                        email: user.email ?? '',
                        emailVerified: user.emailVerified,
                        uid: user.uid
                    } as AuthResponse;
                    //auth backend
                    try {
                        const response = await authMomentsAction(authUser);
                        if (response.status !== 200) {
                            logoutAction();
                            throw new Error('Error al authenticarse')
                        }
                    } catch {
                        logoutAction();
                        throw new Error('Error al authenticarse')
                    }

                    resolve(authUser);


                } else {
                    reject(new Error('Token not valid'));
                }
            });
        } catch (error) {
            reject(new Error('Token not valid'));
        }
    });
}