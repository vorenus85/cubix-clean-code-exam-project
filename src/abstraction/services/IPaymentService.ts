import { Student } from '../../models/Student'

export interface IPaymentService {
  GetIsOrderPayed(student: Student): Promise<boolean>
}
