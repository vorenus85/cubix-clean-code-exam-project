import { IMessageClient } from '../abstraction/clients/IMessageClient'

export class EmailClient implements IMessageClient {
  SendNotification(message: string): void {
    console.log(`Sending Email: ${message}`)
  }
}
