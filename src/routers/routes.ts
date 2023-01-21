import { Router } from "express";
import HabitsConstroller from "../controllers/HabitsConstroller";

const router = Router();

router.get('/habits', HabitsConstroller.findAll);

router.post('/habits', HabitsConstroller.store);

router.get('/day', HabitsConstroller.findHabitsDay);

router.patch('/habits/:id/toggle', HabitsConstroller.toggleHabit)

router.get('/summary', HabitsConstroller.habitsCompletedInDay);

export default router;