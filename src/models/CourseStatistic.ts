import { COURSE_STATISTIC_MSG } from '../utils/courseStaticMessages'

export class CourseStatistic {
  constructor(
    private courseName: string,
    private totalLectures: number,
    private lecturesCompleted: number,
    private progress: number,
    private lastAccessed: Date
  ) {
    this.SetCourseName(courseName)
    this.SetTotalLectures(totalLectures)
    this.SetLecturesCompleted(lecturesCompleted)
    this.SetProgress(progress)
    this.SetLastAccessed(lastAccessed)
  }

  public GetCourseName(): string {
    return this.courseName
  }

  public GetTotalLecture(): number {
    return this.totalLectures
  }

  public GetLecturesCompleted(): number {
    return this.lecturesCompleted
  }

  public GetProgress(): number {
    return this.progress
  }

  public GetLastAccessed(): Date {
    return this.lastAccessed
  }

  private SetCourseName(value: string) {
    if (!value || typeof value !== 'string') {
      throw new Error(COURSE_STATISTIC_MSG.COURSE_NAME_EMPTY)
    } else {
      this.courseName = value
    }
  }

  private SetTotalLectures(value: number) {
    if (!value || typeof value !== 'number' || value < 1) {
      throw new Error(COURSE_STATISTIC_MSG.TOTAL_LECTURE_MUST_BE_POSITIVE)
    } else {
      this.totalLectures = value
    }
  }

  private SetLecturesCompleted(value: number) {
    if (!value || typeof value !== 'number' || value < 1) {
      throw new Error(COURSE_STATISTIC_MSG.LECTURE_COMPLETED_MUST_BE_POSITIVE)
    } else {
      this.lecturesCompleted = value
    }
  }

  private SetProgress(value: number) {
    if (!value || typeof value !== 'number' || value < 1) {
      throw new Error(COURSE_STATISTIC_MSG.PROGRESS_MUST_BE_POSITIVE)
    } else {
      this.progress = value
    }
  }

  private SetLastAccessed(value: Date) {
    if (!value || !(value instanceof Date)) {
      throw new Error(COURSE_STATISTIC_MSG.LAST_ACCESSED_MUST_DATE)
    } else {
      this.lastAccessed = value
    }
  }
}
