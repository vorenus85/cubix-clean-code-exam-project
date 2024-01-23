import { Course } from '../../src/models/Course'
import { Student } from '../../src/models/Student'
import { COURSE_ERROR_MSG } from '../../src/utils/contants'
import { CourseFixture } from '../fixtures'
import { mock, mockReset } from 'jest-mock-extended'

const mockStudent = mock<Student>()

describe('Course tests:', () => {
  let course: Course
  const courseName = 'Clean Code'
  const startDate = new Date('2023-12-06')
  const lengthInWeeks = 6
  const costInHuf = 69900

  describe('Happy paths', () => {
    it('should create Course with valid courseName, startDate, lengthInWeeks, costInHuf', () => {
      course = new Course(courseName, startDate, lengthInWeeks, costInHuf)

      expect(course.GetCourseName()).toBe(courseName)
      expect(course.GetStartDate()).toBe(startDate)
      expect(course.GetLengthInWeeks()).toBe(lengthInWeeks)
      expect(course.GetCostInHuf()).toBe(costInHuf)
    })

    it('should Course exits with all possible properties', () => {
      const actualResult = CourseFixture

      expect(actualResult).toMatchSnapshot()
    })

    it('should add Student to Course, then retrieve him', () => {
      course = new Course(courseName, startDate, lengthInWeeks, costInHuf)

      course.AddStudent(mockStudent)

      const actualResult = course.GetStudents()

      expect(actualResult).toStrictEqual([mockStudent])
    })
  })

  describe('Error paths', () => {
    test.each`
      invalidValue | courseName    | startDate    | lengthInWeeks    | costInHuf    | invalidProperty    | errorMessage
      ${''}        | ${''}         | ${startDate} | ${lengthInWeeks} | ${costInHuf} | ${'courseName'}    | ${COURSE_ERROR_MSG.COURSE_NAME_EMPTY}
      ${''}        | ${courseName} | ${''}        | ${lengthInWeeks} | ${costInHuf} | ${'startDate'}     | ${COURSE_ERROR_MSG.START_DATE_MUST_DATE}
      ${''}        | ${courseName} | ${startDate} | ${lengthInWeeks} | ${''}        | ${'costInHuf'}     | ${COURSE_ERROR_MSG.COST_IN_HUF_MUST_POSITIVE_NUMBER}
      ${-9}        | ${courseName} | ${startDate} | ${lengthInWeeks} | ${-9}        | ${'costInHuf'}     | ${COURSE_ERROR_MSG.COST_IN_HUF_MUST_POSITIVE_NUMBER}
      ${''}        | ${courseName} | ${startDate} | ${''}            | ${costInHuf} | ${'lengthInWeeks'} | ${COURSE_ERROR_MSG.LENGTH_IN_WEEK_MUST_POSITIVE_NUMBER}
      ${-9}        | ${courseName} | ${startDate} | ${-9}            | ${costInHuf} | ${'lengthInWeeks'} | ${COURSE_ERROR_MSG.LENGTH_IN_WEEK_MUST_POSITIVE_NUMBER}
    `(
      `should throw error because property of $invalidProperty is invalid, value is: $invalidValue`,
      ({ courseName, startDate, lengthInWeeks, costInHuf, errorMessage }) => {
        const errorExpected = new Error(errorMessage)

        expect(
          () => new Course(courseName, startDate, lengthInWeeks, costInHuf)
        ).toThrow(errorExpected)
      }
    )
  })
})
