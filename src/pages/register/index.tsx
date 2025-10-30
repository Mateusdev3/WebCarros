import { zodResolver } from '@hookform/resolvers/zod'
import logo from '../../assets/logo.svg'
import { Container } from '../../components/container'
import { Input } from '../../components/input'
import { useForm } from 'react-hook-form'
import {z} from 'zod'
import { Link } from 'react-router-dom'
import { auth } from '../../services/firebaseConnection'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { updateProfile } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { signOut } from 'firebase/auth'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/authContext'



const shema = z.object({
    name: z.string().nonempty("O campo nome é obrigatório"),
    email: z.string().email("Insira um e-mail valido").nonempty("O campo e-mail é obrigatório"),
    password: z.string().min(6, "A senha deve conter no minimo 6 digitos").nonempty("O campo senha é obrigatório")
})

type FormData = z.infer<typeof shema>



export function Register(){
    const {handleUpdateUser} = useContext(AuthContext)
    const navigate = useNavigate()
    const {register, handleSubmit, formState:{errors}} = useForm<FormData>({
    resolver: zodResolver(shema),
    mode: "onChange"

})  
      useEffect(() => {
    
            signOut(auth)
            
        }, [])
    

    function handleRegister(data: FormData){
      createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async (user) => {
        await updateProfile(user.user, {
            displayName: data.name   
        })
        navigate("/dashboard", {replace: true})
        handleUpdateUser({
            id: user.user.uid,
            name: data.name,
            email: data.email

        })
      })
      .catch((error) => {
        console.log("Erro ao cadastrar")
        console.log(error)
      })

    }

    return(
        <Container>
            <div className='flex items-center justify-center h-screen flex-col max-w-lg mx-auto w-full'>
                <Link to='/'>
                <img src={logo} alt="logowebcarros" className='mb-5 w-80'/>
                </Link>
                <form onSubmit={handleSubmit(handleRegister)} className='flex flex-col w-full bg-white px-4 rounded-lg p-2 mb-1'>

                    <Input
                    type='text'
                    placeholder='Insira seu nome...'
                    name='name'
                    error={errors.name?.message}
                    register={register}
                    />

                    <Input 
                    type='email'
                    placeholder='Insira seu e-mail...'
                    name='email'
                    error={errors.email?.message}
                    register={register}
                    />

                    <Input
                    type='password'
                    placeholder='Insira sua senha...'
                    name='password'
                    error={errors.password?.message}
                    register={register}
                    />

                    <button type='submit' className='bg-black text-white py-1 rounded-md font-medium'>Cadastrar</button>
                   
                </form>
                <Link to="/login">Já possui uma conta? Faça o loguin! </Link>
            </div>
        </Container>
    )
}