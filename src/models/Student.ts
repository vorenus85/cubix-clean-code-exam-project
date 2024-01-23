import { Course } from './Course'
import { Person } from './Person'

export class Student extends Person {
  constructor(
    name: string,
    email: string,
    public registeredCourses: string[] = []
  ) {
    super(name, email)
  }
}
