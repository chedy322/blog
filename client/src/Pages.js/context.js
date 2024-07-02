// import { useContext } from "react";
import { useContext,createContext,useState, useEffect } from 'react';

//can improve this by adding local storage

export const ThemeContext = createContext({});
// const value=useContext({});
export default function Context({children}){
    const [user,setUser]=useState("")
    // const [userInfo,setUserInfo]=useState(
    //     JSON.parse(localStorage.getItem("")||null)
    // )

   

    
    // //call this function each tile user info changes
    // function change_info(data){
    //     setUser(data)
    // }
    // useEffect(()=>{
    //     localStorage.setItem("",JSON.stringify(userInfo))

    // },[userInfo])
    return(
        <ThemeContext.Provider value={{user,setUser}}>
         {children}
        </ThemeContext.Provider>
    )

}