import { useState, useEffect, createContext, type ReactNode } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebaseConnection";

interface AuthProviderData {
    children: ReactNode
}

type AuthContextData = {
    signed: boolean;
    loading: boolean;
    handleUpdateUser: ({id,name,email}: UserContextProps ) => void
    user: UserContextProps | null
}

interface UserContextProps {
    id: string;
    name?: string | null;
    email?: string | null;
}

export const AuthContext = createContext({} as AuthContextData)

function AuthProvider({ children }: AuthProviderData) {
    const [user, setUser] = useState<UserContextProps | null>(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if(user){
                setUser({
                    id: user.uid,
                    name: user?.displayName,
                    email: user?.email
                })
                 setLoading(false)
            }else{
                setLoading(false)
                setUser(null)
            }
        })

        return (() => unsub())
    }, [])

    function handleUpdateUser({id, name, email}: UserContextProps){
        setUser({
            email,
            name,
            id
        })

    }

    return(
        <AuthContext.Provider value={{signed: !!user, loading, handleUpdateUser, user}}>
        {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider