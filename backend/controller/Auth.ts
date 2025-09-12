import {Router,Request,Response} from 'express';
import User from '../schema/UserSchema';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { AuthRequest } from '../middleware/AuthMiddleWare';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const signup =  async(req: Request, res: Response) => {
    
    try{
        const {name,email,password,phone} = req.body;
        if(!name || !email || !password || !phone){
            return res.status(400).json({message:"All fields are required"});
        }

        const checking = await User.findOne({
            $or: [{email:email},{phone:phone}]
            
        },)
           

        if(checking){
            return res.status(400).json({message:"User already exists"});
        }
        const hashedpassword = await bcrypt.hash(password,10);

        //Create a new user
        
            const newUser = new User({
                name,
                email,
                password:hashedpassword,
                phone});

                //Save user to the database
            await newUser.save();
            
            //Generate JWT token

            const token = jwt.sign(
                {
                    id: newUser._id,
                    email: newUser.email,
                    
                },
                JWT_SECRET as string,
               { expiresIn: '1h'},
            )
         
            
            //setting  access-token in cookie  in the browser

            res.cookie('access-token', token, {
                httpOnly: true,
                secure:false,
                sameSite:'lax',
                maxAge: 24* 60 * 60 * 1000 // 1 day
            
            }
            )
          
            
            //sending response
            res.status(201).json({
                message:"User created successfully",
                user:{
                    id:newUser._id,
                    name:newUser.name,
                    email:newUser.email,
                    phone:newUser.phone
                },
                token
                
            }
            )
            console.log("User created successfully",newUser);


    } catch (error) {
        res.status(500).json({message:"Server Error"});
    }
  };


  // Login Api


  export const login = async(req: Request, res: Response) => {


    try{
        const {email,password} = req.body;
      
        if(!email){
            
            return res.status(400).json({message:"All fields are required"});
            
        }

        const user = await User.findOne({email})
        if(!user){
            
            return res.status(400).json({message:"User Not Found"});
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            
            return res.status(400).json({message:"Invalid Credentials"});
        }

        const token = jwt.sign( {id: user._id},JWT_SECRET as string,{expiresIn:'1h'})

        res.cookie('access-token', token, {
            httpOnly: true,
            secure:false,
            sameSite:'lax',
            maxAge: 60* 60 * 1000 // 1 day
        
        }
        )
      
        ;

          

          res.status(201).json({
            message:"User created successfully",
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                phone:user.phone
            },
            token
        }
        )


        
    }

    catch (error) {
        res.status(500).json({message:"Server Error"});
    }


  }
  
  // COOKIES Remover api

  export const cookiesremover = async(req:AuthRequest,res:Response)=>{
    res.clearCookie('access-token');
    res.status(200).json({message:"Cookies removed successfully"});
  }