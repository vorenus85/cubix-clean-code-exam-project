import { mock, mockReset } from 'jest-mock-extended'
import { FinancialApiClient } from '../../src/clients/FinancialApiClient'
import { Student } from '../../src/models/Student'
import { IFinancialApiClient } from '../../src/abstraction/clients/IFinancialApiclient'

describe('FinancialApiClient tests', () => {
  let financialApiClient: IFinancialApiClient
  const mockedStudent = mock<Student>()

  beforeEach(() => {
    mockReset(mockedStudent)
    financialApiClient = new FinancialApiClient()
  })

  it('should get order is payed', async () => {
    const actualResult = await financialApiClient.GetIsOrderPayed(mockedStudent)

    expect(actualResult).toBe(true)
  })
})
