import { IDbClient } from '../abstraction/clients/IDbClient'
import { Course } from '../models/Course'
import { CourseStatistic } from '../models/CourseStatistic'
import { Student } from '../models/Student'
import { delay } from '../utils/common'

export class DbClient implements IDbClient {
  async AddCourse(course: Course): Promise<void> {
    await delay(500)
    console.log('Course added to database')
  }

  async AddStudentToCourse(
    student: Student,
    courseName: string
  ): Promise<void> {
    await delay(500)
    console.log('Student added to course')
  }

  async GetCourseByName(courseName: string): Promise<Course | undefined> {
    await delay(500)

    // dummy response from database
    return new Course('Clean Code', new Date('2023-12-06'), 6, 69900)
  }

  async GetCourses(): Promise<Course[]> {
    await delay(500)
    const course1 = new Course('Clean Code', new Date('2023-12-06'), 6, 69900)
    const course2 = new Course('React', new Date('2023-12-07'), 10, 175900)
    return [course1, course2]
  }

  async GetCourseStatistics(courseName: string): Promise<CourseStatistic> {
    await delay(500)
    return new CourseStatistic('Clean Code', 6, 4, 80, new Date('2024-03'))
  }
}
