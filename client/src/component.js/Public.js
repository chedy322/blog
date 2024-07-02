import React, { useState, useEffect } from 'react';
// import Posts from './Posts';
import Publics from './Publics';

export default function Public() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch('http://localhost:3002/public/',{
          method:'GET',
          credentials:"include"
        });
        const response = await result.json();
        setPosts(response);
        // console.log(response)
      } catch (error) {
        console.log('Error fetching data:');
      }
    };
    fetchData();
  }, [posts]);
  

  return (
    <main>
    {
      
      !posts?(<h1 className='loading'>Loading...</h1>):
      posts.length===0?(<h2 classname='nopost'>No post has been created yet</h2>):
    ( posts.map((post) => (
        <Publics {...post} key={post._id}/>
      )))
     
    }
     
    
    
      
    </main>
  );
}
