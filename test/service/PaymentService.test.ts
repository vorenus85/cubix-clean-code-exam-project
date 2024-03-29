import { IPaymentService } from '../../src/abstraction/services/IPaymentService'
import { FinancialApiClient } from '../../src/clients/FinancialApiClient'
import { NetworkError } from '../../src/exceptions/NetworkError'
import { NotFoundError } from '../../src/exceptions/NotFoundError'
import { UnknownError } from '../../src/exceptions/UnknownError'
import { PaymentService } from '../../src/services/PaymentService'
import { mock, mockReset } from 'jest-mock-extended'
import { StudentFixture } from '../fixtures'

const mockedFinancialApiClient = mock<FinancialApiClient>()

describe('PaymentService test', () => {
  let paymentService: IPaymentService

  beforeEach(() => {
    mockReset(mockedFinancialApiClient)
    paymentService = new PaymentService(mockedFinancialApiClient)
  })

  describe('Happy path', () => {
    it('should get order is payed', () => {
      // Arrange
      const student = StudentFixture
      mockedFinancialApiClient.GetIsOrderPayed.calledWith(student)

      // Act
      paymentService.GetIsOrderPayed(student)

      // Assert
      expect(mockedFinancialApiClient.GetIsOrderPayed).toHaveBeenCalledTimes(1)
      expect(mockedFinancialApiClient.GetIsOrderPayed).toHaveBeenCalledWith(
        student
      )
    })
  })

  describe('Error paths', () => {
    test.each`
      description                                                             | errorExpected
      ${'should throw NetworkError while get response order is payed'}        | ${new NetworkError('NetworkError error happened.')}
      ${'should throw NotFoundError while while get response order is payed'} | ${new NotFoundError('NotFoundError error happened.')}
      ${'should throw UnknownError while while get response order is payed'}  | ${new UnknownError('Unknown error happened.')}
    `('$description', async ({ errorExpected }) => {
      // Arrange
      const student = StudentFixture

      mockedFinancialApiClient.GetIsOrderPayed.mockImplementation(() => {
        throw errorExpected
      })

      // Assert
      await expect(paymentService.GetIsOrderPayed(student)).rejects.toThrow(
        errorExpected
      )
      expect(mockedFinancialApiClient.GetIsOrderPayed).toHaveBeenCalledTimes(1)
      expect(mockedFinancialApiClient.GetIsOrderPayed).toHaveBeenCalledWith(
        student
      )
    })
  })
})
