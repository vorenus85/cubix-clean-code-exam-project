import { IDbClient } from '../abstraction/clients/IDbClient'
import { ICourseRepository } from '../abstraction/repository/ICourseRepository'
import { NetworkError } from '../exceptions/NetworkError'
import { NotFoundError } from '../exceptions/NotFoundError'
import { UnknownError } from '../exceptions/UnknownError'
import { Course } from '../models/Course'
import { CourseStatistic } from '../models/CourseStatistic'
import { Student } from '../models/Student'

export class CourseRepository implements ICourseRepository {
  private dbClient: IDbClient

  constructor(dbClient: IDbClient) {
    this.dbClient = dbClient
  }

  async AddStudentToCourse(student: Student, course: string): Promise<void> {
    try {
      await this.dbClient.AddStudentToCourse(student, course)
      student.registeredCourses.push(course)
    } catch (error) {
      if (error instanceof NetworkError || error instanceof NotFoundError) {
        throw error
      }

      throw new UnknownError('Unknown error happened.')
    }
  }

  async AddCourse(course: Course): Promise<void> {
    try {
      await this.dbClient.AddCourse(course)
    } catch (error) {
      if (error instanceof NetworkError) {
        throw error
      }

      throw new UnknownError('Unknown error happened.')
    }
  }

  async GetCourseByName(coarseName: string): Promise<Course | undefined> {
    try {
      return await this.dbClient.GetCourseByName(coarseName)
    } catch (error) {
      if (error instanceof NetworkError || error instanceof NotFoundError) {
        throw error
      }

      throw new UnknownError('Unknown error happened.')
    }
  }

  async GetCourses(): Promise<Course[]> {
    try {
      return await this.dbClient.GetCourses()
    } catch (error) {
      if (error instanceof NetworkError) {
        throw error
      }

      throw new UnknownError('Unknown error happened.')
    }
  }

  async GetCourseStatistics(courseName: string): Promise<CourseStatistic> {
    try {
      return await this.dbClient.GetCourseStatistics(courseName)
    } catch (error) {
      if (error instanceof NetworkError || error instanceof NotFoundError) {
        throw error
      }

      throw new UnknownError('Unknown error happened.')
    }
  }
}
