import User from '../models/user.models.js'
import bcrypt from "bcrypt";

export const signup = async (req,res,next)=>{
    const {username,email,password} = req.body;
    const Hasedpassword =  bcrypt.hashSync(password, 10);
    const newUser = new User({username,email,password:Hasedpassword})

    try{
        await newUser.save()
    res.status(201).json({message:"SAved data suceefull"});
    }catch(err){
        next(err)
    }
    
}