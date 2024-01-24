import { Student } from '../../models/Student'

export interface IFinancialApiClient {
  GetIsOrderPayed(student: Student): Promise<boolean>
}
