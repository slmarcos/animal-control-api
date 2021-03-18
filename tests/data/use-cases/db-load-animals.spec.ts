import { DbLoadAnimals } from '@/data/use-cases'
import { LoadAnimalsRepoSpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/helpers'

type SutTypes = {
  sut: DbLoadAnimals
  loadAnimalsRepoSpy: LoadAnimalsRepoSpy
}

const makeSut = (): SutTypes => {
  const loadAnimalsRepoSpy = new LoadAnimalsRepoSpy()
  const sut = new DbLoadAnimals(loadAnimalsRepoSpy)
  return {
    sut,
    loadAnimalsRepoSpy
  }
}

describe('DbLoadAnimals use case', () => {
  test('Should calls LoadAnimalsRepo', async () => {
    const { sut, loadAnimalsRepoSpy } = makeSut()
    await sut.load()
    expect(loadAnimalsRepoSpy.calls).toBe(1)
  })

  test('Should throws if LoadAnimalsRepo throws', async () => {
    const { sut, loadAnimalsRepoSpy } = makeSut()
    jest.spyOn(loadAnimalsRepoSpy, 'load').mockImplementationOnce(throwError)
    const promise = sut.load()
    await expect(promise).rejects.toThrow()
  })

  test('Should return array of AnimalModel on success', async () => {
    const { sut, loadAnimalsRepoSpy } = makeSut()
    const animals = await sut.load()
    expect(animals).toEqual(loadAnimalsRepoSpy.result)
  })
})
