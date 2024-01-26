import { IMessageClient } from '../../src/abstraction/clients/IMessageClient'
import { PushNotificationClient } from '../../src/clients/PushNotificationClient'

describe('EmailClient test', () => {
  let pushNotificationClient: IMessageClient

  beforeEach(() => {
    pushNotificationClient = new PushNotificationClient()
  })

  it('should send email notification', () => {
    // Arrange
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation()

    // Act
    pushNotificationClient.SendNotification('custom push notification')

    // Assert
    expect(consoleLogSpy).toHaveBeenCalledTimes(1)
  })
})
