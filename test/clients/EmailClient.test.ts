import { EmailClient } from '../../src/clients/EmailClient'

describe('EmailClient test', () => {
  let emailClient: EmailClient

  beforeEach(() => {
    emailClient = new EmailClient()
  })

  it('should send email notification', () => {
    // Arrange
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation()

    // Act
    emailClient.SendNotification('custom email')

    // Assert
    expect(consoleLogSpy).toHaveBeenCalledTimes(1)
  })
})
