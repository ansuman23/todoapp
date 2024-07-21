import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username,setUserName]=useState("squibix");
    const [password,setPassword]=useState("squibix@12345");
    const [message,setMessage]=useState("");
    const {login}=useAuth();
    const navigate=useNavigate();

    const handleSubmit=async(event)=>{
        event.preventDefault();
        const isLoggedIn=await login(username,password);
        if(isLoggedIn){
            setMessage("Login Successful");
            navigate("/");
        }
        else{
            setMessage("Invalid Credentials");
        }
    }
  return (
    <div className='row'>
        <div className='col-md-6 mx-auto'>
            <div className='card'>
                <div className='card-body'>
                    <h3 className='text-center my-2'>Login</h3>
                    <p className='text-center text-danger'>{message}</p>
                    <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                            <label>Username</label>
                            <input type="text" className='form-control' placeholder='Enter your Username' defaultValue={username} onChange={(event)=>setUserName(event.target.value)} required/>
                        </div>
                        <div className='mb-3'>
                            <label>Password</label>
                            <input type="password" className='form-control' placeholder='Enter your Password'  defaultValue={password} onChange={(event)=>setPassword(event.target.value)} required/>
                        </div>
                        <div className='my-2'>
                            <input type='submit' className='btn btn-primary w-100' value="Login"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login
