import React, { useState, useEffect, useContext } from 'react';
import Posts from './Posts';
import { ThemeContext } from '../Pages.js/context';
import { Link } from 'react-router-dom';

export default function Post() {
  const [posts, setPosts] = useState([]);
  const{user,setUser}=useContext(ThemeContext)
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch('http://localhost:3002/post',{
          method:'get',
          credentials:"include"
        });
        const response = await result.json();
        setPosts(response);
        // console.log(response)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
if(!user){
  return <h1 style={{textAlign:"center"}}>Please <Link to='/login' style={{color:"black"}}>Log In</Link></h1>
}
  return (
    <>

    { 
    !posts?( <h1 className='loading'>Loading...</h1>) :
    posts.length===0?(<h1 className='nopost'>No post is created yet</h1>):
   (
   <>
   <h1 style={{textAlign:"center",marginBottom:"30px"}}>My Profile</h1> 
  {posts.map((post) => (
  
    
        <Posts {...post} key={post._id}/>
        
      )
      
      )}
      </>
      )
        
      
    }
      
    </>
  );
}
