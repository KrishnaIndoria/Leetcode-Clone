import { useEffect, useState } from "react"

function Signup(){
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const handleSubmit = (e)=>{
        e.preventDefault(); //this does not refresh the page after form submit(which happens in default,so prevent it.)
        console.log(name,email,password);
    }
    return(
        <form onSubmit={handleSubmit}>
            <input type="text" value={name} placeholder="FirstName" onChange={(e)=>setName(e.target.value)}></input>
            <input type="email" value={email} placeholder="Email" onChange={(e)=>setEmail(e.target.value)}></input>
            <input type="password" value={password} placeholder="password" onChange={(e)=>setPassword(e.target.value)}></input>
            <button type="submit">Submit</button>
        </form>
    )
}

export default Signup