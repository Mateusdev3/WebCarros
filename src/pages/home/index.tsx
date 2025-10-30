import { Container } from "../../components/container";
import { useState, useEffect } from "react";
import { query, collection, getDocs, orderBy } from "firebase/firestore";
import { database } from "../../services/firebaseConnection";
import { BiLoaderAlt } from "react-icons/bi";


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

export function Home() {    


    const [cars, setCars] = useState<CarsProps[]>([])
    const [images, setImages] = useState<string[]>([])


    useEffect(() => {

        function handleLoadCars(){
            const carsref = collection(database, "cars")
            const orderfef = query(carsref, orderBy("created", "desc"))

             getDocs(orderfef)
            .then((snapshot) => {
                let listcars = [] as CarsProps[];
                snapshot.forEach(doc => {
                    listcars.push({
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
                })
                 setCars(listcars)
            })
        }

        handleLoadCars()

    }, [])

    function handleLoading(id : string){
        setImages((datapreview) => [...datapreview, id])
       
    }

    return (
        <Container>

            <section className="flex justify-center items-center mx-auto gap-4 bg-gray-50 max-w-3xl rounded-lg h-15 shadow-md px-4 w-full ">
                <input className="w-10/12 border-slate-400 p-1 px-2 border-1 rounded-lg "
                    placeholder="Insira o nome do veiculo..." />

                <button className="bg-red-600 px-4 py-1 rounded-lg text-white font-semibold cursor-pointer">
                    Buscar
                </button>
            </section>
            
            <h1 className="text-center font-medium text-2xl py-8">Carros novos e usados em todo Brasil</h1>

            <main className="grid grid-cols-1 w-full max-w-7xl md:grid-cols-2 lg:grid-cols-3 gap-6 ">
               {cars !== null && cars.map(cars => (
                 <section key={cars.id} className="flex flex-col shadow-md p-2 rounded-lg hover:scale-105 transition-transform min-h-12/12 bg-white">
                    <img className="rounded-lg"
                    src={cars.images[0].url} alt="Carroimg"
                    onLoad={() => handleLoading(cars.id)} />
                    <div className="bg-red-500 w-full rounded-lg mx-auto min-h-full flex items-center justify-center mb-10"
                    style={{display: images.includes(cars.id) ? "none" : "flex",     
                     }}>
                    <BiLoaderAlt size={80} color="white"  className="animate-spin h-full"/>
                    </div>
                    
                    <strong className="py-2">{cars.name}</strong>
                    <div className="flex flex-col gap-5">
                        <span className="text-zinc-600">{cars.year} | {cars.km}</span>
                        <strong>R$ {cars.price}</strong>
                    </div>
                    <div className="bg-gray-300 h-px mt-2 mb-2"> </div>
                    <span>{cars.city}</span>
                </section>
               ))}
            </main>
        </Container>
    )
}
