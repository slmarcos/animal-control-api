import { UpdateAnimalController } from '@/presentation/controllers'
import { badRequest, noContent, ok, serverError } from '@/presentation/helpers'
import { throwError } from '@/tests/domain/helpers'
import { LoadAnimalByIdSpy, SaveAnimalSpy, ValidatorSpy } from '@/tests/presentation/mocks'

import faker from 'faker'

type SutTypes = {
  sut: UpdateAnimalController
  validatorSpy: ValidatorSpy
  loadAnimalByIdSpy: LoadAnimalByIdSpy
  saveAnimalSpy: SaveAnimalSpy
}

const mockRequest = (): UpdateAnimalController.Request => ({
  animalId: faker.random.uuid(),
  age: faker.random.number(99),
  name: faker.name.firstName(),
  type: faker.random.word(),
  weight: faker.random.float(1000)
})

let request: UpdateAnimalController.Request

const makeSut = (): SutTypes => {
  const validatorSpy = new ValidatorSpy()
  const saveAnimalSpy = new SaveAnimalSpy()
  const loadAnimalByIdSpy = new LoadAnimalByIdSpy()
  const sut = new UpdateAnimalController(validatorSpy, loadAnimalByIdSpy, saveAnimalSpy)
  return {
    sut,
    validatorSpy,
    loadAnimalByIdSpy,
    saveAnimalSpy
  }
}

describe('UpdateAnimalController', () => {
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
    await sut.handle(request)
    expect(loadAnimalByIdSpy.params).toEqual(request.animalId)
  })

  test('Should returns noContent if LoadAnimalById returns null', async () => {
    const { sut, loadAnimalByIdSpy } = makeSut()
    loadAnimalByIdSpy.result = null
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(noContent())
  })

  test('Should call SaveAnimal with correct params', async () => {
    const { sut, saveAnimalSpy } = makeSut()
    await sut.handle(request)
    expect(saveAnimalSpy.params).toEqual({
      id: request.animalId,
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
