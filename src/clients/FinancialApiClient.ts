import { IFinancialApiClient } from '../abstraction/clients/IFinancialApiclient'
import { Student } from '../models/Student'
import { delay } from '../utils/common'

export class FinancialApiClient implements IFinancialApiClient {
  public async GetIsOrderPayed(student: Student): Promise<boolean> {
    await delay(500)
    return true
  }
}
