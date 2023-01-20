import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";

const prisma = new PrismaClient();

class HabitsRepositories {

  async findAll(){
    const habits = await prisma.habit.findMany();

    return habits
  }

  async store(title: string, weekDays: number[]){

    const today = dayjs().startOf("day").toDate();
    
    const createHabit = await prisma.habit.create({
      data: {
        title,
        created_at: today,
        weekDays: {
          create: weekDays.map(weekDay =>{
            return {
              week_day: weekDay
            }
          })
        }
      }
    })

    return createHabit
  }
}

export default new HabitsRepositories