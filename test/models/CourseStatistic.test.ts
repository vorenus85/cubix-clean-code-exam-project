import { CourseStatistic } from '../../src/models/CourseStatistic'
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
  describe('Error paths', () => {})
})
