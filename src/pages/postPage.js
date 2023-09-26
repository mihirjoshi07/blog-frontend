// import { useContext, useEffect, useState } from "react"
// import { useParams } from "react-router-dom"
// import { formatISO9075 } from "date-fns";
// import { UserContext } from "../UserContext";
// import { Link } from "react-router-dom";
// export default  function PostPage(){
//     const [postInfo,setPostInfo]=useState(null);
//     const {userInfo }=useContext(UserContext)
//     const {id}=useParams(); 
//     console.log("id :"+id)
    
    
//   useEffect(() => {
//     console.log("useEffect run");
//     // Use an async function to fetch and handle errors
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`http://localhost:4000/post/${id}`);
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const postInfo = await response.json();
//         setPostInfo(postInfo);
//         console.log(postInfo);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         // Handle the error, e.g., show an error message to the user
//       }
//     };

//     fetchData(); // Call the async function

//   }, [id]);
//     // useEffect( ()=>{
//     //     console.log("useeffect run")
//     //     const res=fetch(`http://localhost:4000/post/${id}`)
//     //     .then(response=>{
//     //         response.json().then(postInfo=>{
//     //             setPostInfo(postInfo)
//     //             console.log(postInfo)
//     //         })
//     //     })
//     //    console.log(res)
        
//     // },[])
    
//     if (!postInfo) {
//         return (
//           <div>
//             Loading...
//           </div>
//         );
//       }
//     return (
//         <div className="post-page">
//               <h1>{postInfo.title}</h1>
//               <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
//               <div className="author">By @{postInfo.author.username}</div>
//               {userInfo.id===postInfo.author._id &&(
//                 <div className="edit-row">
//                     <Link className="edit-btn" to={`/edit/${id}`}>Edit this Post</Link>
//                 </div>
//               )}
//                 <div className="image">
//                 <img src={`http://localhost:4000/${postInfo.img}`} alt=""></img>
//             </div>
          
//             <div className="content" dangerouslySetInnerHTML={{__html:postInfo.content}}/>
//         </div>
//         )
// }


import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";

export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();
  console.log("id: " + id);

  useEffect(() => {
    console.log("useEffect run");
    // Use an async function to fetch and handle errors
    const fetchData = async () => {
      try {
        const response = await fetch(`https://blog-backend-u9sp.onrender.com/post/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const postInfo = await response.json();
        setPostInfo(postInfo);
        console.log(postInfo);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle the error, e.g., show an error message to the user
      }
    };

    fetchData(); // Call the async function

  }, [id]);

  if (!postInfo) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  const userId = userInfo?.id; // Safely access userInfo.id
  return (
    <div className="post-page">
      <h1>{postInfo.title}</h1>
      <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
      <div className="author">By @{postInfo.author.username}</div>
      {userId === postInfo.author._id && (
        <div className="edit-row">
          <Link className="edit-btn" to={`/edit/${id}`}>Edit this Post</Link>
        </div>
      )}
      <div className="image">
        <img src={`https://blog-backend-u9sp.onrender.com/${postInfo.img}`} alt="" />
      </div>
      <div className="content" dangerouslySetInnerHTML={{ __html: postInfo.content }} />
    </div>
  );
}
