import { Student } from '../../src/models/Student'
import { PERSON_ERROR_MSG } from '../../src/utils/contants'
import { StudentFixture } from '../fixtures'

describe('Student tests', () => {
  let student: Student
  const name = 'Joe'
  const email = 'joe@email.com'

  describe('Happy paths', () => {
    it('should create Student with valid name and email', () => {
      // Arrange
      student = new Student(name, email)

      // Assert
      expect(student.GetName()).toBe(name)
      expect(student.GetEmail()).toBe(email)
    })

    it('should Student exits with all possible properties', () => {
      const actualResult = StudentFixture

      expect(actualResult).toMatchSnapshot()
    })
  })

  describe('Error paths', () => {
    it('should throw an error for invalid name', () => {
      const errorMessage = PERSON_ERROR_MSG.NAME_EMPTY
      const errorExpected = new Error(errorMessage)

      expect(() => new Student('', email)).toThrow(errorExpected)
    })

    test.each`
      invalidEmail
      ${''}
      ${'joe.email.com'}
      ${'joe.@.com'}
    `(
      'should throw an error for invalid email given email is: $invalidEmail',
      ({ invalidEmail }) => {
        const errorMessage = PERSON_ERROR_MSG.INVALID_EMAIL
        const errorExpected = new Error(errorMessage)

        expect(() => new Student(name, invalidEmail)).toThrow(errorExpected)
      }
    )
  })
})
