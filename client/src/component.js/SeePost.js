import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate } from 'react-router-dom';
function SeePost() {
    // const [post,setPost]=useState(null)
    // const [navigate,setNavigate]=useState(false)
    // const[content,setContent]=useState('')
    const[post,setPost]=useState("")
    const {id}=useParams()
    useEffect(()=>{
        const fetching=async ()=>{
            const response=await fetch(`http://localhost:3002/public/${id}`,{
                method:'GET',
                credentials:"include"
            })
            const data=await response.json()
            setPost(data)   
            // setPost(data)
        }
        fetching()
    },[])    
  return (
    <div className="post-container">
        <h1>View Post</h1>
        
            <img src={`http://localhost:3002/${post.file}`} alt="Post Image" className='img'/>
        
            {post ? (
                <>
                <div className="post-content">
                    <h2 className="post-title">{post.title}</h2>
                    <h4 className="post-summary" >{post.summary}</h4>

                    <div className="post-body">{stripHtmlTags(post.content)}</div>
                </div>
                <footer>
                    {post.createdAt}
                </footer>
                </>
            ) : (
                <h2 className='loading'>Loading...</h2>
            )}
        </div>
    );
}






function stripHtmlTags(html) {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = html;
    return tempElement.textContent || tempElement.innerText || '';
}






  

export default SeePost