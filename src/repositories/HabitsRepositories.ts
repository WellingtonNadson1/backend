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

  async findPossibleHabits(date: Date, weekDay: number){
    const possibleHabits = await prisma.habit.findMany({
      where: {
        created_at: {
          lte: date,
        },
        weekDays: {
          some: {
            week_day: weekDay
          }
        }
      }
    });

    const day = await prisma.day.findUnique({
      where: {
        date: date
      },
      include: {
        dayHabit: true
      }
    });

    const completedHabits = day?.dayHabit.map(dayHabit => {
      return dayHabit.habit_id
    })

    return {
      possibleHabits,
      completedHabits
    }
  }
  
}

export default new HabitsRepositories