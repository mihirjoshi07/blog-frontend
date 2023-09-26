import {useEffect, useState} from 'react'
import { Navigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';


const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  };


  
export default function EditPost()
{ 
    console.log("edit")
    const{id}=useParams();
    const [title,setTitle]=useState('');
    const [summary,setSummary]=useState('');
    const [content,setContent]=useState('');
    const [files,setFiles]=useState('');
    const [redirect,setRedirect]=useState(false);


    useEffect(()=>{
       fetch("https://blog-backend-u9sp.onrender.com/post/"+id)
        .then(response=>{
            response.json().then(postInfo=>{
                setTitle(postInfo.title);
                setContent(postInfo.content);
                setSummary(postInfo.summary);

            })
        })
        
    },[id])
    async function updatePost(ev){
        const data=new FormData();
        data.set('title',title);
        data.set('summary',summary);
        data.set('content',content);
        data.set('id',id);
        if(files?.[0]){
            data.set('file',files?.[0]);
        }
        data.set('file',files?.[0]);

        ev.preventDefault();
        await fetch('https://blog-backend-u9sp.onrender.com/post',{
            method:"PUT",
            body:data,
            credentials:"include",
        });

        setRedirect(true);
    }


    if(redirect)
    {
    
        return <Navigate to={"/post/"+id}/>
      
    }
    return (
        <form onSubmit={updatePost}>
            <input type="title" 
                placeholder="Title" 
                value={title}
                onChange={ev=>setTitle(ev.target.value)}
                required
                />

            
            <input type="summary" 
                placeholder="Summary"
                value={summary}
                onChange={ev=>setSummary(ev.target.value)}
                required
            
            />

            <input type="file" onChange={ev=>setFiles(ev.target.files)} required/>
            <ReactQuill  value={content} onChange={newValue=>setContent(newValue)} modules={modules} />
            <button style ={{marginTop:'5px'}}>Update Post</button>
        </form>
    )
}