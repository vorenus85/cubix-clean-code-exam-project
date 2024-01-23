import { Course } from '../models/Course'
import { Student } from '../models/Student'
import { ICourseRepository } from '../abstraction/repository/ICourseRepository'
import { IPaymentService } from '../abstraction/services/IPaymentService'
import { INotificationService } from '../abstraction/services/INotificationService'
import { ICourseService } from '../abstraction/services/ICourseService'

export class CourseService implements ICourseService {
  constructor(
    private courseRepository: ICourseRepository,
    private paymentService: IPaymentService,
    private notificationService: INotificationService
  ) {}

  public async AddCourse(course: Course) {
    await this.courseRepository.AddCourse(course)
  }

  public async GetCourses() {
    return await this.courseRepository.GetCourses()
  }

  public async AddStudentToCourse(student: Student, courseName: string) {
    const course = await this.courseRepository.GetCourseByName(courseName)

    if (!course) {
      throw new Error('Course not found')
    }

    const isCoursePayedByStudent =
      await this.paymentService.GetIsOrderPayed(student)

    if (!isCoursePayedByStudent) {
      throw new Error('Course is not yet paid by Student.')
    }

    course.AddStudent(student)

    await this.notificationService.SendNotifications(
      `${student.GetName()}student was added to course.`
    )
  }

  public async GetCourseStatistics(courseName: string) {
    return await this.courseRepository.GetCourseStatistics(courseName)
  }
}
