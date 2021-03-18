import { LoadAnimalsController } from '@/presentation/controllers'
import { ok, serverError } from '@/presentation/helpers'
import { throwError } from '@/tests/domain/helpers'
import { LoadAnimalsSpy } from '@/tests/presentation/mocks'

type SutTypes = {
  sut: LoadAnimalsController
  loadAnimalsSpy: LoadAnimalsSpy
}

const makeSut = (): SutTypes => {
  const loadAnimalsSpy = new LoadAnimalsSpy()
  const sut = new LoadAnimalsController(loadAnimalsSpy)
  return {
    sut,
    loadAnimalsSpy
  }
}

describe('LoadAnimalsController', () => {
  test('Should calls LoadAnimals', async () => {
    const { sut, loadAnimalsSpy } = makeSut()
    await sut.handle()
    expect(loadAnimalsSpy.calls).toBe(1)
  })

  test('Should returns ok and array of AnimalModel on success', async () => {
    const { sut, loadAnimalsSpy } = makeSut()
    const response = await sut.handle()
    expect(response).toEqual(ok(loadAnimalsSpy.result))
  })

  test('Should returns serverError if SaveAnimal throws', async () => {
    const { sut, loadAnimalsSpy } = makeSut()
    jest.spyOn(loadAnimalsSpy, 'load').mockImplementationOnce(throwError)
    const response = await sut.handle()
    expect(response).toEqual(serverError(new Error()))
  })
})
