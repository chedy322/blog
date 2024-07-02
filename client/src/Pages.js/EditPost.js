import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate } from 'react-router-dom';
import Delete from '../component.js/Delete';

function EditPost() {
    // const [post,setPost]=useState(null)
    const [navigate,setNavigate]=useState(false)
    const[content,setContent]=useState('')
    const {id}=useParams()
    const [form,setForm]=useState({
        title: '',
        summary:"",
        file:""
    })
    useEffect(()=>{
        const fetching=async ()=>{
            const response=await fetch(`http://localhost:3002/post/${id}`,{
                method:'GET',
                credentials:"include"
            })
            const data=await response.json()
            // setPost(data)
            setContent(data.content)
            setForm({
                title:data.title,
                summary:data.summary,
                file:data.file
            })
        }
        fetching()
    },[])
    function handleChange(e){
        if(e.target.name==='file'){
            setForm({...form,[e.target.name]:e.target.files[0]})
        }
        else{

            return setForm({...form,[e.target.name]:e.target.value})
        }
    }
    const handleSubmit=async (e)=>{
        e.preventDefault()
        const data=new FormData()
        data.set("title",form.title)
        data.set("summary",form.summary)
        data.set("content",content)
        data.set("file",form.file)
        try{
            const response=await fetch(`http://localhost:3002/post/${id}`,{
                method:"PATCH",
                credentials:"include",
                body:data
            })
            if(response.status===200){
                setNavigate(true)
            }
        }
        catch(err){
            console.log(err)
        }


    }
    const handleDelete=async (e)=>{
        try{
            const response=await fetch(`http://localhost:3002/post/${id}`,{
                method:'DELETE',
                credentials:"include"
            })
            console.log(response)
            if(response.status===200){
                alert("Post Deleted")
                setNavigate(true)
            }

        }catch(err){
            console.log(err)
        }

    }
    if(navigate){
        return <Navigate to={'/profile'}/>
    }
  return (
    <div>
        {/* <div> */}
        <h1>Create new Post </h1>
        <form method="patch" onSubmit={handleSubmit} enctype="multipart/form-data" action='/create' >
            <input type='text' placeholder='Title' name='title' value={form.title} onChange={handleChange} required/>
            <input type='text' placeholder='Summary' name='summary' value={form.summary} onChange={handleChange} required/>
            <input type='file' name='file' onChange={handleChange} required/>
        {/* may add file picture */}
            <ReactQuill  value={content} onChange={setContent} required/>
            <button>Edit</button>
        </form>

        {/* </div> */}
        {/* add delete button here as well */}
        <button onClick={handleDelete}>Delete</button>
        
    </div>
  )
}

export default EditPost


