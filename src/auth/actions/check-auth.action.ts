import type { AuthResponse } from "../interface/AuhtResponse";
import { onAuthStateChanged } from "firebase/auth";
import { authFirebase } from "@/firebase";
import { authMomentsAction } from "./login.action";
import { logoutAction } from "./logout.action";

export const checkAuthAction = (): Promise<AuthResponse | null> => {
    return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(authFirebase, async (user) => {
            unsubscribe();
            if (!user) {
                return resolve(null);
            }
            try {
                const authUser: AuthResponse = {
                    accessToken: await user.getIdToken(),
                    displayName: user.displayName ?? '',
                    email: user.email ?? '',
                    emailVerified: user.emailVerified,
                    uid: user.uid,
                };
                // 🔥 VALIDAR CON BACKEND
                const response = await authMomentsAction(authUser);
                if (response.status !== 200) {
                    await logoutAction();
                    return resolve(null);
                }
                resolve(authUser);
            } catch {
                await logoutAction();
                resolve(null);
            }
        });
    });
}