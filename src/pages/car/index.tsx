import { getDoc, doc } from "firebase/firestore"
import { database } from "../../services/firebaseConnection"
import { Container } from "../../components/container"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { BsWhatsapp } from "react-icons/bs"
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from "react-router-dom"

interface CarsProps {
    id: string
    name: string;
    model: string;
    year: string;
    km: string;
    tel: string;
    city: string;
    price: string | number;
    description: string;
    uid: string;
    username: string;
    images: ImageProps[];
}
interface ImageProps {
    name: string;
    uid: string;
    url: string;
}

export function CarDetail() {
    const { id } = useParams();
    const [car, setCar] = useState<CarsProps>()
    const [slides, setSlides] = useState<number>(2)
    const navigate = useNavigate()

    useEffect(() => {
        function handleLoadcar() {
            if (!id) { return }
            const carset = doc(database, "cars", id)
            getDoc(carset)
                .then((snapshot) => {
                    if(!snapshot.data()){
                        navigate("/")
                        
                    }
                    setCar({
                        id: snapshot.id,
                        name: snapshot.data()?.name,
                        model: snapshot.data()?.model,
                        year: snapshot.data()?.year,
                        km: snapshot.data()?.km,
                        tel: snapshot.data()?.tel,
                        city: snapshot.data()?.city,
                        price: snapshot.data()?.price,
                        description: snapshot.data()?.description,
                        uid: snapshot.data()?.uid,
                        username: snapshot.data()?.username,
                        images: snapshot.data()?.images
                    })
      })
        }
        handleLoadcar()
    }, [id])

    useEffect(() => {
        function handleGetsize(){
            if(innerWidth < 720){
                setSlides(1)
            }else{
                setSlides(2)
            }
        }

        handleGetsize();
          window.addEventListener("resize", handleGetsize)

          return(() => {
            window.removeEventListener("rezise", handleGetsize)
          })
     
    },[])

    return (
        
        <Container>
            <div>
           {car &&  
           <Swiper
            slidesPerView={slides}
            pagination={{clickable: true}}
            navigation
            >
                {car?.images.map(image => (
                    <SwiperSlide key={image.name}> 
                    <img className="object-cover w-full shadow-md " src={image.url} />
                    </SwiperSlide>
                ))} 
            </Swiper>}
            </div>
            <div className="bg-white rounded-lg px-4 py-6 flex w-full flex-col  shadow-md">
                <div className="font-bold text-2xl flex w-full justify-between mb-1">
                    <span>{car?.name}</span>
                    <span>R$ {car?.price}</span>
                </div>

                <p className="text-gray-600 mb-4">{car?.model}</p>
                <div className="flex w-4/12 justify-between">

                    <div className="mb-4">
                        <p className="text-gray-600 ">Cidade</p>
                        <strong>{car?.city}</strong>
                    </div>

                    <div>
                        <p className="text-gray-600">KM</p>
                        <strong>{car?.km}</strong>
                    </div>
                </div>

                <div className="mb-4">
                    <p className="text-gray-600">Ano </p>
                    <strong>{car?.year}</strong>
                </div>

                <strong>Descrição:</strong>
                <p className="mb-4">{car?.description}</p>

                <div>
                    <strong>Telefone / Whatsapp</strong>
                    <p className="text-gray-600 mb-4">{car?.tel}</p>
                </div>

                <Link to={`https://wa.me/${car?.tel}`} target="blank" className="bg-green-500 p-2 font-medium text-white rounded-lg flex items-center justify-center gap-2">
                    Conversar com vendedor <BsWhatsapp size={30} color="white" /> </Link>
            </div>
        </Container>

    )
}