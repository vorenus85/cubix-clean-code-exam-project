import { Course } from '../src/models/Course'
import { CourseStatistic } from '../src/models/CourseStatistic'
import { Lecturer } from '../src/models/Lecturer'
import { Student } from '../src/models/Student'

export const StudentFixture = new Student('John Doe', 'john.doe@gmail.com', [
  'Clean Code',
  'React',
])

export const LecturerFixture = new Lecturer('Joe Cocker', 'joe@cocker.com', [
  'React',
])

export const CourseFixture = new Course(
  'Clean Code',
  new Date('2023-12-06'),
  6,
  69900
)

export const CourseStatisticFixture = new CourseStatistic(
  'Clean Code',
  6,
  4,
  80,
  new Date('2024-01-22')
)
