import dayjs from 'dayjs';
import { z } from 'zod';
import HabitsRepositories from "../repositories/HabitsRepositories";

class HabitsController {
  async findAll(request, response ){
    const habits = await HabitsRepositories.findAll()

    const result = response.json(habits)

    return result
  }

  //POST Habit
  async store(request, response){
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
  async findHabitsDay(request, response){
    const getDayParams = z.object({
      date: z.coerce.date()
    });

    const { date } = getDayParams.parse(request.query);

    const weekDay = dayjs(date).get('day');

    const possibleHabits = await HabitsRepositories.findPossibleHabits(date, weekDay);

    const result = response.json(possibleHabits);

    return result
  }

}


export default new HabitsController