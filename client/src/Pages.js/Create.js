import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate } from 'react-router-dom';

function Create() {
    const [form,setForm]=useState({
        title:"",
        summary:"",
        file:"",
        // content:""
    })
    const[content,setContent]=useState('')
    const[redirect,setRedirect]=useState(false)
    function handlleChange(e){
        if(e.target.name==='file'){
            setForm({...form,[e.target.name]:e.target.files[0]})
        }else{
            setForm({...form,[e.target.name]:e.target.value})
        }

    }
    async function handleSubmit(e){
        e.preventDefault();
        const formData=new FormData();
        formData.set('title',form.title)
        formData.set('summary',form.summary)
        formData.set('file',form.file)
        // formData.set('content',content)
        const strippedContent = stripHtmlTags(content);
        formData.set('content', strippedContent);
        try{
            const result=await fetch('http://localhost:3002/post',{
                method:'post',
                credentials:"include",
                body:formData
            })
            console.log(result)
            if(result.status===201){
                setRedirect(true)
                // window.location.href = 'http://localhost:3000/'
            }else{
                console.log('Error:', result.status)
            }
        }
            
            catch(err){
                console.log(err)
            }

    }
    if(redirect){
        return <Navigate to='/profile'/>
    }
  return (
    <div>
        <h1>Create new Post </h1>
        <form method="POST" onSubmit={handleSubmit} enctype="multipart/form-data" action='/create'>
            <input type='text' placeholder='Title' name='title' value={form.title} onChange={handlleChange} required/>
            <input type='text' placeholder='Summary' name='summary' value={form.summary} onChange={handlleChange} required/>
            <input type='file' name='file' onChange={handlleChange} required/>
            <ReactQuill  value={content} onChange={setContent} required/>
            <button>Create</button>
        </form>
      
    </div>
  )
}
function stripHtmlTags(html) {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = html;
    return tempElement.textContent || tempElement.innerText || '';
}


export default Create;
