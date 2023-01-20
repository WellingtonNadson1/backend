import HabitsRepositories from "../repositories/HabitsRepositories"

class HabitsController {
  async findAll(request, response ){
    const habits = await HabitsRepositories.findAll()

    const result = response.json(habits)

    return result
  }
}


export default new HabitsController