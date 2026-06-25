import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'; //to use zod we need this
import { object, z } from 'zod';  

// validation of input data
const SignupSchema = z.object({
    firstName:z.string().min(3,"Minimum 3 characters needed"),
    emailID:z.string().email("Invalid Email"),
    password:z.string().min(5,"Minimum 5 characters needed")
})

const submitedForm = (data)=>{
    console.log(data);
}

function Signup(){
    const {register,handleSubmit,formState: { errors },} = useForm({resolver:zodResolver(SignupSchema)});
    return(
        <form onSubmit={handleSubmit(submitedForm)}>
            <input {...register('firstName')}
            placeholder='firstname' />
            {errors.firstName && (<span>{errors.firstName.message}</span>)}
            <input {...register('emailID')}
            placeholder='emailID' />
            {errors.emailID && (<span>{errors.emailID.message}</span>)}
            <input {...register('password')}
            placeholder='password' type='password' />
            {errors.password && (<span>{errors.password.message}</span>)}
            <button type='submit'>Submit</button>
        </form>
    )
}

export default Signup

// import { useEffect, useState } from "react"

// function Signup(){
//     const [name,setName] = useState("");
//     const [email,setEmail] = useState("");
//     const [password,setPassword] = useState("");

//     const handleSubmit = (e)=>{
//         e.preventDefault(); //this does not refresh the page after form submit(which happens in default,so prevent it.)
//         console.log(name,email,password);
//     }
//     return(
//         <form onSubmit={handleSubmit} className="min-h-screen gap-1 flex flex-col justify-center items-center">
//             <input type="text" value={name} placeholder="FirstName" onChange={(e)=>setName(e.target.value)}></input>
//             <input type="email" value={email} placeholder="Email" onChange={(e)=>setEmail(e.target.value)}></input>
//             <input type="password" value={password} placeholder="password" onChange={(e)=>setPassword(e.target.value)}></input>
//             <button type="submit">Submit</button>
//         </form>
//     )
// }