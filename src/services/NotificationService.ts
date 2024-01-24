import { INotificationService } from '../abstraction/services/INotificationService'
import { EmailClient } from '../clients/EmailClient'
import { PushNotificationClient } from '../clients/PushNotificationClient'

export class NotificationService implements INotificationService {
  constructor(
    private emailClient: EmailClient,
    private pushNotificationClient: PushNotificationClient
  ) {}

  SendNotifications(message: string): void {
    const notificationClients = [this.emailClient, this.pushNotificationClient]
    notificationClients.forEach((client) => {
      client.SendNotification(message)
    })
  }
}
