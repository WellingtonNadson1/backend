import dayjs from 'dayjs';
import { Request, Response } from 'express';
import { z } from 'zod';
import HabitsRepositories from "../repositories/HabitsRepositories";

class HabitsController {
  async findAll(request: Request, response: Response){
    const habits = await HabitsRepositories.findAll()

    const result = response.json(habits)

    return result
  }

  //POST Habit
  async store(request: Request, response: Response){
    const createHabitBody = z.object({
      title: z.string(),
      weekDays: z.array(z.number().min(0).max(6))
    })
    const { title, weekDays } = createHabitBody.parse(request.body)

    const createHabit = await HabitsRepositories.store(title, weekDays)

    const result = response.json(createHabit)

    return result
  }

  //GET Habits at day
  async findHabitsDay(request: Request, response: Response){
    const getDayParams = z.object({
      date: z.coerce.date()
    });

    const { date } = getDayParams.parse(request.query);

    const weekDay = dayjs(date).get('day');

    const possibleHabits = await HabitsRepositories.findPossibleHabits(date, weekDay);

    const result = response.json(possibleHabits);

    return result
  }

  async toggleHabit(request: Request, response: Response){
    const toggleHabitParams = z.object({
      id: z.string().uuid()
    });

    const { id } = toggleHabitParams.parse(request.params);

    const today = dayjs().startOf('day').toDate();

    const toggleHabit = await HabitsRepositories.toggleHabitRepo(id, today)

    const result = response.json(toggleHabit);

    return result
  }

  async habitsCompletedInDay(request: Request, response: Response){
    const habitsCompleted = await HabitsRepositories.habitsCompletedInDay();

    const result = response.json(habitsCompleted);

    return result
  }

}


export default new HabitsController