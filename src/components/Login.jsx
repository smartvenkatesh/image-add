import Button from '@mui/material/Button';
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const navigate = useNavigate()

const submit = async()=>{
    const res =await axios.post("http://localhost:8000/jobs/login",{email,password})
    navigate("/home")    
}
  return (
    <div>
      <div>
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={submit}>Submit</Button>
      </div>
    </div>
  );
}

export default Login