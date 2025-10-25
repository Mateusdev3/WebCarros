import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebaseConnection";

export function PanelHeader(){

    async function handleSignOut(){
       await signOut(auth);
    }
    return (
        <header className="w-full bg-red-500 flex items-center justify-center gap-5 px-4 text-white font-medium  
        h-10 rounded-lg mb-4 text-xs md:text-lg">
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/dashboard/new">Cadastrar carro</Link>
            <button onClick={handleSignOut} className="ml-auto">Sair da conta</button>

        </header>
    )
}