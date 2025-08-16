import express, { Router } from "express"
import User from "../models/User.js";
import { generateToken } from "../utils/token.js";
import multer from "multer"
import { Image } from "../models/Image.js";
const router=express.Router()

const upload = multer({dest:"uploads/"})

router.post("/register",async(req,res)=>{
    const {username,email,password} = req.body.data
    try {
        const exists = await User.findOne({email})
        if(exists){
            return res.status(409).json({message:"This email already registered"})
        }
        const user = {username,email,password}

        await User.create(user)
        res.status(201).json({message:"User registered successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"})
    }
})

router.post("/login",async(req,res)=>{
    const {email,password} = req.body
    try {
        const user = await User.findOne({email:email})
        if(user.password !== password){
            return res.status(401).json({message:"invalid password"})
        }
        const token = generateToken(user)
        res.json({
            success:true,
            token,
            userId:user._id,
            name:user.username,
            role:user.role
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
})

router.post("/addImage/upload",upload.single("file"),async(req,res)=>{
    const {productImage} = req.file.filename
    console.log("req.file.filename", req.file.filename);
    
    try {
        const image = new Image({fileImage :productImage}) 
        console.log("image",image);
        
        await image.save()
        res.status(201).json({message:"Image added sucessfully"})
    } catch (error) {
         console.log(error);
         res.status(500).json({ message: "Internal Server Error" });
    }

});

export default router