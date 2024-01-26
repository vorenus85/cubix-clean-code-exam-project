import { DbClient } from '../../src/clients/DbClient'
import { mock, mockReset } from 'jest-mock-extended'
import { CourseRepository } from '../../src/repository/CourseRepository'
import { Course } from '../../src/models/Course'
import { Student } from '../../src/models/Student'
import { NetworkError } from '../../src/exceptions/NetworkError'
import { NotFoundError } from '../../src/exceptions/NotFoundError'
import { UnknownError } from '../../src/exceptions/UnknownError'
import { IDbClient } from '../../src/abstraction/clients/IDbClient'

const mockedDbClient = mock<IDbClient>()
const mockedCourse = mock<Course>()
const mockedStudent = mock<Student>()

describe('CourseRepository tests', () => {
  let courseRepository: CourseRepository

  beforeEach(() => {
    mockReset(mockedDbClient)
    mockReset(mockedCourse)
    mockReset(mockedStudent)
    courseRepository = new CourseRepository(mockedDbClient)
  })

  describe('Happy paths', () => {
    it('should add Student to Course', async () => {
      // Arrange
      const courseName = 'Clean Code'
      const studentAddToCourse = new Student('Joe', 'joe@email.com')
      mockedDbClient.AddStudentToCourse.calledWith(
        studentAddToCourse,
        courseName
      )

      // Act
      await courseRepository.AddStudentToCourse(studentAddToCourse, courseName)

      // Assert
      expect(studentAddToCourse.registeredCourses).toStrictEqual([courseName])
      expect(mockedDbClient.AddStudentToCourse).toHaveBeenCalledTimes(1)
      expect(mockedDbClient.AddStudentToCourse).toHaveBeenCalledWith(
        studentAddToCourse,
        courseName
      )
    })

    it('should add Course', async () => {
      // Arrange
      mockedDbClient.AddCourse.calledWith(mockedCourse)

      // Act
      await courseRepository.AddCourse(mockedCourse)

      // Assert
      expect(mockedDbClient.AddCourse).toHaveBeenCalledTimes(1)
      expect(mockedDbClient.AddCourse).toHaveBeenCalledWith(mockedCourse)
    })

    it('should get Courses by Name', async () => {
      // Arrange
      const courseName = 'Clean Code'
      mockedDbClient.GetCourseByName.calledWith(courseName)

      // Act
      await courseRepository.GetCourseByName(courseName)

      // Assert
      expect(mockedDbClient.GetCourseByName).toHaveBeenCalledTimes(1)
      expect(mockedDbClient.GetCourseByName).toHaveBeenCalledWith(courseName)
    })

    it('should get Courses', async () => {
      // Arrange
      mockedDbClient.GetCourses.calledWith()

      // Act
      await courseRepository.GetCourses()

      // Assert
      expect(mockedDbClient.GetCourses).toHaveBeenCalledTimes(1)
    })

    it('should get Course Statistic', async () => {
      // Arrange
      const courseName = 'Clean Code'
      mockedDbClient.GetCourseStatistics.calledWith(courseName)

      // Act
      await courseRepository.GetCourseStatistics(courseName)

      // Assert
      expect(mockedDbClient.GetCourseStatistics).toHaveBeenCalledTimes(1)
      expect(mockedDbClient.GetCourseStatistics).toHaveBeenCalledWith(
        courseName
      )
    })
  })

  describe('Error paths', () => {
    test.each`
      description                                                     | errorExpected
      ${'should throw NetworkError while try add Student to Course'}  | ${new NetworkError('NetworkError error happened.')}
      ${'should throw NotFoundError while try add Student to Course'} | ${new NotFoundError('NotFoundError error happened.')}
      ${'should throw UnknownError while try add Student to Course'}  | ${new UnknownError('Unknown error happened.')}
    `('$description', async ({ errorExpected }) => {
      // Arrange
      const courseName = 'Clean Code'
      const studentAddToCourse = new Student('Joe', 'joe@email.com')

      mockedDbClient.AddStudentToCourse.mockImplementation(() => {
        throw errorExpected
      })

      // Assert
      await expect(
        courseRepository.AddStudentToCourse(studentAddToCourse, courseName)
      ).rejects.toThrow(errorExpected)
      expect(studentAddToCourse.registeredCourses).toStrictEqual([])
      expect(mockedDbClient.AddStudentToCourse).toHaveBeenCalledTimes(1)
      expect(mockedDbClient.AddStudentToCourse).toHaveBeenCalledWith(
        studentAddToCourse,
        courseName
      )
    })

    test.each`
      description                                     | errorExpected
      ${'should throw NetworkError while add Course'} | ${new NetworkError('NetworkError error happened.')}
      ${'should throw UnknownError while add Course'} | ${new UnknownError('Unknown error happened.')}
    `('$description', async ({ errorExpected }) => {
      mockedDbClient.AddCourse.mockImplementation(() => {
        throw errorExpected
      })

      // Assert
      await expect(courseRepository.AddCourse(mockedCourse)).rejects.toThrow(
        errorExpected
      )
      expect(mockedDbClient.AddCourse).toHaveBeenCalledTimes(1)
      expect(mockedDbClient.AddCourse).toHaveBeenCalledWith(mockedCourse)
    })

    test.each`
      description                                              | errorExpected
      ${'should throw NetworkError while get Course by Name'}  | ${new NetworkError('NetworkError error happened.')}
      ${'should throw NotFoundError while get Course by Name'} | ${new NotFoundError('NotFoundError error happened.')}
      ${'should throw UnknownError while get Course by Name'}  | ${new UnknownError('Unknown error happened.')}
    `('$description', async ({ errorExpected }) => {
      const courseName = 'Clean Code'
      mockedDbClient.GetCourseByName.mockImplementation(() => {
        throw errorExpected
      })

      // Assert
      await expect(
        courseRepository.GetCourseByName(courseName)
      ).rejects.toThrow(errorExpected)
      expect(mockedDbClient.GetCourseByName).toHaveBeenCalledTimes(1)
      expect(mockedDbClient.GetCourseByName).toHaveBeenCalledWith(courseName)
    })

    test.each`
      description                                          | errorExpected
      ${'should throw NetworkError while get all Courses'} | ${new NetworkError('NetworkError error happened.')}
      ${'should throw UnknownError while get all Courses'} | ${new UnknownError('Unknown error happened.')}
    `('$description', async ({ errorExpected }) => {
      mockedDbClient.GetCourses.mockImplementation(() => {
        throw errorExpected
      })

      // Assert
      await expect(courseRepository.GetCourses()).rejects.toThrow(errorExpected)
      expect(mockedDbClient.GetCourses).toHaveBeenCalledTimes(1)
    })

    test.each`
      description                                                | errorExpected
      ${'should throw NetworkError while get Course Statistic'}  | ${new NetworkError('NetworkError error happened.')}
      ${'should throw NotFoundError while get Course Statistic'} | ${new NotFoundError('NotFoundError error happened.')}
      ${'should throw UnknownError while get Course Statistic'}  | ${new UnknownError('Unknown error happened.')}
    `('$description', async ({ errorExpected }) => {
      const courseName = 'Clean Code'
      mockedDbClient.GetCourseStatistics.mockImplementation(() => {
        throw errorExpected
      })

      // Assert
      await expect(
        courseRepository.GetCourseStatistics(courseName)
      ).rejects.toThrow(errorExpected)
      expect(mockedDbClient.GetCourseStatistics).toHaveBeenCalledTimes(1)
      expect(mockedDbClient.GetCourseStatistics).toHaveBeenCalledWith(
        courseName
      )
    })
  })
})
