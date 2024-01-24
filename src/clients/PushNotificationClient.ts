import { IMessageClient } from '../abstraction/clients/IMessageClient'

export class PushNotificationClient implements IMessageClient {
  SendNotification(message: string): void {
    console.log(`Sending Push Notification: ${message}`)
  }
}
