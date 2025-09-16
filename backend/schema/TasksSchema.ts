import mongoose,{Schema} from "mongoose";;
import { ITasks,} from "../types/Iuser";


const TasksSchema:Schema<ITasks> = new mongoose.Schema ({
    text:{type:String, required:true, },
    UserId:{type: Schema.Types.ObjectId, ref: "User", required: true},
    completed:{type:Boolean, default:false},

})


const ToDoTasks= mongoose.model<ITasks>('Tasks', TasksSchema);
export default ToDoTasks;