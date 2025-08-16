import React, { useState } from 'react'
import school from "../assets/school.png"
import toast, { Toaster } from "react-hot-toast";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import "../App.css"
const Register = () => {
    const [userInfo,setUserInfo] = useState({
        username:"",
        email:"",
        password:""
    })
    const navigate = useNavigate()

    const handleChange=(e)=>{
        const{name,value} = e.target
        console.log("name", name);
        console.log("value", value);
        
        setUserInfo((currInfo)=>{
            return{
                ...currInfo,
                [name]:value
            }
        })
    }

    const submit =async ()=>{
        const data={
            username:userInfo.username,
            email:userInfo.email,
            password:userInfo.password
        }

        try{
        const res = await axios.post("http://localhost:8000/jobs/register",{data})
        
        toast.success(res.data.message)
        
        navigate("/login");
        }catch(err){
            toast.error(err.response.data.message)
        }
        
    }
  return (
    <div className="register">
      <div className="image">
        <img src={school} alt="register" width={1285} fluid />   
      </div>
      <div className="register-card">
        <h1>Register</h1>
        <input
          type="text"
          placeholder="Enter your name"
          name="username"
          value={userInfo.username}
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Enter your email"
          name="email"
          value={userInfo.email}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Enter your password"
          name="password"
          value={userInfo.password}
          onChange={handleChange}
        />
        <Button variant='contained' onClick={submit}>Submit</Button>
      </div>
      <Toaster/>
    </div>
  );
}

export default Register