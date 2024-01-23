import { Course } from './Course'
import { Person } from './Person'

export class Lecturer extends Person {
  constructor(
    name: string,
    email: string,
    public assignedCourses: string[] = []
  ) {
    super(name, email)
  }
}
