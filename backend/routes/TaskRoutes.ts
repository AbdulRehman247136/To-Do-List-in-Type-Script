import { createTask,gettasks,deletetask,updatetask } from "../controller/Tasks";

import { Router,Request,Response } from "express";
import { authMiddleware } from "../middleware/AuthMiddleWare";
const router = Router();

router.post('/Tasks',authMiddleware, createTask);
router.get('/Tasks',authMiddleware,gettasks);
router.delete('/Tasks/:id',authMiddleware,deletetask);
router.put('/UpdateTasks/:id',authMiddleware,updatetask);

export default router;