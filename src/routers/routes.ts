import { Router } from "express";
import HabitsConstroller from "../controllers/HabitsConstroller";

const router = Router();

router.get('/habits', HabitsConstroller.findAll);

router.post('/habits', HabitsConstroller.store);

export default router;