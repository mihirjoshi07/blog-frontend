import { useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Header()
{
  const {setUserInfo,userInfo}=useContext(UserContext);
  useEffect(()=>{
    console.log("header useeefect")
    fetch('https://blog-backend-o9hm.onrender.com//profile',{
      credentials:'include',
    }).then(response=>{
      response.json().then(userInfo=>{
        console.log(userInfo)
        setUserInfo(userInfo)       
      })
    })
  },[])



function logout(event) {
  event.preventDefault(); // Prevent the default anchor behavior
  fetch("https://blog-backend-o9hm.onrender.com/logout", {
    credentials: "include",
    method: "POST"
  })
    .then((response) => {
      if (response.ok) {
        // Logout was successful
        setUserInfo(null);
      } else {
        // Handle errors or failed logout here
        console.error("Logout failed");
      }
    })
    .catch((error) => {
      console.error("Error during logout:", error);
    });
}

 const username=userInfo?.username;
    return(
    <header>
      <Link to="/" className="logo">Mihir's Blog</Link>
      <nav>
        {username && (
          <>
          {console.log("username")}
          <Link  to="/create">Create new post</Link>
          <Link onClick={logout}>Logout</Link>
          </>
        )}

        {!username && (
          <>
          
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>

          </>

          
        )}

       
        
      </nav>
    </header>
    );
} 