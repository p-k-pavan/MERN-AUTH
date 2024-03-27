import User from '../models/user.models.js'
import bcrypt from "bcrypt";
import { errorHandler } from '../utiles/error.js';
import jwt from 'jsonwebtoken';

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

export const signin = async (req,res,next)=>{
    const {email,password} = req.body;
    try {
        const validUser = await User.findOne({email})
        if(!validUser) return next(errorHandler(404,"User not exit"))
        const Hasedpassword =  bcrypt.compare(validUser.password,password);
        if(!Hasedpassword) return next(errorHandler(40,"invalid credential"));
        const token = jwt.sign({ id:validUser._id }, process.env.JWT_SCRECT);
        const {password:Hased,...rest} = validUser._doc
        res
          .cookie("access_token", token, { httpOnly: true })
          .status(200)
          .json(rest);

    } catch (err) {
        next(err)
    }
}