import { signup,login, cookiesremover } from "../controller/Auth";
import { Router } from "express";


const router = Router();

router.post("/signup", signup); 
router.post("/login", login);
router.post("/remove", cookiesremover);


export default router;



