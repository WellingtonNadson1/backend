import { z } from 'zod';
import HabitsRepositories from "../repositories/HabitsRepositories";

class HabitsController {
  async findAll(request, response ){
    const habits = await HabitsRepositories.findAll()

    const result = response.json(habits)

    return result
  }

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
}


export default new HabitsController