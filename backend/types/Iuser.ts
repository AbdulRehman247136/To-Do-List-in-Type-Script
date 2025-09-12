import {Document, Types} from "mongoose";


export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    phone: string;

}

export interface ITasks extends Document {
    _id:string;
    text:string;
    UserId:Types.ObjectId;
   

}