import { INotificationService } from '../../src/abstraction/services/INotificationService'
import { EmailClient } from '../../src/clients/EmailClient'
import { PushNotificationClient } from '../../src/clients/PushNotificationClient'
import { NotificationService } from '../../src/services/NotificationService'
import { mock } from 'jest-mock-extended'

const mockedEmailClient = mock<EmailClient>()
const mockedPushNotificationClient = mock<PushNotificationClient>()

describe('NotificationService test', () => {
  let notificationService: INotificationService

  beforeEach(() => {
    notificationService = new NotificationService(
      mockedEmailClient,
      mockedPushNotificationClient
    )
  })

  it('should send notifications', () => {
    const message = 'Custom message sent'
    // Arrange
    mockedEmailClient.SendNotification.mockImplementation()
    mockedPushNotificationClient.SendNotification.mockImplementation()

    // Act
    notificationService.SendNotifications(message)
    // Assert
    expect(mockedEmailClient.SendNotification).toHaveBeenCalledTimes(1)
    expect(mockedPushNotificationClient.SendNotification).toHaveBeenCalledTimes(
      1
    )
    expect(mockedEmailClient.SendNotification).toHaveBeenCalledWith(message)
    expect(
      mockedPushNotificationClient.SendNotification
    ).toHaveBeenLastCalledWith(message)
  })
})
