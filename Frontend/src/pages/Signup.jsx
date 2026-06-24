import { useForm } from 'react-hook-form';

function Signup(){
    const {register,handleSubmit,formState: { errors },} = useForm();
    return(
        <form onSubmit={handleSubmit((data)=>console.log(data))}>
            <input {...register('firstName')}
            placeholder='firstname' />
            <input {...register('email')}
            placeholder='email' />
            <input {...register('password')}
            placeholder='password' />
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