import mongoose, { Schema } from "mongoose";
import { IUser } from "../types/Iuser";

    const UserSchema:Schema<IUser> =new Schema ({
        name: { type: String, required: true, minlength: 3 },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true, minlength: 8 },
        phone: { type: String, required: true,unique:true, minlength: 10 }
    }      
)
const User = mongoose.model<IUser>('User', UserSchema);
export default User;