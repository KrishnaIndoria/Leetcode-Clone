import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch,useSelector } from 'react-redux';
import {registerUser} from '../authSlice';
import { NavLink, useNavigate} from 'react-router';
import { useEffect } from 'react';



// validation of input data
const SignupSchema = z.object({
    firstName: z.string().min(3, "Minimum 3 characters needed"),
    email: z.string().email("Invalid Email"),
    password: z.string().min(5, "Minimum 5 characters needed")
})



function Signup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isAuthenticated,loading,error} = useSelector((state)=> state.auth);

    function submittedForm(data) {
        dispatch(registerUser(data));
    }
    
    useEffect(()=>{
        console.log("isAuthenticated:", isAuthenticated);
        if(isAuthenticated){
            navigate('/')
        }
    },[isAuthenticated])

    const {register,handleSubmit,formState: { errors },} = useForm({resolver: zodResolver(SignupSchema)});

    return (
        <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-[#1e293b] border border-slate-700 rounded-xl shadow-2xl">
                <div className="p-8">
                    <h1 className="text-3xl font-bold text-center text-white mb-8">
                        Create Account
                    </h1>

                    <form onSubmit={handleSubmit(submittedForm)}className="space-y-5">
                        <div>
                            <input
                                {...register("firstName")}
                                placeholder="First Name"
                                className="w-full bg-[#334155] border border-slate-600 rounded-lg px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            />
                            {errors.firstName && (
                                <span className="text-red-400 text-sm mt-1 block">
                                    {errors.firstName.message}
                                </span>
                            )}
                        </div>

                        <div>
                            <input
                                {...register("email")}
                                placeholder="Email"
                                className="w-full bg-[#334155] border border-slate-600 rounded-lg px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            />
                            {errors.emailID && (
                                <span className="text-red-400 text-sm mt-1 block">
                                    {errors.emailID.message}
                                </span>
                            )}
                        </div>

                        <div>
                            <input
                                {...register("password")}
                                type="password"
                                placeholder="Password"
                                className="w-full bg-[#334155] border border-slate-600 rounded-lg px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            />
                            {errors.password && (
                                <span className="text-red-400 text-sm mt-1 block">
                                    {errors.password.message}
                                </span>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-lg transition duration-200 cursor-pointer"
                            disabled = {loading}>
                            Create Account
                        </button>

                        <p className="text-center text-slate-400 text-sm mt-4">
                            Already have an account?{" "}
                            <span className="text-cyan-400 hover:text-cyan-300 cursor-pointer">
                                <NavLink to="/Login" className="link link-primary">Login</NavLink>
                            </span>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;

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