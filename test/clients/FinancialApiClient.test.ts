import { mock, mockReset } from 'jest-mock-extended'
import { FinancialApiClient } from '../../src/clients/FinancialApiClient'
import { Student } from '../../src/models/Student'

describe('FinancialApiClient tests', () => {
  let financialApiClient: FinancialApiClient
  const mockedStudent = mock<Student>()

  beforeEach(() => {
    mockReset(mockedStudent)
    financialApiClient = new FinancialApiClient()
  })

  it('should Student order is payed', async () => {
    const actualResult = await financialApiClient.GetIsOrderPayed(mockedStudent)

    expect(actualResult).toBe(true)
  })
})
