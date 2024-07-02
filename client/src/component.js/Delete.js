import React from 'react'

function Delete({id}) {
    const handleDelete=async (e)=>{
        // e.preventDefault()
        try{
            const response=await fetch(`http://localhost:3002/post/${id}`,{
                method:'DELETE',
                credentials:"include"
            })
            console.log(response)
            if(response.status===200){
                alert("Post Deleted")
            }

        }catch(err){
            console.log(err)
        }
    }
  return (
    <div>
      <button onClick={handleDelete}>delete</button>
    </div>
  )
}

export default Delete
