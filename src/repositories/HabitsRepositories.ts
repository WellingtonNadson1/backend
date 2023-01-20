import { PrismaClient } from "@prisma/client";

class HabitsRepositories {
  async findAll(){
    const prisma = new PrismaClient();
    const habits = await prisma.habit.findMany();

    return habits
  }
}

export default new HabitsRepositories