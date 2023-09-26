import { useContext, useState } from "react";
import { Navigate } from "react-router";
import { UserContext } from "../UserContext";

export default function Login(){
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');

    const [redirect,setRedirect]=useState(false)
    const {setUserInfo}=useContext(UserContext)
    
    
    async function login(ev){
        ev.preventDefault();
        const response=await fetch('https://blog-backend-o9hm.onrender.com/login',{
            method:'POST',
            body:JSON.stringify({username,password}),
            headers:{'Content-Type':'application/json'},
            //pass or include cookie(generated by web token) to the post request
            credentials:'include',  
        })
        if(response.ok)
        {
            response.json().then(userInfo=>{
            setUserInfo(userInfo)
            setRedirect(true);
            })  
        }   
        else{
            alert("Wrong Credentials")
        }
    }//Login function ends

    if(redirect)
    {
        return <Navigate to={"/"}/>
    }

  
    return(
        <div>
            <form className="login" onSubmit={login}>
                <h1>Login</h1>
               
                <input type="text" 
                placeholder="username"
                value={username}
                onChange={ev=> setUsername(ev.target.value)}/>

                <input type="password" 
                placeholder="password"
                value={password}
                onChange={ev=>setPassword(ev.target.value)}
                />
               
                <button>Login</button>
            </form>
        </div>
    )
    
    }