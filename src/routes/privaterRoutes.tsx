import { useContext } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "../contexts/authContext";
import { Navigate } from "react-router-dom";
import loadingimage from '../assets/loading.svg'
import { Container } from "../components/container";

interface PrivateProps{
    children: ReactNode;
}

export function Private({children}: PrivateProps): any{
    const {signed} = useContext(AuthContext)
    const {loading} = useContext(AuthContext)
    

    if(loading){
        return(
            <Container>
            <div className="flex items-center justify-center h-full w-full">
                <img className="w-70 animate-spin h-70" 
                 src={loadingimage} alt="carregando" />
            </div>
            </Container>
        )
    }

    if(!signed){
     return <Navigate to= "/login"/>
    }
    
return children


}
