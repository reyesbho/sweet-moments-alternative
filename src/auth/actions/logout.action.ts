import { signOut } from "firebase/auth";
import { authFirebase } from "@/firebase";

export const logoutAction = async (): Promise<void> => {
    try {
        await signOut(authFirebase);
    } catch (error) {
        throw error;
    }
}