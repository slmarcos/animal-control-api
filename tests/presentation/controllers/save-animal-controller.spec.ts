import { SaveAnimalController } from '@/presentation/controllers'
import { badRequest, ok, serverError } from '@/presentation/helpers'
import { throwError } from '@/tests/domain/helpers'
import { SaveAnimalSpy, ValidatorSpy } from '@/tests/presentation/mocks'

import faker from 'faker'

type SutTypes = {
  sut: SaveAnimalController
  validatorSpy: ValidatorSpy
  saveAnimalSpy: SaveAnimalSpy
}

const mockRequest = (): SaveAnimalController.Request => ({
  age: faker.random.number(99),
  name: faker.name.firstName(),
  type: faker.random.word(),
  weight: faker.random.float(1000)
})

let request: SaveAnimalController.Request

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
    request = mockRequest()
  })

  test('Should call Validator with correct params', async () => {
    const { sut, validatorSpy } = makeSut()
    await sut.handle(request)
    expect(validatorSpy.input).toEqual(request)
  })

  test('Should returns badRequest if Validator fails', async () => {
    const { sut, validatorSpy } = makeSut()
    validatorSpy.error = new Error()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(badRequest(validatorSpy.error))
  })

  test('Should call SaveAnimal with correct params', async () => {
    const { sut, saveAnimalSpy } = makeSut()
    await sut.handle(request)
    expect(saveAnimalSpy.params).toEqual({
      age: request.age,
      name: request.name,
      type: request.type,
      weight: request.weight
    })
  })

  test('Should returns ok and AnimalModel on success', async () => {
    const { sut, saveAnimalSpy } = makeSut()
    const response = await sut.handle(request)
    expect(response).toEqual(ok(saveAnimalSpy.result))
  })

  test('Should returns serverError if SaveAnimal throws', async () => {
    const { sut, saveAnimalSpy } = makeSut()
    jest.spyOn(saveAnimalSpy, 'save').mockImplementationOnce(throwError)
    const response = await sut.handle(request)
    expect(response).toEqual(serverError(new Error()))
  })
})
