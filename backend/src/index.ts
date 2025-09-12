
import express, { Request, Response } from "express";
import cors from "cors";
import ConnectDB from "./config/Db";
import authRoutes from "../routes/UserRoutes";
import taskRoutes from "../routes/TaskRoutes";
import cookieParser from "cookie-parser";



const app = express();
const PORT = 5000;

app.use(express.json());

//connection to the mongodb
ConnectDB();

app.use(cors({origin: 'http://localhost:5173',
credentials: true}));
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

//Routes
app.use("/api/auth", authRoutes);
app.use("/api", taskRoutes);
app.listen(PORT, () => {
  console.log(`Server running at 'http://localhost:${PORT}`);
});
