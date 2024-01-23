import { IDbClient } from '../abstraction/clients/IDbClient'
import { ICourseRepository } from '../abstraction/repository/ICourseRepository'
import { Course } from '../models/Course'
import { CourseStatistic } from '../models/CourseStatistic'
import { Student } from '../models/Student'

export class CourseRepository implements ICourseRepository {
  private dbClient: IDbClient

  constructor(dbClient: IDbClient) {
    this.dbClient = dbClient
  }

  async AddStudentToCourse(student: Student, course: string): Promise<void> {
    student.registeredCourses.push(course)
    await this.dbClient.AddStudentToCourse(student, course)
  }

  async AddCourse(course: Course): Promise<void> {
    await this.dbClient.AddCourse(course)
  }

  async GetCourseByName(coarseName: string): Promise<Course | undefined> {
    return await this.dbClient.GetCourseByName(coarseName)
  }

  async GetCourses(): Promise<Course[]> {
    return await this.dbClient.GetCourses()
  }

  async GetCourseStatistics(courseName: string): Promise<CourseStatistic> {
    return await this.dbClient.GetCourseStatistics(courseName)
  }
}
