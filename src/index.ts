import express ,{Request,Response} from "express"
import jwt from "jsonwebtoken"
import mongoose from "mongoose";
import {userformat} from "./format"
import {User,Tag,Content,Link} from "./db"
import bcrypt from "bcrypt"
import {userMiddleware} from "./middleware"

const jwt_key ="ANDONFa";
interface IUser {
  username: string;
  password: string; // hashed password
}



const app =express();

mongoose.connect("mongodb+srv://namanprasad269:namanprasad2610@cluster0.qkyb5y5.mongodb.net/Brain").then(()=>{
    console.log("connected to database succesfully");
}).catch((err)=>{
    console.log("Some error occured :"+err);
})

app.use (express.json());

app.post("/api/v1/signup",async (req:Request,res:Response)=>{
    const {username , password} = req.body;

    if(username === undefined || password ===undefined){
        res.json({
            msg:"No feilds can be empty"
        })
    }

    try{

        const extuser = await User.find<IUser>({username});
        if(extuser){
         res.send('user exist')
         return;
        }
        
        const result = userformat.safeParse({username,password});
        if(!result.success){
            const errr= result.error.errors;
            res.json({
                message:errr
            })
        }
      const hash = await bcrypt.hash(password,10);

       await User.create({
        username,
        password:hash
       })
         
    }catch(err){
         res.send(err);
    }
    res.json({
        msg:"user created succesfully"
    })
})

app.post("/api/v1/signin",async (req,res)=>{
const {username,password} =req.body;

if(username === undefined || password ===undefined){
        res.json({
            msg:"No feilds can be empty"
        })
    }


try{
    // nice debugged
      const usr = await User.findOne<IUser>({username})

      if(usr){
     const pss= await bcrypt.compare(password,usr.password);
        if(pss){
            const token = jwt.sign({id:usr.username},jwt_key);
            return res.json({
                token:token,
                message:"token generated"
            })
        }
        else{
             return res.json({
                message:"incorrect password"
            })
        }
      }
    else{
        res.send("user do not exit sign up first");
    }

}catch(err){
res.send("server down :=>"+ err);
}
// sign up first;
})


app.get("/api/v1/content", userMiddleware ,async (req:Request,res:Response)=>{
 //@ts-ignore
const userI=req.userId;
try{
const cntnt = await Content.find({userId:userI}).populate("userId","tags");
// we will see to it 
res.status(401).json({
    cntnt
})
}catch(err){
    console.log("server crash");
}
})

app.delete("/api/v1/content",async (req:Request,res:Response)=>{

})

app.post("/api/v1/brain/share",(req:Request,res:Response)=>{})

app.get("/api/v1/brain/:shareLink",(req:Request,res:Response)=>{})