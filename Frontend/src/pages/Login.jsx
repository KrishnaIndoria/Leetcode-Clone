import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch,useSelector } from 'react-redux';
import {loginUser} from '../authSlice';
import { useNavigate ,NavLink } from 'react-router';
import { useEffect } from 'react';
import { Mail, Lock, Loader2, AlertCircle, Code2 } from 'lucide-react';

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
        <div className="min-h-screen bg-[#0A0D12] flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-md">
                {/* Brand mark */}
                <div className="flex flex-col items-center mb-8">
                    <div className="w-11 h-11 rounded-lg bg-[#4F7CFF]/10 border border-[#4F7CFF]/20 flex items-center justify-center mb-4">
                        <Code2 className="w-5 h-5 text-[#4F7CFF]" strokeWidth={2} />
                    </div>
                    <span className="font-mono text-sm text-[#8B93A1] tracking-wide">CodeVerse</span>
                </div>

                <div className="w-full bg-[#11151C] border border-white/8 rounded-xl shadow-2xl shadow-black/50">
                    <div className="p-8">
                        <h1 className="text-2xl font-semibold text-center text-[#E8EAED] mb-1">
                            Welcome back
                        </h1>
                        <p className="text-sm text-center text-[#8B93A1] mb-7">
                            Sign in to continue solving problems
                        </p>

                        {error && (
                            <div className="flex items-start gap-2 rounded-lg border-l-2 border-[#F0605C] bg-[#F0605C]/10 px-3 py-2.5 mb-5">
                                <AlertCircle className="w-4 h-4 text-[#F0605C] mt-0.5 shrink-0" />
                                <span className="text-sm text-[#F0605C]">{error}</span>
                            </div>
                        )}

                        <form
                            onSubmit={handleSubmit(submittedForm)}
                            className="space-y-4"
                        >
                            <div>
                                <label className="block text-xs font-medium text-[#8B93A1] mb-1.5">
                                    Email
                                </label>
                                <div className="relative">
                                    <Mail className="w-4 h-4 text-[#565D6B] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    <input
                                        {...register("email")}
                                        type="email"
                                        placeholder="you@example.com"
                                        className="w-full bg-[#171C25] border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-[#E8EAED] placeholder:text-[#565D6B] focus:outline-none focus:border-[#4F7CFF] focus:ring-2 focus:ring-[#4F7CFF]/20 transition-colors duration-150"
                                    />
                                </div>
                                {errors.email && (
                                    <span className="text-[#F0605C] text-xs mt-1.5 flex items-center gap-1">
                                        {errors.email.message}
                                    </span>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-[#8B93A1] mb-1.5">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="w-4 h-4 text-[#565D6B] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    <input
                                        {...register("password")}
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full bg-[#171C25] border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-[#E8EAED] placeholder:text-[#565D6B] focus:outline-none focus:border-[#4F7CFF] focus:ring-2 focus:ring-[#4F7CFF]/20 transition-colors duration-150"
                                    />
                                </div>
                                {errors.password && (
                                    <span className="text-[#F0605C] text-xs mt-1.5 flex items-center gap-1">
                                        {errors.password.message}
                                    </span>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="w-full flex items-center justify-center gap-2 bg-[#4F7CFF] hover:bg-[#3D63E0] disabled:opacity-60 disabled:cursor-not-allowed text-[#08101F] font-medium text-sm py-2.5 rounded-lg transition-colors duration-150 cursor-pointer mt-2"
                                disabled = {loading}>
                                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                                {loading ? "Signing in..." : "Login"}
                            </button>

                            <p className="text-center text-[#8B93A1] text-sm pt-2">
                                Don't have an account?{" "}
                                <NavLink to="/Signup" className="text-[#4F7CFF] hover:text-[#3D63E0] font-medium transition-colors duration-150">
                                    Signup
                                </NavLink>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
