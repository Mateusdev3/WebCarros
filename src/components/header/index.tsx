
import { Link } from "react-router-dom"
import logo from "../../assets/logo.svg"
import { FiLogIn, FiUser } from "react-icons/fi";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";

export function Header() {
    const {signed, loading} = useContext(AuthContext)
    console.log(signed, loading)

    return (
        <div className="w-full shadow-md shadow-gray-200 mb-4 max-w-7xl flex mx-auto bg-gray-50 rounded-lg">
            <header className="w-full px-4 py-2 flex justify-between items-center h-15 ">

                <Link to="/">
                <img src={logo} alt="logoimg"  />
                </Link>

               {signed && !loading &&(
                <div className="border-1 rounded-full p-1 border-gray-900">
                <Link to="dashboard">
                <FiUser size={25}/> 
                </Link>
                </div>
                
               )}

               {!signed && !loading &&(
                 <div className="border-1 rounded-full p-1 border-gray-900">
                <Link to="login">
                <FiLogIn size={25}/> 
                </Link>
                </div>
               )}
            </header>
        </div>
    )

}