import { IPaymentService } from '../abstraction/services/IPaymentService'
import { Student } from '../models/Student'
import { delay } from '../utils/common'

export class FinancialApiClient implements IPaymentService {
  public async GetIsOrderPayed(student: Student): Promise<boolean> {
    await delay(500)
    return true
  }
}
