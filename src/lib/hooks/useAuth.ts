import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../clientApp";

export default function useAuth() {
    const [user, setLocalUser] = useState<any | null>(null);
    useEffect(() => {
        const unsubcribe = onAuthStateChanged(auth, (user: any) => {
            if(user) {
                console.log('There is a user.');
                setLocalUser(user);
            } else {
                console.log('There is no user.')
            }
        })
        return () => unsubcribe();
    }, [])
    return user;
}
