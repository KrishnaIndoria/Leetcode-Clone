import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'; //to use zod we need this
import { object, z } from 'zod'; 

const LoginSchema = z.object({
    emailID:z.string().email("Invalid email"),
    password:z.string().min(5,"Minimum 5 characters needed")
})

function submittedForm(data){
    console.log(data);
}

function Login(){
     const {register,handleSubmit,formState: { errors },} = useForm({resolver:zodResolver(LoginSchema)});
    return(
        <form onSubmit={handleSubmit(submittedForm)}>
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

export default Login