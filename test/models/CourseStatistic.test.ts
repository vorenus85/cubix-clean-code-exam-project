import { CourseStatistic } from '../../src/models/CourseStatistic'
import { COURSE_STATISTIC_MSG } from '../../src/utils/constants'
import { CourseStatisticFixture } from '../fixtures'

describe('Course Statistic tests', () => {
  let courseStatistic: CourseStatistic
  const courseName = 'Clean Code'
  const totalLectures = 6
  const lecturesCompleted = 4
  const progress = 80
  const lastAccessed = new Date('2024-01-22')

  describe('Happy paths', () => {
    it('should create CourseStatistic with valid ', () => {
      courseStatistic = new CourseStatistic(
        courseName,
        totalLectures,
        lecturesCompleted,
        progress,
        lastAccessed
      )

      expect(courseStatistic.GetCourseName()).toBe(courseName)
      expect(courseStatistic.GetTotalLecture()).toBe(totalLectures)
      expect(courseStatistic.GetLecturesCompleted()).toBe(lecturesCompleted)
      expect(courseStatistic.GetProgress()).toBe(progress)
      expect(courseStatistic.GetLastAccessed()).toBe(lastAccessed)
    })

    test('should CourseStatistic exits with all possible properties', () => {
      const actualResult = CourseStatisticFixture

      expect(actualResult).toMatchSnapshot()
    })
  })

  describe('Error paths', () => {
    test.each`
      invalidValue    | courseName    | totalLectures    | lecturesCompleted    | progress    | lastAccessed    | invalidProperty        | errorMessage
      ${''}           | ${''}         | ${totalLectures} | ${lecturesCompleted} | ${progress} | ${lastAccessed} | ${'courseName'}        | ${COURSE_STATISTIC_MSG.COURSE_NAME_EMPTY}
      ${0}            | ${courseName} | ${0}             | ${lecturesCompleted} | ${progress} | ${lastAccessed} | ${'totalLectures'}     | ${COURSE_STATISTIC_MSG.TOTAL_LECTURE_MUST_BE_POSITIVE}
      ${-9}           | ${courseName} | ${-9}            | ${lecturesCompleted} | ${progress} | ${lastAccessed} | ${'totalLectures'}     | ${COURSE_STATISTIC_MSG.TOTAL_LECTURE_MUST_BE_POSITIVE}
      ${0}            | ${courseName} | ${totalLectures} | ${0}                 | ${progress} | ${lastAccessed} | ${'lecturesCompleted'} | ${COURSE_STATISTIC_MSG.LECTURE_COMPLETED_MUST_BE_POSITIVE}
      ${-9}           | ${courseName} | ${totalLectures} | ${-9}                | ${progress} | ${lastAccessed} | ${'lecturesCompleted'} | ${COURSE_STATISTIC_MSG.LECTURE_COMPLETED_MUST_BE_POSITIVE}
      ${0}            | ${courseName} | ${totalLectures} | ${lecturesCompleted} | ${0}        | ${lastAccessed} | ${'progress'}          | ${COURSE_STATISTIC_MSG.PROGRESS_MUST_BE_POSITIVE}
      ${-9}           | ${courseName} | ${totalLectures} | ${lecturesCompleted} | ${-9}       | ${lastAccessed} | ${'progress'}          | ${COURSE_STATISTIC_MSG.PROGRESS_MUST_BE_POSITIVE}
      ${'2024-01-24'} | ${courseName} | ${totalLectures} | ${lecturesCompleted} | ${progress} | ${'2024-01-24'} | ${'lastAccessed'}      | ${COURSE_STATISTIC_MSG.LAST_ACCESSED_MUST_DATE}
      ${''}           | ${courseName} | ${totalLectures} | ${lecturesCompleted} | ${progress} | ${''}           | ${'lastAccessed'}      | ${COURSE_STATISTIC_MSG.LAST_ACCESSED_MUST_DATE}
    `(
      'should throw error because property of $invalidProperty is invalid, value is: $invalidValue',
      ({
        courseName,
        totalLectures,
        lecturesCompleted,
        progress,
        lastAccessed,
        errorMessage,
      }) => {
        const errorExpected = new Error(errorMessage)

        const actualResult = () =>
          new CourseStatistic(
            courseName,
            totalLectures,
            lecturesCompleted,
            progress,
            lastAccessed
          )

        expect(() => actualResult()).toThrow(errorExpected)
      }
    )
  })
})
