import { Link } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import { Container } from '../../components/container'
import { Input } from '../../components/input'
import { useForm } from 'react-hook-form'
import {z} from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { auth } from '../../services/firebaseConnection'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { useEffect } from 'react'

const shema = z.object({
    email: z.string().email("Insira um e-mail válido").nonempty("O campo e-mail é obrigatório"),
    password: z.string().nonempty("O campo senha é obrigatório")
})

type FormData = z.infer<typeof shema>

export function Login() {
    useEffect(() => {

        signOut(auth)
        
    }, [])

    const navigate = useNavigate()

    const {register, handleSubmit, formState:{errors}} = useForm<FormData>({
        resolver: zodResolver(shema),
        mode: "onChange"
    })

    function onSubmit(data: FormData){
       signInWithEmailAndPassword(auth, data.email, data.password)
       .then(() => {
        navigate("/dashboard", {replace: true} )
       })
       .catch((erro) => {
        console.log("erro ao logar")
        console.log(erro)
       })
    }
    return (
        <Container>
          
            <div className=" flex flex-col  w-full min-h-screen justify-center max-w-lg items-center mx-auto  ">
                <Link to="/" className='max-w-sm flex items-center justify-center  '>
                    <img src={logo} alt="logo" className='w-80 ' />
                </Link>
                <form onSubmit={handleSubmit(onSubmit)} className='bg-white mt-4 w-full p-4 rounded-lg flex items-center flex-col h-full mb-1' >
                   
                    <Input 
                    type='email'
                    placeholder='Insira seu email...'
                    name='email'
                    error={errors.email?.message}
                    register={register}/>

                    <Input 
                    type='password'
                    placeholder='Insira sua senha...'
                    name='password'
                    error={errors.password?.message}
                    register={register}/>
                 

                       <button type='submit' className='bg-black px-4 py-1 flex rounded-md w-full  items-center justify-center font-medium text-white cursor-pointer'>Acessar</button>
                </form>
                <Link to="/register">Ainda não possui uma conta? Cadastre-se agora! </Link>
              
            </div>
            
          
        </Container>



    )
}