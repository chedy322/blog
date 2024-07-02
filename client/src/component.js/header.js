import {Link, Navigate} from "react-router-dom"
import { useContext, useEffect,useReducer,useState } from "react"
import '../App.css'
import { ThemeContext } from "../Pages.js/context"

export default function Header(){
    const{user,setUser}=useContext(ThemeContext)
    // const [username,setUsername]=useState("")
    // const[redirect,setRedirect]=useState(false)
    useEffect(()=>{
        const fetchData=async ()=>{
            const result=await fetch('http://localhost:3002/profile',{
                method:'GET',
                credentials:'include'
              }
              )
            //   console.log(result)
              const data=await result.json()
              setUser(data)
            //   console.log(data)

        }
        fetchData()
  
    });
    
    const logout=async ()=>{
       await fetch('http://localhost:3002/auth/logout',{
            credentials:'include',
            method:'POST'
          }
          )
        alert('you are logged out')
        window.location.href="http://localhost:3000/"

    }
    return (
        
        <>
    
        <header>
            
                <Link to='/' className="logo"><div className="blog-name">MyBlog</div>
                    <div className="head"></div>
                </Link>
                
                <nav>
                    {user && <div className="profile"><Link to='create'>Create a post {user}</Link>
                    <Link to ={'/profile'}>profile</Link>
                    <a onClick={logout} className="logout">Logout</a>
                    </div>}
                    {!user && <div className="register">
                        <Link to='login'>Login</Link>
                        <Link to='register'>Register</Link>
                        
        
                    </div>}
                
        
                </nav>
            </header>
      
        </>
    
    )
}