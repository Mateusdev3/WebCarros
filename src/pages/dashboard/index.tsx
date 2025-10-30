import { BiTrashAlt } from "react-icons/bi";
import { Container } from "../../components/container";
import { PanelHeader } from "../../components/panelheader";
import { query, collection, where, getDocs, deleteDoc, doc  } from "firebase/firestore";
import { database } from "../../services/firebaseConnection";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/authContext";

interface CarsProps{
    id: string
    name: string;
    model: string;
    year:string;
    km:string;
    tel: string;
    city: string;
    price: string | number;
    description: string;
    uid: string;
    username: string;
    images: ImageProps[];
}

interface ImageProps{
    name: string;
    uid: string;
    url: string;
}

export function Dashborad(){
    const {user} = useContext(AuthContext)
    const [cars, setCars] = useState<CarsProps[]>([])

    useEffect(() => {

        function handleGetData(){
            const carsRef = collection(database, "cars")
            const orderRef = query(carsRef, where("uid", "==", user?.id))
            getDocs(orderRef).then((snapshot) => {

               let carlist = [] as CarsProps[];

               snapshot.forEach(doc => {
                carlist.push({
                    id: doc.id,
                    name: doc.data().name,
                    model: doc.data().model,
                    year: doc.data().year,
                    km: doc.data().km,
                    tel: doc.data().tel,
                    city: doc.data().city,
                    price: doc.data().price,
                    description: doc.data().description,
                    uid: doc.data().uid,
                    username: doc.data().username,
                    images: doc.data().images
                })
                setCars(carlist)
               })
            })}
        handleGetData()
}, [user])

    function handleDelete(data: string){
        const carsRef = doc(database, "cars", data)
        deleteDoc(carsRef)
    }
    return(
       <Container>
        <PanelHeader/>
           <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cars.map(data => (
            <section key={data.id} className="relative bg-white w-full h-full p-2 rounded-lg flex flex-col gap-2 shadow-md transition-transform hover:scale-105">
                <img src={data.images[0].url}
                className="rounded-lg"/>
                <button onClick={() => handleDelete(data.id)}>
                <BiTrashAlt size={50} className="bg-white absolute rounded-full p-2 right-4 top-3 shadow-md hover:scale-105"/>
                </button>
                <p className="font-bold">{data.name}</p>
                <div className="mb-5">
                    <span className="text-gray-600">{data.year} | {data.km}</span>
                </div>
                <strong className="text-lg">RS$ {data.price}</strong>
                <div className="h-px bg-gray-300"></div>
                <p>{data.city}</p>
            </section>
        ))}
           </main>
        </Container>
        
    )
}