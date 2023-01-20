import { Router } from "express";
import HabitsConstroller from "../controllers/HabitsConstroller";

const router = Router();

router.get('/habits', HabitsConstroller.findAll);

export default router;