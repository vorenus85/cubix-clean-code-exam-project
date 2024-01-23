import { DbClient } from '../../src/clients/DbClient'
import { mock, mockReset } from 'jest-mock-extended'
import { Course } from '../../src/models/Course'
import { Student } from '../../src/models/Student'

describe('DbClient tests', () => {
  let dbClient: DbClient
  const mockedCourse = mock<Course>()
  const mockedStudent = mock<Student>()

  beforeEach(() => {
    mockReset(mockedCourse)
    mockReset(mockedStudent)
    dbClient = new DbClient()
  })

  it('Should add Course to database', async () => {
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation()
    // Act
    await dbClient.AddCourse(mockedCourse)

    // Assert
    expect(consoleLogSpy).toHaveBeenCalledWith('Course added to database')
  })

  it('should add Student to Course', async () => {
    const courseName = 'Clean Code'
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation()

    // Act
    await dbClient.AddStudentToCourse(mockedStudent, courseName)

    // Assert
    expect(consoleLogSpy).toHaveBeenCalledWith('Student added to course')
  })

  it('should get Course by courseName', async () => {
    const courseName = 'Clean Code'
    const actualResult = await dbClient.GetCourseByName(courseName)

    // Assert
    expect(actualResult).toMatchSnapshot()
  })

  it('should get all courses', async () => {
    const actualResult = await dbClient.GetCourses()

    // Assert
    expect(actualResult).toMatchSnapshot()
  })

  it('should get Course Statistic by courseName', async () => {
    const courseName = 'Clean Code'

    const actualResult = await dbClient.GetCourseStatistics(courseName)

    // Assert
    expect(actualResult).toMatchSnapshot()
  })
})
