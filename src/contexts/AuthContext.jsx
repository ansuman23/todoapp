import React, { createContext,useContext,useState } from "react";

const AuthContext=createContext();

export const useAuth=()=>useContext(AuthContext);

export const AuthProvider=(props)=>{
    const [user,setUser]=useState(()=>{
        const storedUser=localStorage.getItem("user");
        return storedUser ?JSON.parse(storedUser):null;
    });
    const login=async(username,password)=>{
        const response=await fetch("user.json");
        const users=await response.json();
        const authenticatedUser=users.find((user)=>user.username===username && user.password===password);
        if(authenticatedUser){
            setUser(authenticatedUser);
            localStorage.setItem("user",JSON.stringify(authenticatedUser));
            return true;
        }
        else{
            return false;
        }
    }
    const logout=()=>{
        setUser(null);
        localStorage.removeItem("user");
    }
    return(
        <AuthContext.Provider value={{user,login,logout}}>
            {props.children}
        </AuthContext.Provider>
    )
}