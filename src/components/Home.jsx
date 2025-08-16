import axios from 'axios';
import React, { useState } from 'react'

const Home = () => {
    const [productImage,setProductImage] = useState("")
    console.log('productImage',productImage);

    const addImage =()=>{
        const formData = new FormData()
        formData.append("file",productImage)
        axios.post("http://localhost:8000/jobs/addImage/upload",formData)
        .then((res)=>alert(res.data.message))
    }
    
  return (
    <div>
        <div>Add image using multer</div>
        <input type="file" accept='image/*' onChange={(e)=>setProductImage(e.target.files[0])}/>
        <button onClick={addImage}>Add Image</button>
    </div>
  )
}

export default Home