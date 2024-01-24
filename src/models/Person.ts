import { PERSON_ERROR_MSG } from '../utils/personErrorMessages'

export abstract class Person {
  constructor(
    private name: string,
    private email: string
  ) {
    this.SetName(name)
    this.SetEmail(email)
  }

  public GetName(): string {
    return this.name
  }

  public GetEmail(): string {
    return this.email
  }

  private SetName(value: string) {
    if (!value || typeof value !== 'string') {
      throw new Error(PERSON_ERROR_MSG.NAME_EMPTY)
    } else {
      this.name = value
    }
  }

  private SetEmail(email: string) {
    if (!this.IsValidEmail(email)) {
      throw new Error(PERSON_ERROR_MSG.INVALID_EMAIL)
    } else {
      this.email = email
    }
  }

  private IsValidEmail(email: string): boolean {
    // Basic email validation using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
}
