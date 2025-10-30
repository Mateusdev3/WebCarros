import { BiUpload } from "react-icons/bi"
import { Container } from "../../../components/container"
import { PanelHeader } from "../../../components/panelheader"
import { useForm } from "react-hook-form"
import { Input } from "../../../components/input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { storage} from "../../../services/firebaseConnection"
import { database } from "../../../services/firebaseConnection"
import { addDoc, collection } from "firebase/firestore"
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useState, useContext } from 'react'
import type { ChangeEvent } from "react"
import { AuthContext } from "../../../contexts/authContext"
import { v4 as uuidV4 } from "uuid"
import { BsFillTrash3Fill } from "react-icons/bs"



const shema = z.object({
    name: z.string().nonempty("O campo nome é obrigatório"),
    model: z.string().nonempty("O campo modelo é obrigatório"),
    year: z.string().nonempty("O campo ano é obrigatório"),
    km: z.string().nonempty("O campo KM é obrigatório"),
    price: z.string().nonempty("O campo preço é obrigatório"),
    city: z.string().nonempty("O campo cidade é obrigatório"),
    whatsapp: z.string().min(1, "O campo telefone é obrigatório").refine((value) => /^(\d{12,13})$/.test(value), {
        message: "Numero de telefone inválido"
    }),
    description: z.string().nonempty("O campo descrição é obrigatório")
})

type FormData = z.infer<typeof shema>;

interface ImageProps{
    uid: string
    name: string
    downloadUrl: string
    previewUrl: string 
    
}

export function New() {
    const [images, setImages] = useState<ImageProps[]>([])
    const { user } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        resolver: zodResolver(shema),
        mode: "onChange"
    })
    function handleSendForm(data: FormData) {

        if(images.length === 0){
            alert("Nenhuma imagem selecionada para o veiculo.")
            return
        }

        const carlistimages = images.map(car => {
            return{
                uid: car.uid,
                name: car.name,
                url: car.downloadUrl
            }
        })

        addDoc(collection(database, "cars"), {
            name: data.name,
            model: data.model,
            year: data.year,
            km: data.km,
            tel: data.whatsapp,
            city: data.city,
            price: data.price,
            description: data.description,
            uid: user?.id,
            username: user?.name,
            created: new Date(),
            images: carlistimages
        })
        .then(() => {
            reset();
            setImages([])
            console.log("Dados cadastrados com sucesso")
        })
        .catch((err) => {
            console.log(err)
        })
       
    }
    async function handleFile(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files[0]) {
            const image = e.target.files[0]

            if (image.type === 'image/jpeg' || image.type === 'image/png') {
                  console.log("passoui aqui")
                await handleUpload(image)
            }
        } else {
            alert("Insira uma imagem com formato valido")
            return
        }
    }
    function handleUpload(image: File) {

        if (!user?.id) {
            return
        }
        const userid = user?.id
        const imageid = uuidV4()
        const uploadref = ref(storage, `images/${userid}/${imageid}`)

        uploadBytes(uploadref, image)
            .then((snapshot) => {
                getDownloadURL(snapshot.ref).then((downloadurl) => {
                    const imageItem  = {
                        name: imageid,
                        uid: userid,
                        previewUrl: URL.createObjectURL(image),
                        downloadUrl: downloadurl
                    }
                    setImages((images) => [...images, imageItem])
                })
            })
    }

    async function handleDelete(item: ImageProps){
       

        const imagepath = `images/${item.uid}/${item.name}`
        const imageref = ref(storage, imagepath)
        try{
              await deleteObject(imageref)
               setImages(images.filter((car) => car.downloadUrl !== item.downloadUrl))
        }
        catch(err){
            console.log(err)
        }
    }
    return (
        <Container>
            <PanelHeader />
            <div className="bg-white w-full p-4 rounded-lg flex items-center shadow-md gap-4">
                <button className="border-2 rounded-lg p-4 px-15 md:w-50 md:h-40 flex items-center justify-center md:flex-row w-30 h-20">
                    <div className="absolute z-0">
                        <BiUpload size={70} />
                    </div>
                    <div className="flex items-center z-1 ">
                        <input
                            className="cursor-pointer h-30 opacity-0 bg-red-600 mr-30 "
                            type="file"
                            accept="image/*"
                            onChange={handleFile} />
                    </div>
                </button>
                {images.map(item => (
                    <div key={item.uid} className="w-full h-40 flex items-center justify-center relative">
                    <img src={item.previewUrl} alt="Imagem Carro" className="w-full h-full object-cover object-center
                    rounded-lg shadow-md shadow-gray-500" />
                    <div className="absolute flex full h-full items-center justify-center ">
                    <button onClick={() => handleDelete(item)}><BsFillTrash3Fill size={50} color="white"  className="opacity-0 hover:opacity-100 cursor-pointer "/></button>
                    </div>
                    </div>
                ))}
            </div>
            <div className="flex flex-col bg-white mt-2 w-full p-2 rounded-lg shadow-md">
                <form className="flex flex-col gap-2" onSubmit={handleSubmit(handleSendForm)}>

                    <div>
                        <p className="font-medium">Nome do carro</p>
                        <Input
                            type="text"
                            name="name"
                            register={register}
                            error={errors.name?.message}
                            placeholder="Ex: Jeep Renegade"
                        />
                    </div>


                    <div>
                        <p className="font-medium">Modelo do carro</p>
                        <Input
                            type="text"
                            name="model"
                            register={register}
                            error={errors.model?.message}
                            placeholder="Ex: 2.0 Turbo Diesel"
                        />
                    </div>

                    <div className="w-full flex gap-5">
                        <div className="w-full">
                            <p className="font-medium">Ano</p>
                            <Input
                                type="text"
                                name="year"
                                register={register}
                                error={errors.year?.message}
                                placeholder="Ex: 2020 / 2021"
                            />
                        </div>

                        <div className="w-full">
                            <p className="font-medium">Kilometros rodados</p>
                            <Input
                                type="text"
                                name="km"
                                register={register}
                                error={errors.km?.message}
                                placeholder="Ex: 25.547"
                            />
                        </div>
                    </div>

                    <div className="w-full flex gap-5">
                        <div className="w-full">
                            <p className="font-medium">Telefone / Whatsapp</p>
                            <Input
                                type="text"
                                name="whatsapp"
                                register={register}
                                error={errors.whatsapp?.message}
                                placeholder="Ex: 31999904678"
                            />
                        </div>

                        <div className="w-full">
                            <p className="font-medium">Cidade</p>
                            <Input
                                type="text"
                                name="city"
                                register={register}
                                error={errors.city?.message}
                                placeholder="Ex: Nova Lima - MG"
                            />
                        </div>
                    </div>
                    <div>
                        <p className="font-medium">Preço</p>
                        <Input
                            type="text"
                            name="price"
                            register={register}
                            error={errors.price?.message}
                            placeholder="Ex: R$ 230.547"
                        />
                    </div>
                    <p className="font-medium">Descrição</p>
                    <textarea className="border-2 rounded-lg p-2"
                        {...register("description")}
                        name="description"
                        id="description"
                        placeholder="Insira a descrição do veiculo" >

                    </textarea>
                    {errors.description && <p className="text-red-500 text-xs">{errors.description.message}</p>}

                    <button type="submit"
                        className="bg-red-500 text-white font-medium rounded-lg h-10 text-lg shadow-md cursor-pointer">Cadastrar</button>

                </form>
            </div>
        </Container>

    )
}