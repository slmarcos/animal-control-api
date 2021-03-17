import { LoadAnimalByIdController } from '@/presentation/controllers'
import { badRequest, noContent, ok, serverError } from '@/presentation/helpers'
import { throwError } from '@/tests/domain/helpers'
import { LoadAnimalByIdSpy, ValidatorSpy } from '@/tests/presentation/mocks'

import faker from 'faker'

type SutTypes = {
  sut: LoadAnimalByIdController
  validatorSpy: ValidatorSpy
  loadAnimalByIdSpy: LoadAnimalByIdSpy
}

const mockRequest = (): LoadAnimalByIdController.Request => ({
  animalId: faker.random.uuid()
})

let request: LoadAnimalByIdController.Request

const makeSut = (): SutTypes => {
  const validatorSpy = new ValidatorSpy()
  const loadAnimalByIdSpy = new LoadAnimalByIdSpy()
  const sut = new LoadAnimalByIdController(validatorSpy, loadAnimalByIdSpy)
  return {
    sut,
    validatorSpy,
    loadAnimalByIdSpy
  }
}

describe('LoadAnimalByIdController', () => {
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

  test('Should calls LoadAnimalById with correct params', async () => {
    const { sut, loadAnimalByIdSpy } = makeSut()
    request.animalId = faker.random.uuid()
    await sut.handle(request)
    expect(loadAnimalByIdSpy.params).toEqual(request.animalId)
  })

  test('Should returns noContent if LoadAnimalById returns null', async () => {
    const { sut, loadAnimalByIdSpy } = makeSut()
    loadAnimalByIdSpy.result = null
    request.animalId = faker.random.uuid()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(noContent())
  })

  test('Should returns ok and AnimalModel on success', async () => {
    const { sut, loadAnimalByIdSpy } = makeSut()
    const response = await sut.handle(request)
    expect(response).toEqual(ok(loadAnimalByIdSpy.result))
  })

  test('Should returns serverError if SaveAnimal throws', async () => {
    const { sut, loadAnimalByIdSpy } = makeSut()
    jest.spyOn(loadAnimalByIdSpy, 'load').mockImplementationOnce(throwError)
    const response = await sut.handle(request)
    expect(response).toEqual(serverError(new Error()))
  })
})
