import { COURSE_ERROR_MSG } from '../utils/contants'
import { Student } from './Student'

export class Course {
  private students: Student[] = []
  constructor(
    private courseName: string,
    private startDate: Date,
    private lengthInWeeks: number,
    private costInHuf: number
  ) {
    this.SetCourseName(courseName)
    this.SetStartDate(startDate)
    this.SetLengthInWeeks(lengthInWeeks)
    this.SetCostInHuf(costInHuf)
  }

  public GetCourseName(): string {
    return this.courseName
  }
  public GetStartDate(): Date {
    return this.startDate
  }

  public GetLengthInWeeks(): number {
    return this.lengthInWeeks
  }

  public GetCostInHuf(): number {
    return this.costInHuf
  }

  public AddStudent(student: Student) {
    this.students.push(student)
  }

  public GetStudents(): Student[] {
    return this.students
  }

  private SetCourseName(value: string) {
    if (!value || typeof value !== 'string') {
      throw new Error(COURSE_ERROR_MSG.COURSE_NAME_EMPTY)
    } else {
      this.courseName = value
    }
  }

  private SetStartDate(value: Date) {
    if (!value || !(value instanceof Date)) {
      throw new Error(COURSE_ERROR_MSG.START_DATE_MUST_DATE)
    }
    this.startDate = value
  }

  private SetCostInHuf(value: number) {
    if (!value || typeof value !== 'number' || value < 1) {
      throw new Error(COURSE_ERROR_MSG.COST_IN_HUF_MUST_POSITIVE_NUMBER)
    }
    this.costInHuf = value
  }

  private SetLengthInWeeks(value: number) {
    if (!value || typeof value !== 'number' || value < 1) {
      throw new Error(COURSE_ERROR_MSG.LENGTH_IN_WEEK_MUST_POSITIVE_NUMBER)
    }
    this.lengthInWeeks = value
  }
}
