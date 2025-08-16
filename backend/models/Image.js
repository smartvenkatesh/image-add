import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    fileImage:String
})

export const Image = mongoose.model("Image",imageSchema)