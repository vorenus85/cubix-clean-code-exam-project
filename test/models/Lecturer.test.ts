import { Lecturer } from '../../src/models/Lecturer'
import { PERSON_ERROR_MSG } from '../../src/utils/contants'
import { LecturerFixture } from '../fixtures'

describe('Lecturer tests', () => {
  let lecturer: Lecturer
  const name = 'Joe'
  const email = 'joe@email.com'

  describe('Happy paths', () => {
    it('should create Lecturer with valid name and email', () => {
      // Arrange
      lecturer = new Lecturer(name, email)

      // Assert
      expect(lecturer.GetName()).toBe(name)
      expect(lecturer.GetEmail()).toBe(email)
    })

    it('should Lecturer exits with all possible properties', () => {
      const actualResult = LecturerFixture

      expect(actualResult).toMatchSnapshot()
    })
  })

  describe('Error paths', () => {
    it('should throw an error for invalid name', () => {
      const errorMessage = PERSON_ERROR_MSG.NAME_EMPTY
      const errorExpected = new Error(errorMessage)

      expect(() => new Lecturer('', email)).toThrow(errorExpected)
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

        expect(() => new Lecturer(name, invalidEmail)).toThrow(errorExpected)
      }
    )
  })
})
