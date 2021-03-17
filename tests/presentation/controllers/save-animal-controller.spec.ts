import { SaveAnimalController } from '@/presentation/controllers'
import { badRequest } from '@/presentation/helpers'
import { mockSaveAnimalParams } from '@/tests/domain/mocks'
import { SaveAnimalSpy, ValidatorSpy } from '@/tests/presentation/mocks'

type SutTypes = {
  sut: SaveAnimalController
  validatorSpy: ValidatorSpy
  saveAnimalSpy: SaveAnimalSpy
}

let mockRequest: SaveAnimalController.Request

const makeSut = (): SutTypes => {
  const validatorSpy = new ValidatorSpy()
  const saveAnimalSpy = new SaveAnimalSpy()
  const sut = new SaveAnimalController(validatorSpy, saveAnimalSpy)
  return {
    sut,
    validatorSpy,
    saveAnimalSpy
  }
}

describe('SaveAnimalController', () => {
  beforeEach(() => {
    mockRequest = mockSaveAnimalParams()
  })

  test('Should call Validator with correct params', async () => {
    const { sut, validatorSpy } = makeSut()
    await sut.handle(mockRequest)
    expect(validatorSpy.input).toEqual(mockRequest)
  })

  test('Should returns badRequest if Validator fails', async () => {
    const { sut, validatorSpy } = makeSut()
    validatorSpy.error = new Error()
    const httpResponse = await sut.handle(mockRequest)
    expect(httpResponse).toEqual(badRequest(validatorSpy.error))
  })
})
