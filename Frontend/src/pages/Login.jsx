import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch,useSelector } from 'react-redux';
import {loginUser} from '../authSlice';
import { useNavigate ,NavLink } from 'react-router';
import { useEffect } from 'react';

const LoginSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(5, "Minimum 5 characters needed")
});


function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isAuthenticated,loading,error} = useSelector((state)=> state.auth);

    function submittedForm(data) {
        dispatch(loginUser(data))
    }

    useEffect(()=>{
        if(isAuthenticated){
            navigate('/')
        }
    },[isAuthenticated])

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(LoginSchema),
    });

    return (
        <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-[#1e293b] border border-slate-700 rounded-xl shadow-2xl">
                <div className="p-8">
                    <h1 className="text-3xl font-bold text-center text-white mb-8">
                        Welcome Back
                    </h1>

                    <form
                        onSubmit={handleSubmit(submittedForm)}
                        className="space-y-5"
                    >
                        <div>
                            <input
                                {...register("email")}
                                type="email"
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
                            Login
                        </button>

                        <p className="text-center text-slate-400 text-sm mt-4">
                            Don't have an account?{" "}
                            <span className="text-cyan-400 hover:text-cyan-300 cursor-pointer">
                                <NavLink to="/Signup" className="link link-primary">Signup</NavLink>
                            </span>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;