import jwt from 'jsonwebtoken'
import dotenv from "dotenv";
dotenv.config();

const secretKey = process.env.JWT_SECRET.split(",")
console.log('secret',secretKey);


export const generateToken = (user)=>{
    const keyIndex = Math.floor(Math.random()*secretKey.length)
    const secret = secretKey[keyIndex]
    return jwt.sign(
        {
            _id:user._id,
            role:user.role,
            username:user.username
        },secret,{
            expiresIn:"1d",
            header:{kid:keyIndex}
        }
    )
}