import { IFinancialApiClient } from '../abstraction/clients/IFinancialApiclient'
import { IPaymentService } from '../abstraction/services/IPaymentService'
import { NetworkError } from '../exceptions/NetworkError'
import { NotFoundError } from '../exceptions/NotFoundError'
import { UnknownError } from '../exceptions/UnknownError'
import { Student } from '../models/Student'

export class PaymentService implements IPaymentService {
  private financialApiClient: IFinancialApiClient

  constructor(financialApiClient: IFinancialApiClient) {
    this.financialApiClient = financialApiClient
  }

  public async GetIsOrderPayed(student: Student): Promise<boolean> {
    try {
      return await this.financialApiClient.GetIsOrderPayed(student)
    } catch (error) {
      if (error instanceof NetworkError || error instanceof NotFoundError) {
        throw error
      }

      throw new UnknownError('Unknown error happened.')
    }
  }
}
