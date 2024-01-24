import { mock, mockReset } from 'jest-mock-extended'
import { CourseService } from '../../src/services/CourseService'
import { PaymentService } from '../../src/services/PaymentService'
import { NotificationService } from '../../src/services/NotificationService'
import { CourseRepository } from '../../src/repository/CourseRepository'
import { Course } from '../../src/models/Course'
import { Student } from '../../src/models/Student'
import { CourseFixture, StudentFixture } from '../fixtures'
import { NotFoundError } from '../../src/exceptions/NotFoundError'

const mockedCourseRepository = mock<CourseRepository>()
const mockedPaymentService = mock<PaymentService>()
const mockedNotificationService = mock<NotificationService>()

describe('CourseService tests', () => {
  let courseService: CourseService

  beforeEach(() => {
    mockReset(mockedCourseRepository)
    mockReset(mockedPaymentService)
    mockReset(mockedNotificationService)

    courseService = new CourseService(
      mockedCourseRepository,
      mockedPaymentService,
      mockedNotificationService
    )
  })

  describe('Happy paths', () => {
    it('should add Course', async () => {
      // Arrange
      const course = new Course('Clean Code', new Date('2023-12-06'), 6, 69900)
      mockedCourseRepository.AddCourse.mockImplementation()

      // Act
      courseService.AddCourse(course)

      expect(mockedCourseRepository.AddCourse).toHaveBeenCalledTimes(1)
      expect(mockedCourseRepository.AddCourse).toHaveBeenCalledWith(course)
    })

    it('should get all courses', async () => {
      // Arrange
      mockedCourseRepository.GetCourses.mockImplementation()

      // Act
      courseService.GetCourses()

      // Assert
      expect(mockedCourseRepository.GetCourses).toHaveBeenCalledTimes(1)
      expect(mockedCourseRepository.GetCourses).toHaveBeenCalledWith()
    })

    it('should get Course Statistic', async () => {
      // Arrange
      const courseName = 'Clean Code'
      mockedCourseRepository.GetCourseStatistics.mockImplementation()

      // Act
      await courseService.GetCourseStatistics(courseName)

      // Assert
      expect(mockedCourseRepository.GetCourseStatistics).toHaveBeenCalledTimes(
        1
      )
      expect(mockedCourseRepository.GetCourseStatistics).toHaveBeenCalledWith(
        courseName
      )
    })

    it('should add Student to Course', async () => {
      // Arrange
      const student = StudentFixture
      const course = CourseFixture
      const courseName = 'Clean Code'

      mockedCourseRepository.GetCourseByName.mockResolvedValue(course)
      mockedPaymentService.GetIsOrderPayed.mockResolvedValue(true)
      mockedNotificationService.SendNotifications.mockImplementation()

      // Act
      await courseService.AddStudentToCourse(student, courseName)

      // Assert
      expect(mockedCourseRepository.GetCourseByName).toHaveBeenCalledTimes(1)
      expect(mockedCourseRepository.GetCourseByName).toHaveBeenCalledWith(
        courseName
      )
      expect(mockedPaymentService.GetIsOrderPayed).toHaveBeenCalledTimes(1)
      expect(mockedPaymentService.GetIsOrderPayed).toHaveBeenCalledWith(student)
      expect(mockedNotificationService.SendNotifications).toHaveBeenCalledTimes(
        1
      )
      expect(mockedNotificationService.SendNotifications).toHaveBeenCalledWith(
        'John Doe student was added to course.'
      )
      expect(course.GetStudents()).toStrictEqual([student])
    })
  })

  describe('Error paths', () => {
    it('should throw error via add Student to Course because Course not found', async () => {
      // Arrange
      const student = StudentFixture
      const course = CourseFixture
      const courseName = 'Clean Code'
      const errorMessage = 'Course not found'
      const expectedError = new NotFoundError(errorMessage)

      mockedCourseRepository.GetCourseByName.mockRejectedValue(() => {
        throw expectedError
      })

      // Assert
      expect(() =>
        courseService.AddStudentToCourse(student, courseName)
      ).rejects.toThrow(expectedError)
      expect(mockedCourseRepository.GetCourseByName).toHaveBeenCalledTimes(1)
      expect(mockedCourseRepository.GetCourseByName).toHaveBeenCalledWith(
        courseName
      )
    })

    it('should throw error via add Student to Course because Student not paid Order', async () => {
      // Arrange
      const student = StudentFixture
      const course = CourseFixture
      const courseName = 'Clean Code'
      const errorMessage = 'Course is not yet paid by Student.'
      const expectedError = new Error(errorMessage)

      mockedCourseRepository.GetCourseByName.mockResolvedValueOnce(course)
      mockedPaymentService.GetIsOrderPayed.mockResolvedValueOnce(false)

      // Assert
      expect(() =>
        courseService.AddStudentToCourse(student, courseName)
      ).rejects.toThrow(expectedError)
      expect(mockedCourseRepository.GetCourseByName).toHaveBeenCalledTimes(1)
      expect(mockedCourseRepository.GetCourseByName).toHaveBeenCalledWith(
        courseName
      )
      expect(mockedPaymentService.GetIsOrderPayed).toHaveBeenCalledTimes(0)
    })
  })
})
