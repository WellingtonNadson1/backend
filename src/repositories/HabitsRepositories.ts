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

  //Completando Hábito
  async toggleHabitRepo(id: string, today: Date){
    let day = await prisma.day.findUnique({
      where: {
        date: today,
      }
    });

    if (!day) {
      day = await prisma.day.create({
        data: {
          date: today
        }
      })
    }

    const dayHabit = await prisma.dayHabit.findUnique({
      where: {
        day_id_habit_id: {
          day_id: day.id,
          habit_id: id
        }
      }
    })

    if (dayHabit) {
      await prisma.dayHabit.delete({
        where: {
          id: dayHabit.id
        }
      })
    } else {
      await prisma.dayHabit.create({
        data: {
          day_id: day.id,
          habit_id: id
        }
      })
    }
    
  }
  
  async habitsCompletedInDay(){
    const summary = await prisma.$queryRaw`
      SELECT 
        D.id, 
        D.date,
        (
          SELECT
            cast(count(*) as float)
          FROM day_habits DH
          WHERE DH.day_id = D.id
        ) as completed
      FROM days D
    `

    return summary
  }
}

export default new HabitsRepositories