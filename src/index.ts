import express from "express"
import jwt from "jsonwebtoken"
import mongoose from "mongoose";
const app =express();

mongoose.connect("mongodb+srv://namanprasad269:namanprasad2610@cluster0.qkyb5y5.mongodb.net/Brain").then(()=>{
    console.log("connected to database succesfully");
}).catch((err)=>{
    console.log("Some error occured :"+err);
})

app.post("/api/v1/signin",(req,res)=>{
    const {email,pass}= req.body;
})

app.post("/api/v1/signup",(req,res)=>{})

app.get("/api/v1/content",(req,res)=>{})

app.delete("/api/v1/content",(req,res)=>{})

app.post("/api/v1/brain/share",(req,res)=>{})

app.get("/api/v1/brain/:shareLink",(req,res)=>{})